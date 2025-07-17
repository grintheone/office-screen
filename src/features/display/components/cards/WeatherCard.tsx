import background from "@/assets/videos/solt_clear.webm"

function WeatherCard() {
    return (
        <div className="flex flex-col gap-4 max-w-3xl animate-rotate-y">
            <div className="text-4xl text-white">Сейчас за окном</div>
            <div className="relative w-[800px] h-[500px]">
                <div className="z-20 text-white absolute inset-0 p-8 flex flex-col justify-between gap-12">
                    <div>
                        <div className="text-8xl">+28°</div>
                        <div className="text-3xl">ясно</div>
                    </div>
                    <div className="space-y-3">
                        <div className="text-3xl">Ощущается как 28°</div>
                        <div className="text-3xl">758 мм. рт. столба</div>
                        <div className="text-3xl">3.0 м/сек</div>
                        <div className="text-3xl">47% влажности</div>
                    </div>
                </div>
                <video className="absolute inset-0 rounded-xl z-10" src={background} autoPlay muted />
            </div>
        </div>
    )
}

export default WeatherCard
