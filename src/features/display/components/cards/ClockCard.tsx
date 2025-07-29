import type { ClockDocument } from "@/services/AdminService"

function ClockCard(doc: ClockDocument) {
    return (
        <div className="flex flex-col gap-8 w-[400px]">
            <img src={doc.image} className="size-full object-cover object-center rounded-xl" alt="some" />
            <div className="text-3xl text-white whitespace-pre-wrap leading-10">
                {doc.text}
            </div>
        </div>
    )
}

export default ClockCard
