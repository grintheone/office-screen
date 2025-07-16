import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const EffectSelectShema = ["none", "confetti", "fireworks"] as const
export type VideoEffects = typeof EffectSelectShema[number]

interface DisplayState {
    activeEffect: VideoEffects
}

const initialState: DisplayState = {
    activeEffect: "none",
};

const displaySlice = createSlice({
    name: "display",
    initialState,
    reducers: {
        setEffect(state, action: PayloadAction<VideoEffects>) {
            state.activeEffect = action.payload;
        },
    },
    selectors: {
        selectCurrentEffect: (state) => state.activeEffect
    }
});

export const { setEffect } = displaySlice.actions;
export const { selectCurrentEffect } = displaySlice.selectors;
export default displaySlice.reducer;
