import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const EffectSelectShema = ["none", "confetti", "fireworks"] as const
export type VideoEffects = typeof EffectSelectShema[number]

type VideoSlideState = "not-started" | "started" | "finished"

interface DisplayState {
    activeEffect: VideoEffects,
    videoSlideState: VideoSlideState
}

const initialState: DisplayState = {
    activeEffect: "none",
    videoSlideState: "not-started"
};

const displaySlice = createSlice({
    name: "display",
    initialState,
    reducers: {
        setEffect(state, action: PayloadAction<VideoEffects>) {
            state.activeEffect = action.payload;
        },
        setVideoSlideState(state, action: PayloadAction<VideoSlideState>) {
            state.videoSlideState = action.payload
        }
    },
    selectors: {
        selectCurrentEffect: (state) => state.activeEffect,
        selectVideoSlideState: state => state.videoSlideState
    }
});

export const { setEffect, setVideoSlideState } = displaySlice.actions;
export const { selectCurrentEffect, selectVideoSlideState } = displaySlice.selectors;
export default displaySlice.reducer;
