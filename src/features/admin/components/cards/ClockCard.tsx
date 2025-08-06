import { useAppDispatch } from "@/app/hooks"
import { DialogTrigger } from "@/components/ui/dialog"
import { setFormData } from "@/features/admin/adminSlice"
import { useS3Media } from "@/hooks/useS3Media"
import type { ClockDocument } from "@/services/AdminService"

function ClockCard(doc: ClockDocument) {
    const dispatch = useAppDispatch()
    const imageUrl = useS3Media(doc.image)

    return (
        <div className={`${doc.org === "all" ? "ring-primary/90" : ""} bg-white ring-2 ring-primary/10 m-4 rounded-md hover:ring-primary/50`}>
            <DialogTrigger
                className="flex flex-col gap-4 text-sm p-2 size-full"
                onClick={() => dispatch(setFormData(doc))}
            >
                <div className="leading-4 whitespace-pre-wrap text-left">{doc.text}</div>
                <div className="flex justify-between items-end">
                    <img className="size-24 rounded-md object-contain object-center bg-primary/5" src={imageUrl ? imageUrl : undefined} alt="" />
                    <div>{doc.showNow ? "Показ." : "Скрыто"}</div>
                </div>
            </DialogTrigger>
        </div>
    )
}

export default ClockCard
