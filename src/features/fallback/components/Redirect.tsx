import { Link } from "react-router";
import { useAppDispatch } from "@/app/hooks";
import AdminIcon from "@/assets/icons/admin.svg?react";
import { availableThemes, setTheme } from "@/features/settings/settingsSlice";

function Redirect() {
    const dispatch = useAppDispatch();

    const links = availableThemes.map((theme) => (
        <Link
            key={theme}
            to={`/${theme}`}
            className="text-4xl font-black"
            style={{ color: `var(--${theme}-primary)` }}
            onClick={() => dispatch(setTheme(theme))}
        >
            {theme.toUpperCase()}
        </Link>
    ));

    return (
        <div className="bg-black min-h-screen flex flex-col items-center justify-center gap-6">
            <h2 className="font-bold text-3xl text-white">
                Выберите вашу организацию:
            </h2>
            <div className="flex gap-4">{links}</div>
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
