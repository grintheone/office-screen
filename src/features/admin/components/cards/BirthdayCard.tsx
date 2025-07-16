import PersonIcon from "@/assets/icons/person.svg?react"

function BirthdayCard() {
    return <div className="bg-white ring-2 ring-primary/10 p-2 m-4 rounded-md flex justify-between items-center gap-4 text-sm hover:ring-primary/50 hover:cursor-pointer">
        <div className="flex items-center gap-4">
            <PersonIcon className="size-16 text-primary/50" />
            <div>Фамилия Имя</div>
        </div>
        <div>{new Date("15 June, 1994").toLocaleDateString()}</div>
    </div>
}

export default BirthdayCard
