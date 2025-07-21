import BackgroundWrapper from "@/features/display/components/background-wrapper/BackgroundWrapper";
import ClockFeed from "@/features/display/components/clock-feed/ClockFeed";
import MainFeed from "@/features/display/components/main-feed/MainFeed";
import Marquee from "@/features/display/components/marquee/Marquee";
import { useParserData } from "@/hooks/useParserData";

function Display() {
    const parserData = useParserData()

    return (
        <BackgroundWrapper>
            <Marquee data={parserData} />
            <div className="absolute inset-0 z-10 w-full h-full flex">
                <MainFeed />
                <ClockFeed />
            </div>
        </BackgroundWrapper>
    );
}

export default Display;
