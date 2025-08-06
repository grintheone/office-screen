import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import type { Theme } from "@/features/settings/settingsSlice";
import { useAdminService } from "@/hooks/useAdminService";
import type {
    AnyDocument,
} from "@/services/AdminService";

function checkElement(docs: AnyDocument[], change: AnyDocument) {
    const index = docs.findIndex((item) => item._id === change._id);
    if (index === -1) return [...docs, change]; // not found, add

    const updatedItems = [...docs];
    updatedItems[index] = { ...updatedItems[index], ...change }; // update existing
    return updatedItems;
}

function getRandomElements<T>(array: T[], count: number): T[] {
    if (!Array.isArray(array) || array.length === 0) {
        return []
    }

    // If count is 0, return a single random element
    if (count === 0) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return [array[randomIndex]];
    }

    // Make sure we don't try to get more elements than exist in the array
    const actualCount = Math.min(Math.abs(count), array.length);

    // Create a copy of the array to avoid mutating the original
    const shuffled = [...array];

    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Return the first 'actualCount' elements
    return shuffled.slice(0, actualCount);
}

export function useAdminData(org: Theme) {
    const service = useAdminService();
    const [data, setData] = useState<AnyDocument[]>([]);

    const fetchData = useCallback(async () => {
        if (!service) return;

        try {
            const today = format(new Date(), "yyyy-MM-dd");

            const db = service.getLocalDb();

            const quotes = await db.find({
                selector: {
                    type: "quote",
                    org: { $in: ["all", org] },
                },
                use_index: "quotes_by_org",
            });

            const showNow = await db.find({
                selector: {
                    showNow: true,
                    org: { $in: ["all", org] },
                },
                use_index: "showNow_by_org",
            });

            const showToday = await db.find({
                selector: {
                    displayDate: today,
                    org: { $in: ["all", org] },
                },
                use_index: "today_docs_by_org",
            });

            const selectedQuotes = getRandomElements(quotes.docs, showNow.docs.length + showToday.docs.length)

            const result = [...showNow.docs, ...selectedQuotes, ...showToday.docs];
            setData(result as AnyDocument[]);
        } catch (err) {
            console.error("Failed to fetch data:", err);
        }
    }, [service, org]);

    useEffect(() => {
        if (!service) return;

        // Initial fetch
        fetchData();

        // Set up changes subscription
        const db = service.getLocalDb();
        const changes = db
            .changes({
                since: "now",
                live: true,
                include_docs: true,
            })
            .on("change", (change) => {
                if (change.deleted) {
                    setData((prev) => prev.filter((item) => item._id !== change.id));
                    return;
                }

                // Only update state if the changed document is relevant
                if (change.doc) {
                    const today = new Date().toISOString().split("T")[0];
                    const doc = change.doc as AnyDocument;

                    if (doc.org !== org && doc.org !== "all") {
                        return;
                    }

                    if (doc.type === "quote") {
                        setData((prevItems) => checkElement(prevItems, doc));
                        return
                    }

                    if ((doc.type === "info" || doc.type === "clock") && doc.showNow) {
                        setData((prevItems) => checkElement(prevItems, doc));
                        return
                    }

                    if ((doc.type === "birthday" || doc.type === "holiday") && doc.displayDate === today) {
                        setData((prevItems) => checkElement(prevItems, doc));
                        return
                    }
                }
            })
            .on("error", (err) => {
                console.error("Changes feed error:", err);
            });

        return () => {
            changes.cancel();
        };
    }, [service, fetchData, org]);

    return data;
}
