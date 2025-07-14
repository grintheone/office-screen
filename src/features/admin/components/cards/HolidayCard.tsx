import img from "@/assets/images/test2.jpeg"

function HolidayCard() {
    return <div className="bg-white ring-2 ring-primary/10 p-2 m-4 rounded-md flex flex-col gap-4 text-sm hover:ring-primary/50 hover:cursor-pointer">
        <div className="flex justify-between gap-4">
            <div className="leading-4">Всемирный день борьбы против диабета</div>
            <div>{new Date("14 May, 2015").toLocaleDateString()}</div>
        </div>
        <div className="flex justify-between items-end">
            <img className="w-40 h-24 rounded-md object-cover bg-primary/5" src={img} alt="" />
            <div>Без эффекта</div>
        </div>
    </div>
}

export default HolidayCard
