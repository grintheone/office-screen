import { nanoid } from "@reduxjs/toolkit";
import type { QuoteDocument } from "@/services/AdminService";
import { quoteManager } from "@/services/QuoteManager";

function QuoteCard(doc: QuoteDocument) {
    return (
        <div
            key={nanoid()}
            className="relative rounded-xl w-[800px] h-[600px] object-cover object-center animate-slide-up"
            style={{
                backgroundImage: `url(${quoteManager.getNextQuote()})`,
            }}
        >
            <div className="bg-black/50 absolute inset-0 rounded-xl" />
            <div className="relative z-30 size-full px-8 flex flex-col gap-4 justify-center items-center text-center text-white text-shadow-lg">
                <div className="text-4xl">{doc.text}</div>
                {doc.author !== "" && <div className="text-2xl">{doc.author}</div>}
            </div>
        </div>
    );
}

export default QuoteCard;
