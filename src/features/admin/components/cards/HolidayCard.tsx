import img from "@/assets/images/test2.jpeg"
import { AdminVideoEffect } from "@/features/admin/adminSlice"
import type { HolidayDocument } from "@/services/AdminService"

function HolidayCard(doc: HolidayDocument) {
    return <div className={`${doc.org === "all" ? "ring-primary/90" : ""} bg-white ring-2 ring-primary/10 p-2 m-4 rounded-md flex flex-col gap-4 text-sm hover:ring-primary/50 hover:cursor-pointer`}>
        <div className="flex justify-between gap-4">
            <div className="leading-4">{doc.title}</div>
            <div>{new Date(doc.displayDate).toLocaleDateString()}</div>
        </div>
        <div className="flex justify-between items-end">
            <img className="w-40 h-24 rounded-md object-cover bg-primary/5" src={img} alt="" />
            <div>{AdminVideoEffect[doc.effect]}</div>
        </div>
    </div>
}

export default HolidayCard
