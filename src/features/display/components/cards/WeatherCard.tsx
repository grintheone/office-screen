import { useAppSelector } from "@/app/hooks"
import solt_clear from "@/assets/videos/solt_clear.webm"
import solt_cloudy from "@/assets/videos/solt_cloudly.webm"
import solt_few_clouds from "@/assets/videos/solt_few_clouds.webm"
import solt_rain from "@/assets/videos/solt_rain.webm"
import solt_thunder from "@/assets/videos/solt_thunder.webm"
import vbb_clear from "@/assets/videos/vbb_clear.webm"
import vbb_cloudy from "@/assets/videos/vbb_cloudly.webm"
import vbb_few_clouds from "@/assets/videos/vbb_few_clouds.webm"
import vbb_rain from "@/assets/videos/vbb_rain.webm"
import vbb_thunder from "@/assets/videos/vbb_thunder.webm"
import { selectTheme } from "@/features/settings/settingsSlice"

import type { ParserDataItem } from "@/hooks/useParserData"

type WeatherItem = {
    description: string;
    icon: string;
};

type MainData = {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
};

type WindData = {
    speed: number;
};

type WeatherResponse = {
    weather: WeatherItem[];
    main: MainData;
    wind: WindData;
};

function getWeatherVideoByIcon(icon: string) {
    switch (icon) {
        case '01d':
            return {
                vbb: vbb_clear,
                solt: solt_clear,
                lis: vbb_clear,
                a78: solt_clear,
                kpd: solt_clear
            }
        case '02d':
            return {
                vbb: vbb_few_clouds,
                solt: solt_few_clouds,
                lis: vbb_few_clouds,
                a78: solt_few_clouds,
                kpd: solt_few_clouds
            }
        case '03d':
            return {
                vbb: vbb_cloudy,
                solt: solt_cloudy,
                lis: vbb_cloudy,
                a78: solt_cloudy,
                kpd: solt_cloudy
            }
        case '04d':
            return {
                vbb: vbb_cloudy,
                solt: solt_cloudy,
                lis: vbb_cloudy,
                a78: solt_cloudy,
                kpd: solt_cloudy
            }
        case '09d':
            return {
                vbb: vbb_rain,
                solt: solt_rain,
                lis: vbb_rain,
                a78: solt_rain,
                kpd: solt_rain
            }
        case '10d':
            return {
                vbb: vbb_rain,
                solt: solt_rain,
                lis: vbb_rain,
                a78: solt_rain,
                kpd: solt_rain
            }
        case '11d':
            return {
                vbb: vbb_thunder,
                solt: solt_thunder,
                lis: vbb_thunder,
                a78: solt_thunder,
                kpd: solt_thunder
            }
        default:
            return {
                vbb: vbb_clear,
                solt: solt_clear,
                lis: vbb_clear,
                a78: solt_clear,
                kpd: solt_clear
            }
    }
}

function isWeatherData(data: unknown): data is WeatherResponse {
    if (typeof data !== 'object' || data === null) return false;

    const maybeWeather = data as WeatherResponse;

    if (!Array.isArray(maybeWeather.weather)) return false;
    for (const item of maybeWeather.weather) {
        if (typeof item?.description !== 'string' ||
            typeof item?.icon !== 'string') {
            return false;
        }
    }

    if (typeof maybeWeather.main !== 'object' || maybeWeather.main === null) return false;
    if (typeof maybeWeather.main.temp !== 'number' ||
        typeof maybeWeather.main.feels_like !== 'number' ||
        typeof maybeWeather.main.pressure !== 'number' ||
        typeof maybeWeather.main.humidity !== 'number') {
        return false;
    }

    if (typeof maybeWeather.wind !== 'object' || maybeWeather.wind === null) return false;
    if (typeof maybeWeather.wind.speed !== 'number') return false;

    return true;
}

function WeatherCard(item: ParserDataItem) {
    const org = useAppSelector(selectTheme)

    if (!org) return null
    if (!isWeatherData(item.data)) {
        return null
    }

    const temperature = item.data.main.temp > 0 ? `+${Math.round(item.data.main.temp)}°` : `${Math.round(item.data.main.temp)}°`
    const feelsLike = item.data.main.feels_like > 0 ? `+${Math.round(item.data.main.feels_like)}°` : `${Math.round(item.data.main.feels_like)}°`

    const videoUrl = getWeatherVideoByIcon(item.data.weather[0].icon)

    return (
        <div className="flex flex-col gap-4 max-w-3xl animate-rotate-y">
            <div className="text-4xl text-white">Сейчас за окном</div>
            <div className="relative w-[800px] h-[500px]">
                <div className="z-20 text-white absolute inset-0 p-8 flex flex-col justify-between gap-12">
                    <div>
                        <div className="text-8xl">{temperature}</div>
                        <div className="text-3xl">{item.data.weather[0].description}</div>
                    </div>
                    <div className="space-y-3">
                        <div className="text-3xl">Ощущается как {feelsLike}</div>
                        <div className="text-3xl">{item.data.main.pressure * 0.75} мм. рт. столба</div>
                        <div className="text-3xl">{item.data.wind.speed.toFixed(1)} м/сек</div>
                        <div className="text-3xl">{item.data.main.humidity}% влажности</div>
                    </div>
                </div>
                <video className="absolute inset-0 rounded-xl z-10" src={videoUrl[org]} autoPlay muted />
            </div>
        </div>
    )
}

export default WeatherCard
