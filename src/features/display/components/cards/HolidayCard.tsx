import image from "@/assets/images/test3.jpeg"

function HolidayCard() {
    return (
        <div className="flex flex-col gap-8 max-w-3xl animate-rotate-y">
            <img className="max-h-[600px] size-full object-left object-contain rounded-xl" src={image} alt="image" />
            <div className="text-4xl text-white animate-slide-up opacity-0">Всемирный день борьбы против диабета</div>
        </div>
    )
}

export default HolidayCard
