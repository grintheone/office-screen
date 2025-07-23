import img from "@/assets/images/equip.png";
import { AdminVideoEffect } from "@/features/admin/adminSlice";
import type { InfoDocument } from "@/services/AdminService";

function InfoCard(doc: InfoDocument) {
    return (
        <div className={`${doc.org === "all" ? "ring-primary/90" : ""} bg-white ring-2 ring-primary/10 p-2 m-4 rounded-md flex flex-col gap-4 text-sm hover:ring-primary/50 hover:cursor-pointer`}>
            <div className="flex justify-between gap-4">
                <div className="leading-4 whitespace-pre-wrap">{doc.text}</div>
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
        </div>
    );
}

export default InfoCard;
