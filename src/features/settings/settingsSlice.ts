import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TSettings } from "@/features/settings";
export const availableThemes = ["vbb", "solt", "lis", "kpd", "a78"] as const;
export type Theme = (typeof availableThemes)[number];

export const STORAGE_KEY = "panel_settings"

export interface SettingsState {
    theme: Theme | null;
    globalEffect: TSettings["globalEffect"],
}

const initialState: SettingsState = {
    theme: null,
    globalEffect: "disabled",
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<Theme>) {
            // loading existing settings
            const persistedSettings = localStorage.getItem(STORAGE_KEY);
            if (persistedSettings) {
                const settings: SettingsState = JSON.parse(persistedSettings)

                if (settings.theme === action.payload) {
                    return settings
                }
            }

            return { ...state, theme: action.payload }
        },
        setSettings(state, action: PayloadAction<TSettings>) {
            return { ...state, ...action.payload }
        },
    },
    selectors: {
        selectTheme: (state) => state.theme,
        selectSettings: (state) => state,
    },
});

export const { setTheme, setSettings } = settingsSlice.actions;
export const { selectTheme, selectSettings } = settingsSlice.selectors;
export default settingsSlice.reducer;
