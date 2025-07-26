import { useAppSelector } from "@/app/hooks";
import BackgroundWrapper from "@/features/display/components/background-wrapper/BackgroundWrapper";
import ClockFeed from "@/features/display/components/clock-feed/ClockFeed";
import MainFeed from "@/features/display/components/main-feed/MainFeed";
import Marquee from "@/features/display/components/marquee/Marquee";
import { selectTheme, type Theme } from "@/features/settings/settingsSlice";
import { useAdminData } from "@/hooks/useAdminData";
import { useGlobalEffect } from "@/hooks/useGlobalEffect";
import { useParserData } from "@/hooks/useParserData";

function Display() {
    useGlobalEffect()
    const org = useAppSelector(selectTheme);
    const parserData = useParserData();
    const data = useAdminData(org as Theme);

    return (
        <BackgroundWrapper currentOrg={org as Theme}>
            <Marquee data={parserData} />
            <div className="absolute inset-0 z-10 w-full h-full flex">
                <MainFeed adminData={data} parserData={parserData} />
                <ClockFeed adminData={data} />
            </div>
        </BackgroundWrapper>
    );
}

export default Display;
