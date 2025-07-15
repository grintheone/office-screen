import { useAppSelector } from "@/app/hooks";
import Hands from "@/features/display/components/clock/Hands";
import Ticks from "@/features/display/components/clock/Ticks";
import { selectTheme } from "@/features/settings/settingsSlice";

function ClockBody() {
    const org = useAppSelector(selectTheme)

    return (
        <div className={`${org === "vbb" ? "bg-primary/50" : "bg-black/50"} relative size-96 rounded-full ring-2 ring-primary p-4`}>
            <Ticks />
            <Hands />
        </div>
    )
}

export default ClockBody;
