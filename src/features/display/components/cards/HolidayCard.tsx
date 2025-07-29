import { useEffect } from "react";
import { useAppDispatch } from "@/app/hooks";
import { setEffect } from "@/features/display/displaySlice";
import type { HolidayDocument } from "@/services/AdminService";

function HolidayCard(doc: HolidayDocument) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (doc.effect === "none") {
            return;
        }

        const id = setTimeout(() => {
            dispatch(setEffect(doc.effect));
        }, 2000);

        return () => clearTimeout(id);
    }, [dispatch, doc.effect]);

    return (
        <div className="flex flex-col gap-8 max-w-4xl animate-rotate-y">
            <img
                className="max-h-[600px] size-full object-left object-contain rounded-xl"
                src={doc.image}
                alt="holiday"
            />
            <div className="text-4xl text-white animate-slide-up opacity-0">
                {doc.title}
            </div>
        </div>
    );
}

export default HolidayCard;
