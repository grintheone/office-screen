import { useEffect, useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import { DialogTrigger } from "@/components/ui/dialog";
import {
    AdminVideoEffect,
    setFormData,
    videoFormats,
} from "@/features/admin/adminSlice";
import { useS3Media } from "@/hooks/useS3Media";
import type { InfoDocument } from "@/services/AdminService";

function InfoCard(doc: InfoDocument) {
    const dispatch = useAppDispatch();
    const [isVideo, setIsVideo] = useState(false);
    const mediaUrl = useS3Media(doc.media);

    useEffect(() => {
        const isVideoFile = videoFormats.some((format) =>
            mediaUrl.includes(format),
        );

        setIsVideo(isVideoFile);
    }, [mediaUrl]);

    return (
        <div
            className={`${doc.org === "all" ? "ring-primary/90" : ""} bg-white ring-2 ring-primary/10 m-4 rounded-md hover:ring-primary/50`}
        >
            <DialogTrigger
                className="flex flex-col gap-4 text-sm size-full p-2"
                onClick={() => dispatch(setFormData(doc))}
            >
                <div className="flex justify-between gap-4">
                    <div className="leading-4 whitespace-pre-wrap text-left">
                        {doc.text}
                    </div>
                    <div>{doc.showNow ? "Показ." : "Скрыто"}</div>
                </div>
                <div className="flex justify-between items-end">
                    {isVideo ? (
                        <video
                            className="w-40 h-24 rounded-md object-contain bg-primary/5"
                            src={mediaUrl ? mediaUrl : undefined}
                            preload="auto"
                            autoPlay
                            muted
                        />
                    ) : (
                        <img
                            className="w-40 h-24 rounded-md object-contain bg-primary/5"
                            src={mediaUrl ? mediaUrl : undefined}
                            alt=""
                        />
                    )}
                    <div>{AdminVideoEffect[doc.effect]}</div>
                </div>
            </DialogTrigger>
        </div>
    );
}

export default InfoCard;
