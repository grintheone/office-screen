import { useAppSelector } from "@/app/hooks";
import backgroundDefault from "@/assets/videos/solt_bck.webm";
import backgroundVbb from "@/assets/videos/vbb_bck.webm";
import { selectTheme } from "@/features/settings/settingsSlice";

const Background = () => {
    const theme = useAppSelector(selectTheme);

    return (
        <video
            src={theme === "vbb" ? backgroundVbb : backgroundDefault}
            className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover"
            style={
                theme === "lis"
                    ? { filter: "hue-rotate(215deg)", WebkitFilter: "hue-rotate(215deg)" }
                    : undefined
            }
            autoPlay
            muted
            loop
        />
    );
};

export default Background;
