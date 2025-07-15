import { format } from "date-fns";
import { ru } from "date-fns/locale";
import ClockBody from "@/features/display/components/clock/ClockBody";

function Clock() {
    const currentDate = new Date();

    return (
        <div className="flex flex-col items-center gap-8">
            <ClockBody />
            <div className="text-white text-shadow-lg text-center">
                <div className="font-bold text-[38px]">
                    {format(currentDate, "d MMMM", { locale: ru })}
                </div>
                <div className="text-[28px] leading-4">{format(currentDate, 'EEEE', { locale: ru })}</div>
            </div>
        </div>
    );
}

export default Clock;
