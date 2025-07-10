import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const availableThemes = ["vbb", "solt", "lis", "kpd", "a78"] as const
export type Theme = typeof availableThemes[number];

interface SettingsState {
    theme: Theme | null;
}

const initialState: SettingsState = {
    theme: null,
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<Theme>) {
            state.theme = action.payload;
        },
    },
    selectors: {
        selectTheme: (state) => state.theme
    }
});

export const { setTheme } = settingsSlice.actions;
export const { selectTheme } = settingsSlice.selectors;
export default settingsSlice.reducer;
