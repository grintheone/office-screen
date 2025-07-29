import { quotes } from "@/lib/quotes";

type QuoteKey = number;
type QuoteDictionary = Record<QuoteKey, string>;

class QuoteManager {
    private allQuotes: QuoteDictionary;
    private remainingQuotes: QuoteKey[];

    constructor(quotes: QuoteDictionary) {
        this.allQuotes = quotes;
        this.remainingQuotes = this.shuffleKeys(Object.keys(quotes).map(Number));
    }

    private shuffleKeys(keys: QuoteKey[]): QuoteKey[] {
        return [...keys].sort(() => Math.random() - 0.5);
    }

    public getNextQuote(): string {
        if (this.remainingQuotes.length === 0) {
            this.remainingQuotes = this.shuffleKeys(Object.keys(this.allQuotes).map(Number));
        }

        const nextKey = this.remainingQuotes.pop()!;
        return this.allQuotes[nextKey];
    }
}

export const quoteManager = new QuoteManager(quotes);
