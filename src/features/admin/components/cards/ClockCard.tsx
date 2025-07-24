import { useAppDispatch } from "@/app/hooks"
import img from "@/assets/images/test2.jpeg"
import { DialogTrigger } from "@/components/ui/dialog"
import { setCurrentModalItem } from "@/features/admin/adminSlice"
import type { ClockDocument } from "@/services/AdminService"

function ClockCard(doc: ClockDocument) {
    const dispatch = useAppDispatch()

    return (
        <div className={`${doc.org === "all" ? "ring-primary/90" : ""} bg-white ring-2 ring-primary/10 m-4 rounded-md hover:ring-primary/50`}>
            <DialogTrigger
                className="flex flex-col gap-4 text-sm p-2 size-full"
                onClick={() => dispatch(setCurrentModalItem(doc))}
            >
                <div className="leading-4 whitespace-pre-wrap text-left">{doc.text}</div>
                <div className="flex justify-between items-end">
                    <img className="size-24 rounded-md object-cover object-center bg-primary/5" src={img} alt="" />
                    <div>{doc.showNow ? "Показ." : "Скрыто"}</div>
                </div>
            </DialogTrigger>
        </div>
    )
}

export default ClockCard
