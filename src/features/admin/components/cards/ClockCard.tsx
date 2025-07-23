import img from "@/assets/images/test2.jpeg"
import type { ClockDocument } from "@/services/AdminService"

function ClockCard(doc: ClockDocument) {
    return <div className={`${doc.org === "all" ? "ring-primary/90" : ""} bg-white ring-2 ring-primary/10 p-2 m-4 rounded-md flex flex-col gap-4 text-sm hover:ring-primary/50 hover:cursor-pointer`}>
        <div className="flex justify-between gap-4">
            <div className="leading-4 whitespace-pre-wrap">{doc.text}</div>
        </div>
        <div className="flex justify-between items-end">
            <img className="size-24 rounded-md object-cover object-center bg-primary/5" src={img} alt="" />
            <div>{doc.showNow ? "Показ." : "Скрыто"}</div>
        </div>
    </div>
}

export default ClockCard
