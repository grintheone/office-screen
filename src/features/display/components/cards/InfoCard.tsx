import { useEffect } from "react";
import { useAppDispatch } from "@/app/hooks";
import image from "@/assets/images/equip3.png";
import { setEffect } from "@/features/display/displaySlice";
import type { InfoDocument } from "@/services/AdminService";

function InfoCard(doc: InfoDocument) {
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
        <div className="flex flex-col gap-8 max-w-3xl animate-rotate-y">
            <div className="text-3xl text-white animate-slide-up opacity-0 whitespace-pre-wrap">
                {doc.text}
            </div>
            {!doc.text && doc.text.length === 0 ? (
                <img
                    className="max-h-[600px] size-full object-left object-contain rounded-xl"
                    src={image}
                    alt="card"
                />
            ) : (
                <img
                    className="max-h-[500px] size-full object-left object-contain rounded-xl"
                    src={image}
                    alt="card"
                />
            )}
        </div>
    );
}

export default InfoCard;
