import { nanoid } from "@reduxjs/toolkit"
import background from "@/assets/images/clock-bday.png"

const names = ["Фамилия Имя Отчество", "Фамилия Имя", "Фамилия Имя Отчество", "Фамилия Имя Отчество", "Фамилия Имя", "Фамилия Имя Отчество"]

function ClockBirthdays() {
    const birthdays = names.map(name => <li key={nanoid()}>{name}</li>)

    return (
        <div
            className={`relative size-[450px] bg-cover bg-center font-bold text-xl leading-6`}
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="text-[#90723f] absolute text-center top-24 left-1/2 -translate-x-1/2">Дни рождения сегодня:</div>
            <ul
                className="size-full flex flex-col gap-1 items-center justify-center"
                style={{ marginTop: names.length > 5 ? `${names.length * 4}px` : undefined }}
            >
                {birthdays}
            </ul>
        </div>
    )
}

export default ClockBirthdays
