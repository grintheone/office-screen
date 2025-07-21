import { useEffect, useState } from "react";
import type { ParserDataItem } from "@/hooks/useParserData";

type SingleNews = {
    title: string
}

function isValidNewsData(arr: unknown): arr is Array<SingleNews> {
    if (!Array.isArray(arr)) return false;

    return arr.every(item =>
        typeof item === 'object' &&
        'title' in item &&
        typeof item.title === 'string'
    );
}

function NewsBlock(item: ParserDataItem) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!Array.isArray(item.data)) return
        if (item.data.length === 0) return;

        const interval = setInterval(
            () => {
                // TODO: Check narrowing error
                setCurrentIndex((prevIndex) => (prevIndex + 1) % item.data.length);
            },
            15 * 60 * 1000,
        ); // 15 minutes in milliseconds

        return () => clearInterval(interval);
    }, [item]);

    if (!isValidNewsData(item.data)) {
        return
    }

    const currentItem = item.data[currentIndex];

    return (
        <div className="flex">
            <div className="bg-primary px-4 py-2">
                <span className="text-xl text-white">НОВОСТЬ</span>
            </div>
            <div className="bg-secondary px-4 py-2">
                <span className="text-xl text-white">{currentItem.title}</span>
            </div>
        </div>
    );
}

export default NewsBlock;
