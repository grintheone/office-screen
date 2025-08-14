import { useEffect } from "react";
import { useAppDispatch } from "@/app/hooks";
import hat from "@/assets/videos/hat.mp4";
import { setEffect } from "@/features/display/displaySlice";
import { useS3Media } from "@/hooks/useS3Media";
import type { BirthdayDocument } from "@/services/AdminService";

function BirthdayCard(doc: BirthdayDocument) {
    const dispatch = useAppDispatch();
    const s3media = useS3Media(doc.photo);

    useEffect(() => {
        const id = setTimeout(() => {
            dispatch(setEffect("confetti"));
        }, 2500);

        return () => clearTimeout(id);
    }, [dispatch]);

    return (
        <div className="flex flex-col gap-8 max-w-3xl animate-rotate-y" key={doc.photo}>
            <div className="relative size-[450px]">
                <img
                    className="z-10 size-full object-cover rounded-2xl"
                    src={s3media ? s3media : undefined}
                    alt="birtday card"
                />
                <video
                    className="scale-150 absolute size-full left-[38.5px] top-[-38.5px] z-20"
                    src={hat}
                    autoPlay
                    muted
                />
            </div>
            <div className="text-3xl text-white animate-slide-up opacity-0">
                С днем рождения, {doc.name}!
            </div>
        </div>
    );
}

export default BirthdayCard;
