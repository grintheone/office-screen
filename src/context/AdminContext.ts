import { createContext } from "react";
import type AdminService from "@/services/AdminService";

export const AdminContext = createContext<null | AdminService>(null);
