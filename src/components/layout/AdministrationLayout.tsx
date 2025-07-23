import { Outlet } from "react-router";
import { AdminContextProvider } from "@/context/AdminProvider";

export function AdministrationLayout() {
    return (
        <AdminContextProvider>
            <Outlet />
        </AdminContextProvider>
    )
}
