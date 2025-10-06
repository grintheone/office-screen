import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import kpd_clear from "@/assets/videos/kpd_weather/clear.jpg";
import kpd_few_clouds from "@/assets/videos/kpd_weather/few_clouds.webm"
import kpd_heavy_clouds from "@/assets/videos/kpd_weather/heavy_clouds.webm"
import kpd_heavy_rain from "@/assets/videos/kpd_weather/heavy_rain.webm"
import kpd_rain from "@/assets/videos/kpd_weather/rain.webm"
import lis_clear from "@/assets/videos/lis_weather/clear.jpg"
import lis_few_clouds from "@/assets/videos/lis_weather/few_clouds.webm"
import lis_heavy_clouds from "@/assets/videos/lis_weather/heavy clouds.webm"
import lis_rain from "@/assets/videos/lis_weather/rain.webm"
import lis_thunder from "@/assets/videos/lis_weather/thunder.webm"
import solt_clear from "@/assets/videos/solt_clear.mp4";
import solt_cloudy from "@/assets/videos/solt_cloudly.mp4";
import solt_few_clouds from "@/assets/videos/solt_few_clouds.mp4";
import solt_rain from "@/assets/videos/solt_rain.mp4";
import solt_thunder from "@/assets/videos/solt_thunder.mp4";
import vbb_clear from "@/assets/videos/vbb_clear.mp4";
import vbb_cloudy from "@/assets/videos/vbb_cloudly.mp4";
import vbb_few_clouds from "@/assets/videos/vbb_few_clouds.mp4";
import vbb_rain from "@/assets/videos/vbb_rain.mp4";
import vbb_thunder from "@/assets/videos/vbb_thunder.mp4";
import { selectVideoSlideState, setVideoSlideState } from "@/features/display/displaySlice";
import { selectTheme } from "@/features/settings/settingsSlice";
import type { ParserDataItem } from "@/hooks/useParserData";

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
        case "01d":
            return {
                vbb: vbb_clear,
                solt: solt_clear,
                lis: lis_clear,
                a78: lis_clear,
                kpd: kpd_clear,
            };
        case "02d":
            return {
                vbb: vbb_few_clouds,
                solt: solt_few_clouds,
                lis: lis_few_clouds,
                a78: lis_few_clouds,
                kpd: kpd_few_clouds,
            };
        case "03d":
            return {
                vbb: vbb_cloudy,
                solt: solt_cloudy,
                lis: lis_few_clouds,
                a78: lis_few_clouds,
                kpd: kpd_few_clouds,
            };
        case "04d":
            return {
                vbb: vbb_cloudy,
                solt: solt_cloudy,
                lis: lis_heavy_clouds,
                a78: lis_heavy_clouds,
                kpd: kpd_heavy_clouds,
            };
        case "09d":
            return {
                vbb: vbb_rain,
                solt: solt_rain,
                lis: lis_rain,
                a78: lis_rain,
                kpd: kpd_rain,
            };
        case "10d":
            return {
                vbb: vbb_rain,
                solt: solt_rain,
                lis: lis_rain,
                a78: lis_rain,
                kpd: kpd_rain,
            };
        case "11d":
            return {
                vbb: vbb_thunder,
                solt: solt_thunder,
                lis: lis_thunder,
                a78: lis_thunder,
                kpd: kpd_heavy_rain,
            };
        default:
            return {
                vbb: vbb_clear,
                solt: solt_clear,
                lis: vbb_clear,
                a78: solt_clear,
                kpd: kpd_clear,
            };
    }
}

function isWeatherData(data: unknown): data is WeatherResponse {
    if (typeof data !== "object" || data === null) return false;

    const maybeWeather = data as WeatherResponse;

    if (!Array.isArray(maybeWeather.weather)) return false;
    for (const item of maybeWeather.weather) {
        if (
            typeof item?.description !== "string" ||
            typeof item?.icon !== "string"
        ) {
            return false;
        }
    }

    if (typeof maybeWeather.main !== "object" || maybeWeather.main === null)
        return false;
    if (
        typeof maybeWeather.main.temp !== "number" ||
        typeof maybeWeather.main.feels_like !== "number" ||
        typeof maybeWeather.main.pressure !== "number" ||
        typeof maybeWeather.main.humidity !== "number"
    ) {
        return false;
    }

    if (typeof maybeWeather.wind !== "object" || maybeWeather.wind === null)
        return false;
    if (typeof maybeWeather.wind.speed !== "number") return false;

    return true;
}

function WeatherCard(item: ParserDataItem) {
    const org = useAppSelector(selectTheme);
    const dispatch = useAppDispatch();
    const mediaRef = useRef(null)

    useEffect(() => {
        // biome-ignore lint/complexity/useLiteralKeys: <don't care>
        if (mediaRef.current && mediaRef.current["tagName"] === "IMG") {
            const timeout = setTimeout(() => {
                dispatch(setVideoSlideState("finished"))
            }, 10000)

            return () => clearTimeout(timeout)
        }
    }, [dispatch])

    if (!org) return null;
    if (!isWeatherData(item.data)) {
        return null;
    }

    const temperature =
        item.data.main.temp > 0
            ? `+${Math.round(item.data.main.temp)}°`
            : `${Math.round(item.data.main.temp)}°`;
    const feelsLike =
        item.data.main.feels_like > 0
            ? `+${Math.round(item.data.main.feels_like)}°`
            : `${Math.round(item.data.main.feels_like)}°`;

    const videoUrl = getWeatherVideoByIcon(item.data.weather[0].icon);

    return (
        <div className="flex flex-col gap-4 max-w-4xl animate-rotate-y">
            <div className="text-4xl text-white">Сейчас за окном</div>
            <div className="relative w-[800px] h-[500px]">
                <div className="z-20 text-white absolute inset-0 p-8 flex flex-col justify-between gap-12">
                    <div>
                        <div className="text-8xl">{temperature}</div>
                        <div className="text-3xl">{item.data.weather[0].description}</div>
                    </div>
                    <div className="space-y-3">
                        <div className="text-3xl">Ощущается как {feelsLike}</div>
                        <div className="text-3xl">
                            {item.data.main.pressure * 0.75} мм. рт. столба
                        </div>
                        <div className="text-3xl">
                            {item.data.wind.speed.toFixed(1)} м/сек
                        </div>
                        <div className="text-3xl">{item.data.main.humidity}% влажности</div>
                    </div>
                </div>
                {videoUrl[org].endsWith(".jpg") ?
                    <img ref={mediaRef}
                        className="absolute inset-0 rounded-xl z-10"
                        src={videoUrl[org]}
                        alt="weather preview"
                    />
                    :
                    <video
                        className="absolute inset-0 rounded-xl z-10"
                        onLoadStart={() => dispatch(setVideoSlideState("started"))}
                        onEnded={() => dispatch(setVideoSlideState("finished"))}
                        src={videoUrl[org]}
                        preload="auto"
                        autoPlay
                        muted
                    />
                }
            </div>
        </div>
    );
}

export default WeatherCard;
