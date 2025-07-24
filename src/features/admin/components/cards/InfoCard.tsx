import { useAppDispatch } from "@/app/hooks";
import img from "@/assets/images/equip.png";
import { DialogTrigger } from "@/components/ui/dialog";
import { AdminVideoEffect, setCurrentModalItem } from "@/features/admin/adminSlice";
import type { InfoDocument } from "@/services/AdminService";

function InfoCard(doc: InfoDocument) {
    const dispatch = useAppDispatch()

    return (
        <div className={`${doc.org === "all" ? "ring-primary/90" : ""} bg-white ring-2 ring-primary/10 m-4 rounded-md hover:ring-primary/50`}>
            <DialogTrigger
                className="flex flex-col gap-4 text-sm size-full p-2"
                onClick={() => dispatch(setCurrentModalItem(doc))}
            >
                <div className="flex justify-between gap-4">
                    <div className="leading-4 whitespace-pre-wrap text-left">{doc.text}</div>
                    <div>{doc.showNow ? "Показ." : "Скрыто"}</div>
                </div>
                <div className="flex justify-between items-end">
                    <img
                        className="w-40 h-24 rounded-md object-contain bg-primary/5"
                        src={img}
                        alt=""
                    />
                    <div>{AdminVideoEffect[doc.effect]}</div>
                </div>
            </DialogTrigger>
        </div>
    );
}

export default InfoCard;
