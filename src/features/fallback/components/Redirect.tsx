import { useEffect } from "react";
import { useNavigate } from "react-router";
import AdminIcon from "@/assets/icons/admin.svg?react";
import {
    type SettingsState,
    STORAGE_KEY,
} from "@/features/settings/settingsSlice";

function Redirect() {
    const navigate = useNavigate();

    useEffect(() => {
        const settingsStr = localStorage.getItem(STORAGE_KEY);
        if (settingsStr) {
            const settings: SettingsState = JSON.parse(settingsStr);
            navigate(`/${settings.theme}`);
        }
    }, [navigate]);

    return (
        <div className="bg-black min-h-screen flex flex-col items-center justify-center gap-6">
            <h2 className="font-bold text-3xl text-white">
                Допишите в адресную строку вашу организацию /org
            </h2>
            <p className="font-bold text-2xl text-white">
                Для управления панелью, допишите в конце адреса /admin
            </p>
            <p className="font-bold text-2xl text-white">
                или нажмите на иконку внизу экрана
            </p>
            <AdminIcon className="size-10 text-white" />
        </div>
    );
}

export default Redirect;
