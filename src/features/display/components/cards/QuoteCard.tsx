import { nanoid } from "@reduxjs/toolkit"
import background from "@/assets/images/quote-test.jpeg"


function QuoteCard() {
    return (
        <div
            key={nanoid()}
            className="relative rounded-md w-[800px] h-[600px] object-cover object-center"
            style={{
                backgroundImage: `url(${background})`
            }}
        >
            <div className="bg-black/50 absolute inset-0 rounded-md" />
            <div className="relative z-30 size-full px-8 flex flex-col gap-4 justify-center items-center text-center text-white text-shadow-lg">
                <div className="text-4xl">Есть только один способ избежать критики: ничего не делайте, ничего не говорите и будьте никем.</div>
                <div className="text-2xl">Аристотель</div>
            </div>
        </div>
    )
}

export default QuoteCard
