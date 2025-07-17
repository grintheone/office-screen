
import background from "@/assets/images/bowl.jpg"

function ClockCard() {

    return (
        <div className="flex flex-col gap-8 w-[400px]">
            <img src={background} className="size-full object-cover object-center rounded-xl" />
            <div className="text-3xl text-white whitespace-pre-wrap leading-10">
                {`Команды победителей:

1.Место - Страйкеры
2.Место - Перекати поле
3.Место - Страйк`}
            </div>
        </div>
    )
}

export default ClockCard
