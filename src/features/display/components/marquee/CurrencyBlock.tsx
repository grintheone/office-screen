import type { ParserDataItem } from "@/hooks/useParserData"

interface CurrencyRate {
    CharCode: string;
    Value: number;
}

interface CurrencyRates {
    [key: string]: CurrencyRate;
}

// TODO: Can be impoved
function isCurrencyRates(obj: any): obj is CurrencyRates {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }

    for (const key in obj) {
        const currency = obj[key];

        if (typeof currency !== 'object' || currency === null) {
            return false;
        }

        if (typeof currency.CharCode !== 'string' ||
            typeof currency.Value !== 'number') {
            return false;
        }

        if (currency.CharCode !== key) {
            return false;
        }
    }

    return true;
}

function CurrencyBlock(item: ParserDataItem) {
    if (!isCurrencyRates(item.data)) {
        return null
    }

    return <div className="flex">
        {Object.values(item.data).map(rate => {
            return (
                <div key={rate.CharCode} className="flex">
                    <div className="bg-primary px-4 py-2">
                        <span className="text-xl text-white">{rate.CharCode} ЦБ</span>
                    </div>
                    <div className="bg-secondary px-4 py-2">
                        <span className="text-xl text-white">{rate.Value.toFixed(2)}</span>
                    </div>
                </div>
            )
        })}
    </div>
}

export default CurrencyBlock
