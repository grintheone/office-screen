import { useMemo } from "react";
// import BirthdayCard from "@/features/display/components/cards/BirthdayCard";
// import HolidayCard from "@/features/display/components/cards/HolidayCard";
// import InfoCard from "@/features/display/components/cards/InfoCard";
// import QuoteCard from "@/features/display/components/cards/QuoteCard";
import RatesCard from "@/features/display/components/cards/RatesCard";
import WeatherCard from "@/features/display/components/cards/WeatherCard";
import Slider, {
    type Slide,
} from "@/features/display/components/slider/Slider";
import { useAdminService } from "@/hooks/useAdminService";
import type { ParserDataItem } from "@/hooks/useParserData";

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

type Props = {
    parserData: ParserDataItem[];
};

function MainFeed({ parserData }: Props) {
    const slides = useMemo(() => assembleParserSlides(parserData), [parserData]);

    const admin = useAdminService();
    const db = admin.getLocalDb();
    console.log(db.allDocs());

    return (
        <section className="grow basis-8/12 relative">
            <Slider type="main" slides={slides} />
        </section>
    );
}

export default MainFeed;
