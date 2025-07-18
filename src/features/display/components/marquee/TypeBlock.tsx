import type { MarqueTypeBlock } from "@/features/display/components/marquee/Marquee"

function getBlockTextByType(type: MarqueTypeBlock) {
    switch (type) {
        case "news":
            return "НОВОСТЬ"
        case "traffic":
            return "ПРОБКИ"
        case "weather":
            return "ПОГОДА"

    }
}

type Props = {
    type: MarqueTypeBlock
}

function TypeBlock({ type }: Props) {
    return (
        <div className="bg-primary px-4 py-2">
            <span className="text-xl text-white">
                {getBlockTextByType(type)}
            </span>
        </div>
    )
}

export default TypeBlock;
