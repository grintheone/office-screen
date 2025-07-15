import { useAppSelector } from "@/app/hooks"
import { selectTheme } from "@/features/settings/settingsSlice"

function Ticks() {
    const org = useAppSelector(selectTheme)

    const color = org === "vbb" ? "bg-white" : "bg-gray-500"

    return (
        <div className="relative size-full rounded-full">
            {Array.from({ length: 60 }).map((_, i) => (
                <div
                    key={i} // fine in this case
                    className={`absolute top-1/2 left-1/2 w-0.5 h-[10px] ${i % 5 === 0 ? "bg-white h-[15px]" : color} origin-bottom -translate-x-1/2 -translate-y-1/2`}
                    style={{
                        transform: `translate(-50%, -50%) rotate(${i * 6}deg) translateY(-165px)`
                    }}
                />
            ))}
        </div>
    )
}

export default Ticks
