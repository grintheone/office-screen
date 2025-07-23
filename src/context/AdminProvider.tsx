import { type PropsWithChildren, useEffect, useState } from "react";
import { AdminContext } from "@/context/AdminContext";
import AdminService from "@/services/AdminService";

export function AdminContextProvider({ children }: PropsWithChildren) {
    const [adminService, setAdminService] = useState<null | AdminService>(null);

    useEffect(() => {
        const service = new AdminService('admin');

        setAdminService(service);
        service.startSync();

        return () => {
            service.stopSync();
            service.destroy();
        };
    }, []);

    return <AdminContext.Provider value={adminService}>{children}</AdminContext.Provider>;
}
