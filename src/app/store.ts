import {
    type Action,
    configureStore,
    type ThunkAction,
} from "@reduxjs/toolkit";
import adminSlice from "@/features/admin/adminSlice";
import settingsSlice from "@/features/settings/settingsSlice";

export const store = configureStore({
    reducer: {
        settings: settingsSlice,
        admin: adminSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// Export a reusable type for handwritten thunks
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
