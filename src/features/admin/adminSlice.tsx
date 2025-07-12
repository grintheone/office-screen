import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AdminContentTypes = "birthday" | "holiday" | "extra" | "quote" | "clock"

interface AdminState {
    modalType: null | AdminContentTypes
}

const initialState: AdminState = {
    modalType: null,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setModalType(state, action: PayloadAction<AdminContentTypes>) {
            state.modalType = action.payload;
        },
    },
    selectors: {
        selectModalType: (state) => state.modalType
    }
});

export const { setModalType } = adminSlice.actions;
export const { selectModalType } = adminSlice.selectors;
export default adminSlice.reducer;
