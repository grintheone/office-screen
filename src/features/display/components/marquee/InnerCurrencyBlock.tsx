import type { ParserDataItem } from "@/hooks/useParserData";

type Rate = {
    rate: number;
};

type CurrencyData = {
    base_currency_code: string;
    rates: {
        [currencyCode: string]: Rate;
    };
};

function isCurrencyTuple(data: unknown): data is [CurrencyData, CurrencyData] {
    if (!Array.isArray(data) || data.length !== 2) {
        return false;
    }

    return data.every(item =>
        typeof item === 'object' &&
        item !== null &&
        'base_currency_code' in item &&
        typeof item.base_currency_code === 'string' &&
        'rates' in item &&
        typeof item.rates === 'object' &&
        item.rates !== null &&
        Object.values(item.rates).every(rate =>
            typeof rate === 'object' &&
            rate !== null &&
            'rate' in rate &&
            typeof rate.rate === 'number'
        )
    );
}

function InnerCurrencyBlock(item: ParserDataItem) {
    if (!isCurrencyTuple(item.data)) {
        return null
    }

    return (

        <div className="flex flex-col relative px-1 bg-white">
            <div className="flex">
                {item.data.map(currency => {
                    return (
                        <div key={currency.base_currency_code} className="flex z-20">
                            <div className="bg-primary px-4 py-2">
                                <span className="text-xl text-white">{currency.base_currency_code}</span>
                            </div>
                            <div className="bg-secondary px-4 py-2">
                                <span className="text-xl text-white">{currency.rates["RUB"].rate.toFixed(2)}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="text-shadow-xs bg-white text-xl text-center">ВНУТРЕННИЙ КУРС</div>
        </div>

    )
}

export default InnerCurrencyBlock
