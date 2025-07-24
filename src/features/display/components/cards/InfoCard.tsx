import image from "@/assets/images/equip3.png"
import type { InfoDocument } from "@/services/AdminService"

function InfoCard(doc: InfoDocument) {
    return (
        <div className="flex flex-col gap-8 max-w-3xl animate-rotate-y">
            <div className="text-3xl text-white animate-slide-up opacity-0 whitespace-pre-wrap">
                {doc.text}
            </div>
            {/* Если нет текста */}
            {/* <img className="max-h-[600px] size-full object-left object-contain rounded-xl" src={image} alt="image" />  */}
            <img className="max-h-[500px] size-full object-left object-contain rounded-xl" src={image} alt="card" />
        </div>
    )
}

export default InfoCard
