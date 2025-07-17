import backgroundUsd from "@/assets/images/usd.jpg"
import backgroundEur from "@/assets/images/eur.jpg"
import backgroundRates from "@/assets/images/rates-bck.png"

function RatesCard() {
    return (
        <div className="flex flex-col gap-8 w-[800px] h-[600px] animate-slide-up opacity-0">
            <div className="text-4xl text-white">Внутренний курс валют на сегодня:</div>
            <div className="flex gap-3">
                <div
                    className="relative text-white size-80 p-4 flex flex-col justify-end bg-center bg-cover rounded-xl"
                    style={{ backgroundImage: `url(${backgroundUsd})` }}
                >
                    <div className="z-20">
                        <div className="text-4xl">USD</div>
                        <div className="text-7xl">80.62</div>
                    </div>
                    <div className="absolute inset-0 size-full bg-linear-to-bl to-black rounded-xl"></div>
                </div>
                <div
                    className="relative text-white size-80 p-4 flex flex-col justify-end bg-center bg-cover rounded-xl"
                    style={{ backgroundImage: `url(${backgroundEur})` }}
                >
                    <div className="z-20">
                        <div className="text-4xl">EUR</div>
                        <div className="text-7xl">93.28</div>
                    </div>
                    <div className="absolute inset-0 size-full bg-linear-to-bl to-black rounded-xl"></div>
                </div>
            </div>
            <div className="text-4xl text-white">Курс ЦБ:</div>
            <div
                className="bg-cover rounded-xl w-md"
                style={{ backgroundImage: `url(${backgroundRates})` }}
            >
                <div className="text-white text-3xl flex flex-col gap-4 p-4 bg-linear-to-l to-black">
                    <div>
                        USD <span className="font-bold ms-4">77.96</span>
                    </div>
                    <div>
                        EUR <span className="font-bold ms-4">90.56</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RatesCard
