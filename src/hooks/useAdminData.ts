import { format } from "date-fns";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Theme } from "@/features/settings/settingsSlice";
import { useAdminService } from "@/hooks/useAdminService";
import { sortDocumentsByOrder } from "@/lib/adminDocuments";
import type {
    AnyDocument,
} from "@/services/AdminService";

export function useAdminData(org: Theme) {
    const service = useAdminService();
    const [data, setData] = useState<AnyDocument[]>([]);
    const refetchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

            const result = sortDocumentsByOrder([
                ...(showNow.docs as AnyDocument[]),
                ...(quotes.docs as AnyDocument[]),
                ...(showToday.docs as AnyDocument[]),
            ]);
            setData(result);
        } catch (err) {
            console.error("Failed to fetch data:", err);
        }
    }, [service, org]);

    useEffect(() => {
        if (!service) return;

        const scheduleRefetch = () => {
            if (refetchTimeoutRef.current) {
                clearTimeout(refetchTimeoutRef.current);
            }

            refetchTimeoutRef.current = setTimeout(() => {
                void fetchData();
                refetchTimeoutRef.current = null;
            }, 100);
        };

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
                    scheduleRefetch();
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
                        scheduleRefetch();
                        return
                    }

                    if ((doc.type === "info" || doc.type === "clock") && doc.showNow) {
                        scheduleRefetch();
                        return
                    }

                    if ((doc.type === "birthday" || doc.type === "holiday") && doc.displayDate === today) {
                        scheduleRefetch();
                        return
                    }
                }
            })
            .on("error", (err) => {
                console.error("Changes feed error:", err);
            });

        return () => {
            if (refetchTimeoutRef.current) {
                clearTimeout(refetchTimeoutRef.current);
            }
            changes.cancel();
        };
    }, [service, fetchData, org]);

    return data;
}
