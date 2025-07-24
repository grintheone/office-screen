import { useAppDispatch, useAppSelector } from "@/app/hooks";
import confetti from "@/assets/videos/confetti.webm";
import fireworks from "@/assets/videos/fireworks.webm";
import backgroundDefault from "@/assets/videos/solt_bck.webm";
import backgroundVbb from "@/assets/videos/vbb_bck.webm";
import {
    selectCurrentEffect,
    setEffect,
    type VideoEffects,
} from "@/features/display/displaySlice";
import type { Theme } from "@/features/settings/settingsSlice";

function calculateFilters(theme: Theme) {
    switch (theme) {
        case "kpd":
            return {
                filter: "hue-rotate(350deg) saturate(0.5)",
                WebkitFilter: "hue-rotate(350deg) saturate(0.5)",
            };
        case "a78":
            return {
                filter: "hue-rotate(30deg) saturate(1.3)",
                WebkitFilter: "hue-rotate(30deg) saturate(1.3)",
            };
        case "lis":
            return {
                filter: "hue-rotate(215deg)",
                WebkitFilter: "hue-rotate(215deg)",
            };
        default:
            return undefined;
    }
}

function getCurrentEffectSrc(effect: VideoEffects) {
    switch (effect) {
        case "confetti":
            return confetti;
        case "fireworks":
            return fireworks;
        case "none":
            return undefined;
    }
}

type Props = {
    currentOrg: Theme
    children: React.ReactNode;
}

const BackgroundWrapper = ({ currentOrg, children }: Props) => {
    const currentEffect = useAppSelector(selectCurrentEffect);
    const dispatch = useAppDispatch();

    const handleEffectEnd = () => {
        dispatch(setEffect("none"));
    };

    return (
        <main
            className={`${currentOrg}-theme bg-black min-h-screen relative`}
            style={{ textShadow: "0 2.5px 2.5px #000" }}
        >
            {children}
            <video
                src={currentOrg === "vbb" ? backgroundVbb : backgroundDefault}
                className="absolute inset-0 size-full object-cover"
                style={calculateFilters(currentOrg)}
                autoPlay
                muted
                loop
            />
            <video
                className="absolute inset-0 size-full object-cover object-center"
                style={
                    currentEffect === "fireworks"
                        ? { filter: `hue-rotate(${Math.random() * 360}deg)` }
                        : undefined
                }
                src={getCurrentEffectSrc(currentEffect)}
                onEnded={handleEffectEnd}
                autoPlay
                muted
            />
        </main>
    );
};

export default BackgroundWrapper;
