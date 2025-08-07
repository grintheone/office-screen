import type { Middleware, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";
import type { TSettings } from "@/features/settings";
import { STORAGE_KEY, setSettings, setTheme } from "@/features/settings/settingsSlice";

// Helper function to check if action is setSettings
function isSetSettingsAction(
    action: unknown,
): action is PayloadAction<TSettings> {
    return (
        typeof action === "object" &&
        action !== null &&
        "type" in action && (action.type === setSettings.type || action.type === setTheme.type)
    );
}

export const settingsPersistMiddleware: Middleware =
    (store) => (next) => (action) => {
        // Run the action first so we have the updated state
        const result = next(action);

        if (isSetSettingsAction(action)) {
            const state = store.getState() as RootState;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.settings));
        }

        return result;
    };
