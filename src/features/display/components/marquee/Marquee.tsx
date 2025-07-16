import TextBlock from "@/features/display/components/marquee/TextBlock";
import TypeBlock from "@/features/display/components/marquee/TypeBlock";
import { nanoid } from "@reduxjs/toolkit";
import Marq from "react-fast-marquee";

export type MarqueTypeBlock = "news" | "traffic" | "weather"

export interface IMarque {
    type: MarqueTypeBlock;
    text: string;
}

const data: IMarque[] = [
    {
        type: "news",
        text: "Найдены обломки пропавшего в Хабаровском крае вертолета Ми-8"
    },
    {
        type: "news",
        text: "Видеосервис Rutube объявил о новом алгоритме монетизации каналов"
    },
    {
        type: "traffic",
        text: "Дороги загружены на 30%"
    },
    {
        type: "weather",
        text: "+26 ясно"
    },
]

function Marquee() {
    return (
        <Marq>
            {data.map(item => (
                <div key={nanoid()} className="flex">
                    <TypeBlock type={item.type} />
                    <TextBlock text={item.text} />
                </div>
            ))}
        </Marq>
    )
}

export default Marquee
