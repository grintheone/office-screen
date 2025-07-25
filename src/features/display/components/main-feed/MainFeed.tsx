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
            duration: 18000,
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

function assembleAdminSlides(adminData: AnyDocument[]) {
    const slides: Slide[] = [];

    adminData.forEach((doc) => {
        switch (true) {
            case doc.type === "birthday" && doc.showInMainFeed:
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
                    duration: 12000,
                });
                break;
            default:
                break
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
