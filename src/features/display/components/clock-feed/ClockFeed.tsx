import ClockBirthdays from "@/features/display/components/clock-birthdays/ClockBirthdays";
import Clock from "@/features/display/components/clock";
import ClockCard from "@/features/display/components/cards/ClockCard";
import Slider from "@/features/display/components/slider/Slider";

const carouselItems = [
    {
        component: <Clock />,
        duration: 3000  // 3 seconds display time
    },
    {
        component: <ClockCard />,
        duration: 5000  // 5 seconds display time
    },
    {
        component: <ClockBirthdays />,
        duration: 4000  // 4 seconds display time
    }
];

function ClockFeed() {
    return (
        <section className="grow basis-4/12 relative">
            <Slider type="clock" slides={carouselItems} />
        </section>
    );
}

export default ClockFeed;
