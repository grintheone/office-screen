import { useState, useEffect } from "react"

interface ISlider {
    type: "main" | "clock",
    slides: {
        component: React.ReactNode,
        duration: number  // duration of the display
    }[]
}

function Slider({ type, slides }: ISlider) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (slides.length === 0) return;

        const timer = setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, slides[currentIndex].duration);

        return () => clearTimeout(timer);
    }, [currentIndex, slides]);

    if (slides.length === 0) {
        return <div className="absolute inset-0 flex items-center justify-center text-4xl text-white">Нечего отображать</div>;
    }

    let content;

    if (type === "main") {
        content = (
            <div className="absolute inset-0 flex items-center justify-center">
                {slides[currentIndex].component}
            </div>
        )
    } else {
        content = (
            slides.map((item, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                    {item.component}
                </div>
            ))
        )
    }

    return content;
}

export default Slider
