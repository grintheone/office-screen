import { useEffect, useState } from "react";
import { useParserDb } from "@/hooks/useParserDb";

export type ParserDataType = "currency" | "currency-inner" | "lenta" | "traffic" | "weather"

export interface ParserDataItem {
    _id: ParserDataType;
    _rev: string;
    data?: unknown
}

export function useParserData() {
    const db = useParserDb()
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
