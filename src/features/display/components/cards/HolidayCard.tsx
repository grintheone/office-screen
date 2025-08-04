import { useEffect } from "react";
import { useAppDispatch } from "@/app/hooks";
import { setEffect } from "@/features/display/displaySlice";
import { useS3Media } from "@/hooks/useS3Media";
import type { HolidayDocument } from "@/services/AdminService";

function HolidayCard(doc: HolidayDocument) {
    const dispatch = useAppDispatch();
    const s3media = useS3Media(doc.image);

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
        <div className="flex flex-col gap-8 max-w-4xl animate-rotate-y" key={doc.image}>
            <img
                className="max-h-[600px] size-full object-left object-contain rounded-xl"
                src={s3media ? s3media : undefined}
                alt="holiday"
            />
            <div className="text-4xl text-white animate-slide-up opacity-0">
                {doc.title}
            </div>
        </div>
    );
}

export default HolidayCard;
