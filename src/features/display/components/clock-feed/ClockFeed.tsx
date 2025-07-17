import ClockBirthdays from "@/features/display/components/clock-birthdays/ClockBirthdays";
import Clock from "@/features/display/components/clock";
import ClockCard from "@/features/display/components/cards/ClockCard";
import Slider from "@/features/display/components/slider/Slider";

const carouselItems = [
    {
        component: <Clock />,
        duration: 5000
    },
    {
        component: <ClockCard />,
        duration: 5000
    },
    {
        component: <ClockBirthdays />,
        duration: 5000
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
