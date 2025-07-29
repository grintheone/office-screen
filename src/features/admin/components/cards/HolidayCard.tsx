import { useAppDispatch } from "@/app/hooks"
import { DialogTrigger } from "@/components/ui/dialog"
import { AdminVideoEffect, setFormData } from "@/features/admin/adminSlice"
import type { HolidayDocument } from "@/services/AdminService"

function HolidayCard(doc: HolidayDocument) {
    const dispatch = useAppDispatch()

    return (
        <div className={`${doc.org === "all" ? "ring-primary/90" : ""} bg-white ring-2 ring-primary/10 m-4 rounded-md hover:ring-primary/50`}>
            <DialogTrigger
                className="flex flex-col gap-4 text-sm size-full p-2"
                onClick={() => dispatch(setFormData(doc))}
            >
                <div className="flex justify-between gap-4">
                    <div className="leading-4">{doc.title}</div>
                    <div>{new Date(doc.displayDate).toLocaleDateString()}</div>
                </div>
                <div className="flex justify-between items-end">
                    <img className="w-40 h-24 rounded-md object-cover bg-primary/5" src={doc.image} alt="" />
                    <div>{AdminVideoEffect[doc.effect]}</div>
                </div>
            </DialogTrigger>
        </div>
    )
}

export default HolidayCard
