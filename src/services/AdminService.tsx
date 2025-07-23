import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";
import SyncService from "@/services/SyncService";

PouchDB.plugin(PouchDBFind);

class AdminService extends SyncService {

}

export default AdminService;
