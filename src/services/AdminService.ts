import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";
import type { AdminContentTypes } from "@/features/admin/adminSlice";
import type { VideoEffects } from "@/features/display/displaySlice";
import type { Theme } from "@/features/settings/settingsSlice";
import SyncService from "@/services/SyncService";

PouchDB.plugin(PouchDBFind);

type Organization = Theme;

export interface Document {
    _id: string;
    _rev?: string;
    org: Organization | "all";
    type: AdminContentTypes;
}

export interface InfoDocument extends Document {
    text: string;
    media: string;
    effect: VideoEffects;
    showNow: boolean;
}

export interface HolidayDocument extends Document {
    title: string;
    displayDate: string;
    image: string;
    effect: VideoEffects;
}

export interface QuoteDocument extends Document {
    author: string;
    text: string;
}

export interface BirthdayDocument extends Document {
    name: string;
    displayDate: string;
    showInMainFeed: boolean;
    photo: string;
}

export interface ClockDocument extends Document {
    text: string;
    image: string;
    showNow: boolean
}

export type AnyDocument = InfoDocument | HolidayDocument | QuoteDocument | BirthdayDocument | ClockDocument

class AdminService extends SyncService {
    constructor() {
        super("admin");
    }

    async setupIndexes(): Promise<void> {
        try {
            await this.getLocalDb().createIndex({
                index: {
                    fields: ["type", "org", "_id"],
                },
            });
            await this.getLocalDb().createIndex({
                index: {
                    fields: ['showNow', 'displayDate', 'org'],
                },
            });
        } catch (error) {
            console.error("Index creation failed:", error);
        }
    }

    async createDocument<T extends AnyDocument>(document: T): Promise<T> {
        try {
            const response = await this.getLocalDb().put(document);
            return { ...document, _rev: response.rev } as T;
        } catch (error) {
            console.error("Document creation failed:", error);
            throw error;
        }
    }

    async updateDocument<T extends AnyDocument>(document: T): Promise<T> {
        try {
            const response = await this.getLocalDb().put(document);
            return { ...document, _rev: response.rev } as T;
        } catch (error) {
            console.error("Document update failed:", error);
            throw error;
        }
    }

    async deleteDocument(docId: string, docRev: string) {
        try {
            const res = await this.getLocalDb().remove(docId, docRev);
            return { id: res.id }
        } catch (error) {
            console.error('Deletion failed:', error);
            throw error;
        }
    }
}

export default AdminService;
