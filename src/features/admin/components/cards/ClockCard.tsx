import img from "@/assets/images/test2.jpeg"

function ClockCard() {
    return <div className="bg-white ring-2 ring-primary/10 p-2 m-4 rounded-md flex flex-col gap-4 text-sm hover:ring-primary/50 hover:cursor-pointer">
        <div className="flex justify-between gap-4">
            <div className="leading-4 whitespace-pre-wrap">{`Команды победителей:

1.Место - Крутые бобры
2.Место - Лютые кочки
3.Место - Сильные духом`}</div>
        </div>
        <div className="flex justify-between items-end">
            <img className="size-24 rounded-md object-cover object-center bg-primary/5" src={img} alt="" />
            <div>Показ.</div>
        </div>
    </div>
}

export default ClockCard
