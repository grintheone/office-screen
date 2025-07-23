import PouchDB from "pouchdb";

export const remoteUrl = `http://${import.meta.env.VITE_DB_USER}:${import.meta.env.VITE_DB_PASSWORD}@${window.location.host.includes("localhost")
    ? import.meta.env.VITE_DB_HOST_DEV
    : window.location.host
    }/db`;

export type AvailableServiceName = "main" | "admin"

class SyncService {
    private serviceName: string;
    private localDb: PouchDB.Database;
    private remoteDb: PouchDB.Database;
    private syncHandler: PouchDB.Replication.Sync<{}> | null = null;

    constructor(serviceName: AvailableServiceName) {
        this.serviceName = serviceName.toUpperCase();
        this.localDb = new PouchDB(serviceName);
        this.remoteDb = new PouchDB(`${remoteUrl}/${serviceName}`);
    }

    public startSync(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.syncHandler = this.localDb
                .sync(this.remoteDb, {
                    live: true,
                    retry: true,
                    timeout: false,
                })
                .on("change", (info) => {
                    console.log(`${this.serviceName} change:`, info);
                })
                .on("paused", () => {
                    console.log(`${this.serviceName} paused: client up-to date`);
                    resolve();
                })
                .on("error", (err) => {
                    console.error(`${this.serviceName} error:`, err);
                    reject(err);
                });
        });
    }

    public stopSync(): void {
        if (this.syncHandler) {
            this.syncHandler.cancel();
            this.syncHandler = null;
        }
    }

    public getLocalDb(): PouchDB.Database {
        return this.localDb;
    }

    public async destroy(): Promise<void> {
        this.stopSync();
        await this.localDb.close();
    }
}

export default SyncService;
