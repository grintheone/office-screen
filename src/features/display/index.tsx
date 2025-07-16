import BackgroundWrapper from "@/features/display/components/background-wrapper/BackgroundWrapper";
import ClockFeed from "@/features/display/components/clock-feed/ClockFeed";
import MainFeed from "@/features/display/components/main-feed/MainFeed";

function Display() {
    return (
        <BackgroundWrapper>
            <div className="absolute inset-0 z-10 w-full h-full flex">
                <MainFeed />
                <ClockFeed />
            </div>
        </BackgroundWrapper>
    )
}

export default Display;
