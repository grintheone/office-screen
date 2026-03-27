import { useMemo } from "react";
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
} from "@/services/AdminService";

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

function sprinkleQuotesBetweenCards(adminData: AnyDocument[]) {
    const displayableDocs = adminData.filter((doc) => {
        if (doc.type === "clock") {
            return false;
        }

        if (doc.type === "birthday") {
            return doc.showInMainFeed;
        }

        return true;
    });

    const quotes = displayableDocs.filter((doc) => doc.type === "quote");
    const nonQuotes = displayableDocs.filter((doc) => doc.type !== "quote");

    if (quotes.length === 0) {
        return nonQuotes;
    }

    if (nonQuotes.length === 0) {
        return quotes;
    }

    if (nonQuotes.length === 1) {
        return [nonQuotes[0], ...quotes];
    }

    const result: AnyDocument[] = [];
    let insertedQuotes = 0;
    const gaps = nonQuotes.length - 1;

    nonQuotes.forEach((doc, index) => {
        result.push(doc);

        if (index === nonQuotes.length - 1) {
            return;
        }

        const targetQuotesInserted = Math.round(
            ((index + 1) * quotes.length) / gaps,
        );

        while (insertedQuotes < targetQuotesInserted) {
            result.push(quotes[insertedQuotes]);
            insertedQuotes += 1;
        }
    });

    return result;
}

function assembleAdminSlides(adminData: AnyDocument[]) {
    const slides: Slide[] = [];
    const mixedDocs = sprinkleQuotesBetweenCards(adminData);

    mixedDocs.forEach((doc) => {
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
            case doc.type === "quote":
                slides.push({
                    component: <QuoteCard {...doc} />,
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

type Props = {
    parserData: ParserDataItem[];
    adminData: AnyDocument[];
};

function MainFeed({ parserData, adminData }: Props) {
    const parsed = useMemo(() => assembleParserSlides(parserData), [parserData]);
    const admin = useMemo(() => assembleAdminSlides(adminData), [adminData]);

    return (
        <section className="grow basis-8/12 relative">
            <Slider type="main" slides={[...parsed, ...admin]} />
        </section>
    );
}

export default MainFeed;
