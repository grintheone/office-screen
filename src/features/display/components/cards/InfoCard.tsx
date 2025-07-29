import { useEffect, useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import { setEffect, setVideoSlideState } from "@/features/display/displaySlice";
import type { InfoDocument } from "@/services/AdminService";

// Determine media type
const videoFormats = ['.mp4', '.webm', '.ogg'];

function InfoCard(doc: InfoDocument) {
    const dispatch = useAppDispatch();
    const [isVideo, setIsVideo] = useState(false);

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
        const isVideoFile = videoFormats.some(format =>
            doc.media.includes(format)
        );

        setIsVideo(isVideoFile);

        if (!isVideoFile) {
            const timer = setTimeout(() => {
                dispatch(setVideoSlideState("finished"));
            }, 15000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [doc, dispatch])

    return (
        <div className="flex flex-col gap-8 max-w-4xl animate-rotate-y">
            <div className="text-3xl text-white animate-slide-up opacity-0 whitespace-pre-wrap">
                {doc.text}
            </div>
            {isVideo ?
                <video
                    className="max-h-[600px] size-full object-left object-contain rounded-xl"
                    onLoadedData={() => dispatch(setVideoSlideState("started"))}
                    onEnded={() => dispatch(setVideoSlideState("finished"))}
                    src={doc.media}
                    preload="auto"
                    autoPlay
                    muted
                /> :
                <img
                    className={`${!doc.text && doc.text.length === 0 ? "max-h-[600px]" : "max-h-[500px]"} size-full object-left object-contain rounded-xl`}
                    src={doc.media}
                    alt="card"
                />
            }
        </div>
    );
}

export default InfoCard;
