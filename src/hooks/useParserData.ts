import { useEffect, useState } from "react";
import { useDatabase } from "@/hooks/useDatabase";

export type ParserDataType = "currency" | "currency-inner" | "lenta" | "traffic" | "weather"

export interface ParserDataItem {
    _id: ParserDataType;
    _rev: string;
    data?: unknown
}

const dbUrl = `http://${import.meta.env.VITE_DB_USER}:${import.meta.env.VITE_DB_PASSWORD}@${window.location.host.includes("localhost")
    ? import.meta.env.VITE_DB_HOST_DEV
    : window.location.host
    }/db`;

export function useParserData() {
    const db = useDatabase(`${dbUrl}/main`, "main");
    const [data, setData] = useState<ParserDataItem[]>([])

    useEffect(() => {
        if (!db) return;

        // Fetch all docs initially
        const fetchData = async () => {
            try {
                const result = await db.allDocs({ include_docs: true });
                setData(result.rows.map((row) => row.doc as ParserDataItem));
            } catch (err) {
                console.error("Failed to fetch data:", err);
            }
        };

        fetchData();

        // Set up changes feed for real-time updates
        const changes = db
            .changes({
                since: "now",
                live: true,
                include_docs: true,
            })
            .on("change", (change) => {
                setData((prev) => {
                    const existingIndex = prev.findIndex(
                        (item) => item._id === change.id,
                    );
                    if (existingIndex >= 0) {
                        const updated = [...prev];
                        updated[existingIndex] = change.doc as ParserDataItem;
                        return updated;
                    } else {
                        return [...prev, change.doc as ParserDataItem];
                    }
                });
            })
            .on("error", (err) => {
                console.error("Changes feed error:", err);
            });

        return () => changes.cancel();
    }, [db]);

    return data
}
