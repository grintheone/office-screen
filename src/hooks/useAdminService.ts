import { useContext } from "react";
import { AdminContext } from "@/context/AdminContext";

export const useAdminService = () => {
    const ctx = useContext(AdminContext);

    if (!ctx) {
        throw new Error(
            "useAdminService has to be used within <AdminContext.Provider>"
        );
    }

    return ctx;
};
