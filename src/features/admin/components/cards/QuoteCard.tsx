import type { QuoteDocument } from "@/services/AdminService"

function QuoteCard(doc: QuoteDocument) {
    return <div className={`${doc.org === "all" ? "ring-primary/90" : ""} bg-white ring-2 ring-primary/10 p-2 m-4 rounded-md text-sm flex flex-col gap-2 hover:ring-primary/50 hover:cursor-pointer`}>
        <div className="italic">{doc.text}</div>
        <div className="self-end font-bold">{doc.author}</div>
    </div>
}

export default QuoteCard
