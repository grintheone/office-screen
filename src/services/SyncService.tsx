import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";

PouchDB.plugin(PouchDBFind);

interface SyncServiceOptions {
    remoteDbUrl: string;
    localDbName: string;
}

class SyncService {
    private localDb: PouchDB.Database;
    private remoteDb: PouchDB.Database;
    private syncHandler: PouchDB.Replication.Sync<{}> | null = null;

    constructor(options: SyncServiceOptions) {
        // Initialize local PouchDB
        this.localDb = new PouchDB(options.localDbName);

        // Initialize remote CouchDB with authentication if needed
        this.remoteDb = new PouchDB(options.remoteDbUrl);
    }

    // Start synchronization
    public startSync(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.syncHandler = this.localDb
                .sync(this.remoteDb, {
                    live: true,
                    retry: true,
                    timeout: false,
                })
                .on("change", (info) => {
                    console.log("Sync change:", info);
                })
                .on("paused", () => {
                    console.log("Sync paused: client up-to date");
                    resolve();
                })
                .on("error", (err) => {
                    console.error("Sync error:", err);
                    reject(err);
                });
        });
    }

    // Stop synchronization
    public stopSync(): void {
        if (this.syncHandler) {
            this.syncHandler.cancel();
            this.syncHandler = null;
        }
    }

    // Get the local database instance
    public getLocalDb(): PouchDB.Database {
        return this.localDb;
    }

    // Destroy databases and cleanup
    public async destroy(): Promise<void> {
        this.stopSync();
        await this.localDb.close();
    }
}

export default SyncService;
