import { useEffect, useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import { videoFormats } from "@/features/admin/adminSlice";
import { setEffect, setVideoSlideState } from "@/features/display/displaySlice";
import { useS3Media } from "@/hooks/useS3Media";
import type { InfoDocument } from "@/services/AdminService";

function InfoCard(doc: InfoDocument) {
    const dispatch = useAppDispatch();
    const [isVideo, setIsVideo] = useState(false);
    const s3media = useS3Media(doc.media);

    useEffect(() => {
        if (doc.effect === "none") {
            return;
        }

        const id = setTimeout(() => {
            dispatch(setEffect(doc.effect));
        }, 2000);

        return () => clearTimeout(id);
    }, [dispatch, doc.effect]);

    useEffect(() => {
        if (!s3media) return

        const isVideoFile = videoFormats.some((format) => s3media.includes(format));

        setIsVideo(isVideoFile);

        if (!isVideoFile) {
            const timer = setTimeout(() => {
                dispatch(setVideoSlideState("finished"));
            }, 15000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [s3media, dispatch]);

    return (
        <div className="flex flex-col gap-8 max-w-4xl animate-rotate-y" key={doc.media}>
            <div className="text-3xl text-white animate-slide-up opacity-0 whitespace-pre-wrap">
                {doc.text}
            </div>
            {isVideo ? (
                <video
                    className="max-h-[600px] size-full object-left object-contain rounded-xl"
                    onLoadedData={() => dispatch(setVideoSlideState("started"))}
                    onEnded={() => dispatch(setVideoSlideState("finished"))}
                    src={s3media ? s3media : undefined}
                    preload="auto"
                    autoPlay
                    muted
                />
            ) : (
                <img
                    className={`${!doc.text && doc.text.length === 0 ? "max-h-[600px]" : "max-h-[500px]"} size-full object-left object-contain rounded-xl`}
                    src={s3media ? s3media : undefined}
                    alt="card"
                />
            )}
        </div>
    );
}

export default InfoCard;
