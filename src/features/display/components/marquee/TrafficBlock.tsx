import type { ParserDataItem } from "@/hooks/useParserData";

function isDataWithRate(data: unknown): data is number {
    return typeof data === 'number' && data !== undefined
}

function TrafficBlock(item: ParserDataItem) {
    if (!isDataWithRate(item.data)) {
        return null
    }

    let backgroundColor = "";

    if (item.data > 8) {
        backgroundColor = "bg-red-900"
    } else if (item.data > 6) {
        backgroundColor = "bg-red-600"
    } else if (item.data > 3) {
        backgroundColor = "bg-yellow-500"
    } else {
        backgroundColor = "bg-green-600"
    }

    return (
        <div className="flex">
            <div className="bg-primary px-4 py-2">
                <span className="text-xl text-white">ПРОБКИ</span>
            </div>
            <div className={`${backgroundColor} px-4 py-2`}>
                <span className="text-xl text-white">{item.data}</span>
            </div>
        </div>
    );
}

export default TrafficBlock;
