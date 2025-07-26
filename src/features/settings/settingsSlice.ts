import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TSettings } from "@/features/settings";
export const availableThemes = ["vbb", "solt", "lis", "kpd", "a78"] as const;
export type Theme = (typeof availableThemes)[number];

interface SettingsState {
    theme: Theme | null;
    settings: TSettings;
}

const initialState: SettingsState = {
    theme: null,
    settings: {
        globalEffect: "disabled",
    },
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<Theme>) {
            state.theme = action.payload;

            // loading existing settings
            const storageKey = `settings_${action.payload}`;
            const persistedSettings = localStorage.getItem(storageKey);
            if (persistedSettings) {
                state.settings = JSON.parse(persistedSettings);
            }
        },
        setSettings(state, action: PayloadAction<TSettings>) {
            state.settings = action.payload;
        },
    },
    selectors: {
        selectTheme: (state) => state.theme,
        selectSettings: (state) => state.settings,
    },
});

export const { setTheme, setSettings } = settingsSlice.actions;
export const { selectTheme, selectSettings } = settingsSlice.selectors;
export default settingsSlice.reducer;
