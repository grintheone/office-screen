import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import type { Theme } from "@/features/settings/settingsSlice";
import { useAdminService } from "@/hooks/useAdminService";
import type { AnyDocument } from "@/services/AdminService";

export function useAdminData(org: Theme) {
    const service = useAdminService();
    const [data, setData] = useState<AnyDocument[]>([]);

    const fetchData = useCallback(async () => {
        if (!service) return;

        try {
            const today = format(new Date(), "yyyy-MM-dd")

            const db = service.getLocalDb();
            const result = await db.find({
                selector: {
                    $and: [
                        {
                            $or: [{ showNow: true }, { displayDate: today }],
                        },
                        {
                            $or: [{ org: "all" }, { org }],
                        },
                    ],
                },
            });
            setData(result.docs as AnyDocument[]);
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
                // Only update state if the changed document is relevant
                if (change.doc) {
                    const today = new Date().toISOString().split("T")[0];
                    const doc = change.doc as AnyDocument;
                    console.log(doc, "doc change");
                    if (doc?.showNow === true || doc?.displayDate === today) {
                        // Document matches our criteria - refresh the data
                        fetchData();
                    }
                }
            })
            .on("error", (err) => {
                console.error("Changes feed error:", err);
            });

        return () => {
            changes.cancel(); // Clean up on unmount
        };
    }, [service, fetchData]);

    return data
}
