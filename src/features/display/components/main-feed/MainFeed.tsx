import { useMemo } from "react";
import { isBirthdayOn } from "@/lib/birthdays";
import BirthdayCard from "@/features/display/components/cards/BirthdayCard";
import HolidayCard from "@/features/display/components/cards/HolidayCard";
import InfoCard from "@/features/display/components/cards/InfoCard";
import QuoteCard from "@/features/display/components/cards/QuoteCard";
import RatesCard from "@/features/display/components/cards/RatesCard";
import WeatherCard from "@/features/display/components/cards/WeatherCard";
import Slider, {
    type Slide,
} from "@/features/display/components/slider/Slider";
import type { ParserDataItem } from "@/hooks/useParserData";
import type {
    AnyDocument,
    QuoteDocument,
} from "@/services/AdminService";

class MainFeedQuoteManager {
    private remainingQuoteIds: string[] = [];
    private lastQuoteId: string | null = null;

    private shuffleIds(ids: string[]): string[] {
        return [...ids].sort(() => Math.random() - 0.5);
    }

    public getNextQuote(quotes: QuoteDocument[]): QuoteDocument | null {
        if (quotes.length === 0) {
            this.remainingQuoteIds = [];
            this.lastQuoteId = null;
            return null;
        }

        const availableQuoteIds = new Set(quotes.map((quote) => quote._id));
        this.remainingQuoteIds = this.remainingQuoteIds.filter((id) =>
            availableQuoteIds.has(id),
        );

        if (this.remainingQuoteIds.length === 0) {
            this.remainingQuoteIds = this.shuffleIds([...availableQuoteIds]);

            const nextId = this.remainingQuoteIds[this.remainingQuoteIds.length - 1];
            if (quotes.length > 1 && nextId === this.lastQuoteId) {
                const swapIndex = this.remainingQuoteIds.findIndex(
                    (id) => id !== this.lastQuoteId,
                );

                [
                    this.remainingQuoteIds[swapIndex],
                    this.remainingQuoteIds[this.remainingQuoteIds.length - 1],
                ] = [
                    this.remainingQuoteIds[this.remainingQuoteIds.length - 1],
                    this.remainingQuoteIds[swapIndex],
                ];
            }
        }

        const nextId = this.remainingQuoteIds.pop();
        const nextQuote = quotes.find((quote) => quote._id === nextId) ?? quotes[0];

        this.lastQuoteId = nextQuote._id;
        return nextQuote;
    }
}

const mainFeedQuoteManager = new MainFeedQuoteManager();

function isQuoteDocument(doc: AnyDocument): doc is QuoteDocument {
    return doc.type === "quote";
}

function QuoteSlotCard({ quotes }: { quotes: QuoteDocument[] }) {
    const quote = useMemo(
        () => mainFeedQuoteManager.getNextQuote(quotes),
        [quotes],
    );

    if (!quote) {
        return null;
    }

    return <QuoteCard {...quote} />;
}

function getDisplayableAdminDocs(adminData: AnyDocument[]) {
    return adminData.filter((doc) => {
        if (doc.type === "clock") {
            return false;
        }

        if (doc.type === "birthday") {
            return doc.showInMainFeed && isBirthdayOn(doc.displayDate);
        }

        return true;
    });
}

function assembleParserSlides(parserData: ParserDataItem[]) {
    const slides: Slide[] = [];

    const weatherData = parserData.find((item) => item._id === "weather");
    const currencyData = parserData.find((item) => item._id === "currency");
    const currencyInnerData = parserData.find(
        (item) => item._id === "currency-inner",
    );

    if (weatherData?.data) {
        slides.push({
            component: <WeatherCard {...weatherData} />,
            duration: Infinity,
        });
    }

    if (currencyData?.data && currencyInnerData?.data) {
        slides.push({
            component: (
                <RatesCard currency={currencyData} currencyInner={currencyInnerData} />
            ),
            duration: 10000,
        });
    }

    return slides;
}

function createQuoteSlotSlides(
    quotes: QuoteDocument[],
    otherSlideCount: number,
): Slide[] {
    if (quotes.length === 0) {
        return [];
    }

    const quoteSlotCount = otherSlideCount === 0
        ? 1
        : Math.min(otherSlideCount, quotes.length);

    return Array.from({ length: quoteSlotCount }, (_, index) => ({
        component: (
            <QuoteSlotCard
                key={`quote-slot-${index}`}
                quotes={quotes}
            />
        ),
        duration: 10000,
    }));
}

function sprinkleQuoteSlides(nonQuoteSlides: Slide[], quoteSlides: Slide[]) {
    if (quoteSlides.length === 0) {
        return nonQuoteSlides;
    }

    if (nonQuoteSlides.length === 0) {
        return quoteSlides;
    }

    const result: Slide[] = [];

    nonQuoteSlides.forEach((slide, index) => {
        result.push(slide);

        if (index < quoteSlides.length) {
            result.push(quoteSlides[index]);
        }
    });

    return result;
}

function assembleAdminSlides(adminData: AnyDocument[]) {
    const slides: Slide[] = [];
    const displayableDocs = getDisplayableAdminDocs(adminData);
    const nonQuoteDocs = displayableDocs.filter((doc) => !isQuoteDocument(doc));

    nonQuoteDocs.forEach((doc) => {
        switch (true) {
            case doc.type === "birthday":
                slides.push({
                    component: <BirthdayCard {...doc} />,
                    duration: 10000,
                });
                break;
            case doc.type === "holiday":
                slides.push({
                    component: <HolidayCard {...doc} />,
                    duration: 10000,
                });
                break;
            case doc.type === "info":
                slides.push({
                    component: <InfoCard {...doc} />,
                    duration: Infinity,
                });
                break;
            default:
                break;
        }
    });

    return slides;
}

function assembleMainFeedSlides(
    parserData: ParserDataItem[],
    adminData: AnyDocument[],
) {
    const displayableDocs = getDisplayableAdminDocs(adminData);
    const quotes = displayableDocs.filter(isQuoteDocument);
    const nonQuoteSlides = [
        ...assembleParserSlides(parserData),
        ...assembleAdminSlides(adminData),
    ];
    const quoteSlides = createQuoteSlotSlides(quotes, nonQuoteSlides.length);

    return sprinkleQuoteSlides(nonQuoteSlides, quoteSlides);
}

type Props = {
    parserData: ParserDataItem[];
    adminData: AnyDocument[];
};

function MainFeed({ parserData, adminData }: Props) {
    const slides = useMemo(
        () => assembleMainFeedSlides(parserData, adminData),
        [parserData, adminData],
    );

    return (
        <section className="grow basis-8/12 relative">
            <Slider type="main" slides={slides} />
        </section>
    );
}

export default MainFeed;
