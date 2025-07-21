import Marq from "react-fast-marquee";
import CurrencyBlock from "@/features/display/components/marquee/CurrencyBlock";
import InnerCurrencyBlock from "@/features/display/components/marquee/InnerCurrencyBlock";
import NewsBlock from "@/features/display/components/marquee/NewsBlock";
import TrafficBlock from "@/features/display/components/marquee/TrafficBlock";
import WeatherBlock from "@/features/display/components/marquee/WeatherBlock";
import type { ParserDataItem } from "@/hooks/useParserData";

type Props = {
    data: ParserDataItem[];
};

function getBlockById(item: ParserDataItem) {
    switch (item._id) {
        case "traffic":
            return <TrafficBlock {...item} />;
        case "lenta":
            return <NewsBlock {...item} />;
        case "weather":
            return <WeatherBlock {...item} />;
        case "currency":
            return <CurrencyBlock {...item} />;
        case "currency-inner":
            return <InnerCurrencyBlock {...item} />;
    }
}

function Marquee({ data }: Props) {
    console.log(data, "marquee");
    if (data.length === 0) return null;

    const renderItems = data.map((item) => getBlockById(item));

    return (
        <Marq className="z-50" autoFill={true} gradient gradientColor="#000" speed={40}>
            {renderItems}
        </Marq>
    );
}

export default Marquee;
