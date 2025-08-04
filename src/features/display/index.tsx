import { Link } from "react-router";
import { useAppSelector } from "@/app/hooks";
import AdminIcon from "@/assets/icons/admin.svg?react";
import BackgroundWrapper from "@/features/display/components/background-wrapper/BackgroundWrapper";
import ClockFeed from "@/features/display/components/clock-feed/ClockFeed";
import MainFeed from "@/features/display/components/main-feed/MainFeed";
import Marquee from "@/features/display/components/marquee/Marquee";
import { selectTheme, type Theme } from "@/features/settings/settingsSlice";
import { useAdminData } from "@/hooks/useAdminData";
import { useGetDailyBirthdays } from "@/hooks/useGetDailyBirthdays";
import { useGlobalEffect } from "@/hooks/useGlobalEffect";
import { useParserData } from "@/hooks/useParserData";

function Display() {
    useGlobalEffect();
    const org = useAppSelector(selectTheme);
    const parserData = useParserData();
    const data = useAdminData(org as Theme);
    const kBirthdays = useGetDailyBirthdays(org as Theme);

    return (
        <BackgroundWrapper currentOrg={org as Theme}>
            <Marquee data={parserData} />
            <div className="absolute inset-0 z-10 w-full h-full flex">
                <MainFeed adminData={data} parserData={parserData} />
                <ClockFeed adminData={data} kBirthdays={kBirthdays} />
            </div>
            <Link to={`${location.href}/admin`}>
                <AdminIcon className="size-10 text-primary absolute z-10 bottom-8 left-8 opacity-30 hover:opacity-100" />
            </Link>
        </BackgroundWrapper>
    );
}

export default Display;
