import PersonIcon from "@/assets/icons/person.svg?react"
import type { BirthdayDocument } from "@/services/AdminService"

function BirthdayCard(doc: BirthdayDocument) {
    return <div className={`${doc.org === "all" ? "ring-primary/90" : ""} bg-white ring-2 ring-primary/10 p-2 m-4 rounded-md flex justify-between items-center gap-4 text-sm hover:ring-primary/50 hover:cursor-pointer`}>
        <div className="flex items-center gap-4">
            <PersonIcon className="size-16 text-primary/50" />
            <div>{doc.name}</div>
        </div>
        <div>{new Date(doc.displayDate).toLocaleDateString()}</div>
    </div>
}

export default BirthdayCard
