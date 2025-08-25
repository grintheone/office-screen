import { useAppSelector } from "@/app/hooks"
import { selectTheme } from "@/features/settings/settingsSlice"

function Ticks() {
    const org = useAppSelector(selectTheme)

    const color = org === "vbb" ? "bg-white" : "bg-gray-500"

    return (
        <div className="relative size-full rounded-full">
            {Array.from({ length: 60 }).map((_, i) => {
                const isMajorTick = i % 5 === 0
                const heightClass = isMajorTick ? "h-[15px]" : "h-[10px]";
                return (
                    <div
                        key={i} // fine in this case
                        className={`absolute top-1/2 left-1/2 w-0.5 ${heightClass} ${isMajorTick ? "bg-white" : color} origin-bottom`}
                        style={{
                            transform: `translate(-100%, -100%) rotate(${i * 6}deg) translateY(-165px)`,
                        }}
                    />
                )
            })}
        </div>
    )
}

export default Ticks
