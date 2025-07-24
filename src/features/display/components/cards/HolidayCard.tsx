import image from "@/assets/images/test3.jpeg"
import type { HolidayDocument } from "@/services/AdminService"

function HolidayCard(doc: HolidayDocument) {
    return (
        <div className="flex flex-col gap-8 max-w-3xl animate-rotate-y">
            <img className="max-h-[600px] size-full object-left object-contain rounded-xl" src={image} alt="holiday" />
            <div className="text-4xl text-white animate-slide-up opacity-0">{doc.title}</div>
        </div>
    )
}

export default HolidayCard
