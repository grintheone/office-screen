import { useContext } from "react";
import { AdminContext } from "@/context/AdminContext";

export const useAdminService = () => {
    return useContext(AdminContext);
};
