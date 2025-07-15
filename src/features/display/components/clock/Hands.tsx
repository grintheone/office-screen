import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/hooks";
import { selectTheme } from "@/features/settings/settingsSlice";

function Hands() {
    const org = useAppSelector(selectTheme);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours() % 12;

    // Calculate rotation angles
    const secondRotation = seconds * 6;
    const minuteRotation = minutes * 6;
    const hourRotation = hours * 30 + minutes * 0.5;

    const secondHandClasses = `${org === "vbb" ? "bg-white" : "bg-primary"} absolute top-1/2 left-1/2 w-0.5  origin-bottom -translate-x-1/2 -translate-y-1/2 z-10 rounded-full`;

    return (
        <>
            {/* Clock center */}
            <div className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-white z-20 flex items-center justify-center">
                <div className="w-1 h-1 bg-black rounded-full ring-2 ring-primary"></div>
            </div>
            {/* Hour Hand */}
            <div
                className="absolute top-1/2 left-1/2 w-1 h-[100px] bg-white origin-bottom -translate-x-1/2 -translate-y-1/2 z-10 rounded-full"
                style={{
                    transform: `translate(-50%, -50%) rotate(${hourRotation}deg)`,
                }}
            >
                <div className="relative left-[-4px] w-3 h-[75px] bg-white rounded-full shadow"></div>
            </div>

            {/* Minute Hand */}
            <div
                className="absolute top-1/2 left-1/2 w-1 h-[165px] bg-white origin-bottom -translate-x-1/2 -translate-y-1/2 z-10 rounded-full"
                style={{
                    transform: `translate(-50%, -50%) rotate(${minuteRotation}deg)`,
                }}
            >
                <div className="relative left-[-4px] w-3 h-[140px] bg-white rounded-full shadow"></div>
            </div>

            {/* Second Hand */}
            <div
                className={secondHandClasses}
                style={{
                    transform: `translate(-50%, -50%) rotate(${secondRotation}deg)`,
                    height: "175px",
                }}
            />
            <div
                className={secondHandClasses}
                style={{
                    transform: `translate(-50%, -50%) rotate(${secondRotation - 180}deg)`,
                    height: "16px",
                }}
            />
        </>
    );
}

export default Hands;
