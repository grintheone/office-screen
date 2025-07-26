import type { Middleware, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";
import type { TSettings } from "@/features/settings";
import { setSettings } from "@/features/settings/settingsSlice";

// Helper function to check if action is setSettings
function isSetSettingsAction(
    action: unknown,
): action is PayloadAction<TSettings> {
    return (
        typeof action === "object" &&
        action !== null &&
        "type" in action &&
        action.type === setSettings.type
    );
}

export const settingsPersistMiddleware: Middleware =
    (store) => (next) => (action) => {
        // Run the action first so we have the updated state
        const result = next(action);

        if (isSetSettingsAction(action)) {
            const state = store.getState() as RootState;
            const currentTheme = state.settings.theme;

            if (currentTheme) {
                // Only persist if we have a theme set
                const storageKey = `settings_${currentTheme}`;
                localStorage.setItem(
                    storageKey,
                    JSON.stringify(state.settings.settings),
                );
            }
        }

        return result;
    };
