type Rate = {
    rate: number;
};

type CurrencyData = {
    base_currency_code: string;
    rates: {
        [currencyCode: string]: Rate;
    };
};

export function isCurrencyTuple(data: unknown): data is [CurrencyData, CurrencyData] {
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

interface CurrencyRate {
    CharCode: string;
    Value: number;
}

interface CurrencyRates {
    [key: string]: CurrencyRate;
}

// TODO: Can be impoved
export function isCurrencyRates(obj: any): obj is CurrencyRates {
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
