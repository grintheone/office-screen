import Clock from "@/features/display/components/clock";
import ClockBirthdays from "@/features/display/components/clock-birthdays/ClockBirthdays";
import ClockCard from "@/features/display/components/cards/ClockCard";
import { useEffect, useState } from "react";

const carouselItems = [
    <Clock />,
    <ClockCard />,
    <ClockBirthdays />
];

function ClockFeed() {
    const [currentIndex, setCurrentIndex] = useState(0);


    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="grow basis-4/12 flex items-center relative">
            {carouselItems.map((item, index) => (
                <div
                    key={index}
                    className={`absolute flex items-center justify-center inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    {item}
                </div>
            ))}
        </section>
    )
}

export default ClockFeed;
