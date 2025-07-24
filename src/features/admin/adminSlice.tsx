import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AnyDocument } from "@/services/AdminService";

export const AdminVideoEffect = {
    "none": "Без эффекта",
    "confetti": "Конфетти",
    "fireworks": "Салют"
}

export type AdminContentTypes =
    | "info"
    | "holiday"
    | "quote"
    | "birthday"
    | "clock";

interface AdminState {
    modalType: null | AdminContentTypes;
    currentModalItem: null | AnyDocument;
    documents: {
        info: AnyDocument[],
        holiday: AnyDocument[],
        quote: AnyDocument[],
        birthday: AnyDocument[],
        clock: AnyDocument[],
    };
    loading: false;
    error: null;
}

const initialState: AdminState = {
    modalType: null,
    currentModalItem: null,
    documents: {
        info: [],
        holiday: [],
        quote: [],
        birthday: [],
        clock: []
    },
    loading: false,
    error: null,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setModalType(state, action: PayloadAction<AdminContentTypes>) {
            state.modalType = action.payload;
        },
        setCurrentModalItem(state, action: PayloadAction<AnyDocument | null>) {
            state.currentModalItem = action.payload
            if (action.payload) {
                state.modalType = action.payload.type
            }
        },
        setAllDocsByType(state, action: PayloadAction<{ type: AdminContentTypes, docs: AnyDocument[] }>) {
            state.documents[action.payload.type] = action.payload.docs
        },
        addNewDocByType(state, action: PayloadAction<{ type: AdminContentTypes, doc: AnyDocument }>) {
            state.documents[action.payload.type].unshift(action.payload.doc)
        }
    },
    selectors: {
        selectModalType: (state) => state.modalType,
        selectAllDocsByType: (state, type: AdminContentTypes) => state.documents[type],
        selectCurrentModalItem: (state) => state.currentModalItem
    },
});

export const { setModalType, setCurrentModalItem, setAllDocsByType, addNewDocByType } = adminSlice.actions;
export const { selectModalType, selectAllDocsByType, selectCurrentModalItem } = adminSlice.selectors;
export default adminSlice.reducer;
