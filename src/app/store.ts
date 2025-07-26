import {
    type Action,
    configureStore,
    type ThunkAction,
} from "@reduxjs/toolkit";
import { settingsPersistMiddleware } from "@/app/middleware";
import adminSlice from "@/features/admin/adminSlice";
import displaySlice from "@/features/display/displaySlice";
import settingsSlice from "@/features/settings/settingsSlice";

export const store = configureStore({
    reducer: {
        settings: settingsSlice,
        admin: adminSlice,
        display: displaySlice,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(settingsPersistMiddleware);
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// Export a reusable type for handwritten thunks
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
