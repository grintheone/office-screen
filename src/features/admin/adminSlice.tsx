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
    formData: null | AnyDocument;
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
    formData: null,
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
        setFormData(state, action: PayloadAction<AnyDocument | null>) {
            state.formData = action.payload
        },
        setAllDocsByType(state, action: PayloadAction<{ type: AdminContentTypes, docs: AnyDocument[] }>) {
            state.documents[action.payload.type] = action.payload.docs
        },
        addNewDocByType(state, action: PayloadAction<{ type: AdminContentTypes, doc: AnyDocument }>) {
            state.documents[action.payload.type].unshift(action.payload.doc)
        },
        updateDocByType(state, action: PayloadAction<{ type: AdminContentTypes, doc: AnyDocument }>) {
            const { type, doc } = action.payload;
            const index = state.documents[type].findIndex(existingDoc => existingDoc._id === doc._id);
            if (index >= 0) {
                state.documents[type][index] = doc;
            }
        },
        deleteDocByType(state, action: PayloadAction<{ type: AdminContentTypes, id: string }>) {
            state.documents[action.payload.type] = state.documents[action.payload.type].filter(doc => doc._id !== action.payload.id)
        },
    },
    selectors: {
        selectFormData: (state) => state.formData,
        selectAllDocsByType: (state, type: AdminContentTypes) => state.documents[type],
    },
});

export const { setFormData, setAllDocsByType, addNewDocByType, updateDocByType, deleteDocByType } = adminSlice.actions;
export const { selectAllDocsByType, selectFormData } = adminSlice.selectors;
export default adminSlice.reducer;
