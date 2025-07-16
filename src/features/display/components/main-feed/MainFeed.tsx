import BirthdayCard from "@/features/display/components/cards/BirthdayCard";
import HolidayCard from "@/features/display/components/cards/HolidayCard";
import QuoteCard from "@/features/display/components/cards/QuoteCard";
import ExtraCard from "@/features/display/components/cards/ExtraCard";

function MainFeed() {
    return (
        <section className="grow basis-8/12 flex items-center justify-center relative">
            <ExtraCard />
            {/* <QuoteCard /> */}
            {/* <HolidayCard /> */}
            {/* <BirthdayCard /> */}
        </section>
    )
}

export default MainFeed;
