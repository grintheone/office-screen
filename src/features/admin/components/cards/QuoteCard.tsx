import { useAppDispatch } from "@/app/hooks"
import { DialogTrigger } from "@/components/ui/dialog"
import { setCurrentModalItem } from "@/features/admin/adminSlice"
import type { QuoteDocument } from "@/services/AdminService"

function QuoteCard(doc: QuoteDocument) {
    const dispatch = useAppDispatch()

    return (
        <div className={`${doc.org === "all" ? "ring-primary/90" : ""} bg-white ring-2 ring-primary/10  m-4 rounded-md  hover:ring-primary/50`}>
            <DialogTrigger
                className="text-sm flex flex-col items-start gap-2 size-full p-2"
                onClick={() => dispatch(setCurrentModalItem(doc))}
            >
                <div className="italic">{doc.text}</div>
                <div className="self-end font-bold">{doc.author}</div>
            </DialogTrigger>
        </div>
    )
}

export default QuoteCard
