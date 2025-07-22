import { isCurrencyRates } from "@/features/display/components/marquee/types";
import type { ParserDataItem } from "@/hooks/useParserData";

function CurrencyBlock(item: ParserDataItem) {
    if (!isCurrencyRates(item.data)) {
        return null;
    }

    return (
        <div className="flex">
            {Object.values(item.data).map((rate) => {
                return (
                    <div key={rate.CharCode} className="flex">
                        <div className="bg-primary px-4 py-2">
                            <span className="text-xl text-white">{rate.CharCode} ЦБ</span>
                        </div>
                        <div className="bg-secondary px-4 py-2">
                            <span className="text-xl text-white">
                                {rate.Value.toFixed(2)}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default CurrencyBlock;
