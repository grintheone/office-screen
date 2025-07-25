import { isCurrencyTuple } from "@/features/display/components/marquee/types";
import type { ParserDataItem } from "@/hooks/useParserData";

function InnerCurrencyBlock(item: ParserDataItem) {
    if (!isCurrencyTuple(item.data)) {
        return null;
    }

    return (
        <div className="flex flex-col relative px-1 bg-white">
            <div className="flex">
                {item.data.map((currency) => {
                    return (
                        <div key={currency.base_currency_code} className="flex z-20">
                            <div className="bg-primary px-4 py-2">
                                <span className="text-xl text-white">
                                    {currency.base_currency_code}
                                </span>
                            </div>
                            <div className="bg-secondary px-4 py-2">
                                <span className="text-xl text-white">
                                    {currency.rates["RUB"].rate.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    );
                }).reverse()}
            </div>
            <div className="text-shadow-xs bg-white text-xl text-center">
                ВНУТРЕННИЙ КУРС
            </div>
        </div>
    );
}

export default InnerCurrencyBlock;
