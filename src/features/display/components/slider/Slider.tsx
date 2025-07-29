import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectVideoSlideState, setVideoSlideState } from "@/features/display/displaySlice";

export type Slide = {
    component: React.ReactNode;
    duration: number; // duration of the display
};

interface ISlider {
    type: "main" | "clock";
    slides: Slide[];
}

function Slider({ type, slides }: ISlider) {
    const videoSlideState = useAppSelector(selectVideoSlideState);
    const dispatch = useAppDispatch()
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (slides.length === 0) return;

        if (slides[currentIndex].duration !== Infinity) {
            const timer = setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % slides.length);
            }, slides[currentIndex].duration);

            return () => clearTimeout(timer);
        }
    }, [currentIndex, slides]);

    useEffect(() => {
        if (videoSlideState === "finished") {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
            dispatch(setVideoSlideState("not-started"))
        }
    }, [videoSlideState, dispatch, slides])

    if (slides.length === 0) {
        return (
            <div className="absolute inset-0 flex items-center justify-center text-4xl text-white">
                Нечего отображать
            </div>
        );
    }

    let content;

    if (type === "main") {
        content = (
            <div className="absolute inset-0 flex items-center justify-center">
                {slides[currentIndex].component}
            </div>
        );
    } else {
        content = slides.map((item, index) => (
            <div
                key={index}
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
            >
                {item.component}
            </div>
        ));
    }

    return content;
}

export default Slider;
