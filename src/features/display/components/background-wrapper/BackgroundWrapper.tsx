import { useAppSelector } from "@/app/hooks";
import backgroundDefault from "@/assets/videos/solt_bck.webm";
import backgroundVbb from "@/assets/videos/vbb_bck.webm";
import { selectTheme, type Theme } from "@/features/settings/settingsSlice";

function calculateFilters(theme: Theme) {
    switch (theme) {
        case "kpd":
            return { filter: "hue-rotate(350deg) saturate(0.5)", WebkitFilter: "hue-rotate(350deg) saturate(0.5)" }
        case "a78":
            return { filter: "hue-rotate(30deg) saturate(1.3)", WebkitFilter: "hue-rotate(30deg) saturate(1.3)" }
        case "lis":
            return { filter: "hue-rotate(215deg)", WebkitFilter: "hue-rotate(215deg)" }
        default:
            return undefined
    }
}

const BackgroundWrapper = ({ children }: React.PropsWithChildren) => {
    const org = useAppSelector(selectTheme);

    if (!org) return null

    return (
        <main className={`${org}-theme bg-black min-h-screen relative`}>
            {children}
            <video
                src={org === "vbb" ? backgroundVbb : backgroundDefault}
                className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover"
                style={calculateFilters(org)}
                autoPlay
                muted
                loop
            />
        </main>
    )
};

export default BackgroundWrapper;
