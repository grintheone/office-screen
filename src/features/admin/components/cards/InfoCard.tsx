import img from "@/assets/images/equip.png"

function ExtraCard() {
    return <div className="bg-white ring-2 ring-primary/10 p-2 m-4 rounded-md flex flex-col gap-4 text-sm hover:ring-primary/50 hover:cursor-pointer">
        <div className="flex justify-between gap-4">
            <div className="leading-4 whitespace-pre-wrap">{`Автоматические иммунохимические анализаторы для количественного определения скрытой крови в кале Eiken OC-SENSOR

РУ № РЗН 2021/15614 от 29.10.2021`}</div>
            <div>Показ.</div>
        </div>
        <div className="flex justify-between items-end">
            <img className="w-40 h-24 rounded-md object-contain bg-primary/5" src={img} alt="" />
            <div>Конфетти</div>
        </div>
    </div>
}

export default ExtraCard
