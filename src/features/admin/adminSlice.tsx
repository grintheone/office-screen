import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AdminContentTypes = "info" | "holiday" | "quote" | "birthday" | "clock"

interface AdminState {
    modalType: null | AdminContentTypes
    isModalOpen: boolean
}

const initialState: AdminState = {
    modalType: null,
    isModalOpen: false,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setModalType(state, action: PayloadAction<AdminContentTypes>) {
            state.modalType = action.payload;
        },
        toggleModal(state) {
            state.isModalOpen = !state.isModalOpen
        }
    },
    selectors: {
        selectModalType: (state) => state.modalType
    }
});

export const { setModalType, toggleModal } = adminSlice.actions;
export const { selectModalType } = adminSlice.selectors;
export default adminSlice.reducer;
