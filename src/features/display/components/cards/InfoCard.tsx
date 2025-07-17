import image from "@/assets/images/equip3.png"

function InfoCard() {
    return (
        <div className="flex flex-col gap-8 max-w-3xl animate-rotate-y">
            <div className="text-3xl text-white animate-slide-up opacity-0 whitespace-pre-wrap">
                {`Автоматические иммунохимические анализаторы для количественного определения скрытой крови в кале Eiken OC-SENSOR

РУ № РЗН 2021/15614 от 29.10.2021`}
            </div>
            {/* Если нет текста */}
            {/* <img className="max-h-[600px] size-full object-left object-contain rounded-xl" src={image} alt="image" />  */}
            <img className="max-h-[500px] size-full object-left object-contain rounded-xl" src={image} alt="image" />
        </div>
    )
}

export default InfoCard
