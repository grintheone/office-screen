import { type PropsWithChildren, useEffect, useState } from "react";
import { AdminContext } from "@/context/AdminContext";
import AdminService from "@/services/AdminService";

export function AdminContextProvider({ children }: PropsWithChildren) {
    const [adminService, setAdminService] = useState<null | AdminService>(null);

    useEffect(() => {
        const service = new AdminService();

        const initialSetup = async () => {
            await service.startSync();
            await service.setupIndexes()
            setAdminService(service);
        }

        initialSetup()

        return () => {
            service.stopSync();
            service.destroy();
        };
    }, []);

    return <AdminContext.Provider value={adminService}>{children}</AdminContext.Provider>;
}
