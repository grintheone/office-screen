
import background from "@/assets/images/bowl.jpg"

function ClockCard() {

    return (
        <div className="flex flex-col gap-8 w-[400px]">
            <img src={background} className="size-full object-cover object-center rounded-xl" />
            <div className="text-3xl text-white whitespace-pre-wrap leading-10">
                {`Команды победителей:
1.Место - Крутые бобры
2.Место - Лютые кочки
3.Место - Сильные духом`}
            </div>
        </div>
    )
}

export default ClockCard
