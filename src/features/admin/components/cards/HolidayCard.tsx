import { useAppDispatch } from "@/app/hooks"
import { DialogTrigger } from "@/components/ui/dialog"
import { AdminVideoEffect, setFormData } from "@/features/admin/adminSlice"
import { useS3Media } from "@/hooks/useS3Media"
import type { HolidayDocument } from "@/services/AdminService"

function HolidayCard(doc: HolidayDocument) {
    const dispatch = useAppDispatch()
    const imageUrl = useS3Media(doc.image)

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
                    <img className="w-40 h-24 rounded-md object-contain bg-primary/5" src={imageUrl ? imageUrl : undefined} alt="" />
                    <div>{AdminVideoEffect[doc.effect]}</div>
                </div>
            </DialogTrigger>
        </div>
    )
}

export default HolidayCard
