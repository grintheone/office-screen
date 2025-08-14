import { useAppDispatch, useAppSelector } from "@/app/hooks";
import confetti from "@/assets/videos/confetti.webm";
import fireworks from "@/assets/videos/fireworks.webm";
import backgroundKpd from "@/assets/videos/kpd_bck.mp4";
import backgroundLis from "@/assets/videos/lis_bck.mp4";
import backgroundDefault from "@/assets/videos/solt_bck.mp4";
import backgroundVbb from "@/assets/videos/vbb_bck.mp4";

import {
    selectCurrentEffect,
    setEffect,
    type VideoEffects,
} from "@/features/display/displaySlice";
import type { Theme } from "@/features/settings/settingsSlice";

const backgrounds = {
    vbb: backgroundVbb,
    solt: backgroundDefault,
    lis: backgroundLis,
    kpd: backgroundKpd,
    a78: backgroundDefault,
};

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
    currentOrg: Theme;
    children: React.ReactNode;
};

const BackgroundWrapper = ({ currentOrg, children }: Props) => {
    const currentEffect = useAppSelector(selectCurrentEffect);
    const dispatch = useAppDispatch();

    const handleEffectEnd = () => {
        dispatch(setEffect("none"));
    };

    return (
        <main
            className={`${currentOrg}-theme bg-black min-h-screen relative overflow-hidden`}
            style={{ textShadow: "0 2.5px 2.5px #000" }}
        >
            {children}
            <video
                src={backgrounds[currentOrg]}
                className="absolute inset-0 size-full object-cover"
                style={currentOrg === "a78" ? {
                    filter: "hue-rotate(30deg) saturate(1.3)",
                    WebkitFilter: "hue-rotate(30deg) saturate(1.3)"
                } : undefined}
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
