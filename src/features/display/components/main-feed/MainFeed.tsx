import BirthdayCard from "@/features/display/components/cards/BirthdayCard";
import HolidayCard from "@/features/display/components/cards/HolidayCard";
import QuoteCard from "@/features/display/components/cards/QuoteCard";
import InfoCard from "@/features/display/components/cards/InfoCard";
import Slider from "@/features/display/components/slider/Slider";
import RatesCard from "@/features/display/components/cards/RatesCard";
import WeatherCard from "@/features/display/components/cards/WeatherCard";

const carouselSlides = [
    {
        component: (
            <WeatherCard />
        ),
        duration: 18000
    },
    {
        component: (
            <RatesCard />
        ),
        duration: 10000
    },
    {
        component: (
            <BirthdayCard />
        ),
        duration: 10000
    },
    {
        component: (
            <HolidayCard />
        ),
        duration: 10000
    },
    {
        component: (
            <InfoCard />
        ),
        duration: 10000
    },
    {
        component: (
            <QuoteCard />
        ),
        duration: 8000
    },
];

function MainFeed() {
    return (
        <section className="grow basis-8/12 relative">
            <Slider type="main" slides={carouselSlides} />
        </section>
    )
}

export default MainFeed;
