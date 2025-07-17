import BirthdayCard from "@/features/display/components/cards/BirthdayCard";
import HolidayCard from "@/features/display/components/cards/HolidayCard";
import QuoteCard from "@/features/display/components/cards/QuoteCard";
import InfoCard from "@/features/display/components/cards/InfoCard";
import MyStaticCarousel from "@/features/display/components/main-feed/StaticCarousel";

function MainFeed() {
    return (
        <section className="grow basis-8/12 flex items-center justify-center relative">
            {/* <InfoCard /> */}
            {/* <QuoteCard /> */}
            {/* <HolidayCard /> */}
            <BirthdayCard />
            {/* <MyStaticCarousel /> */}
        </section>
    )
}

export default MainFeed;
