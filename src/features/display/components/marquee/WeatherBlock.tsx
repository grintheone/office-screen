import type { ParserDataItem } from "@/hooks/useParserData";

interface WeatherData {
    weather: {
        description: string;
    }[];
    main: {
        temp: number;
    };
}

function isWeatherData(data: unknown): data is WeatherData {
    if (typeof data !== 'object' || data === null) {
        return false;
    }

    const obj = data as Record<string, unknown>;

    if (!Array.isArray(obj.weather) || obj.weather.length === 0) {
        return false;
    }
    const firstWeather = obj.weather[0] as Record<string, unknown>;
    if (typeof firstWeather.description !== 'string') {
        return false;
    }

    if (typeof obj.main !== 'object' || obj.main === null) {
        return false;
    }
    const main = obj.main as Record<string, unknown>;
    if (typeof main.temp !== 'number') {
        return false;
    }

    return true;
}

function WeatherBlock(item: ParserDataItem) {
    if (!isWeatherData(item.data)) {
        return null
    }

    const temperature = item.data.main.temp > 0 ? `+${Math.round(item.data.main.temp)}°` : `${Math.round(item.data.main.temp)}°`
    const condition = item.data.weather[0].description

    return (
        <div className="flex">
            <div className="bg-primary px-4 py-2">
                <span className="text-xl text-white">ПОГОДА</span>
            </div>
            <div className="bg-secondary px-4 py-2">
                <span className="text-xl text-white">{`${temperature} ${condition}`}</span>
            </div>
        </div>
    )
}

export default WeatherBlock;
