import BirthdayCard from "@/features/display/components/cards/BirthdayCard";
import HolidayCard from "@/features/display/components/cards/HolidayCard";
import QuoteCard from "@/features/display/components/cards/QuoteCard";
import InfoCard from "@/features/display/components/cards/InfoCard";
import Slider from "@/features/display/components/slider/Slider";

const carouselSlides = [
    {
        component: (
            <BirthdayCard />
        ),
        duration: 10000 // 3 seconds
    },
    {
        component: (
            <HolidayCard />
        ),
        duration: 10000 // 10 seconds
    },
    {
        component: (
            <InfoCard />
        ),
        duration: 10000 // 10 seconds
    },
    {
        component: (
            <QuoteCard />
        ),
        duration: 5000 // 5 seconds
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
