import { Link } from "react-router";
import { useAppDispatch } from "@/app/hooks";
import { availableThemes, setTheme } from "@/features/settings/settingsSlice";

function Redirect() {
    const dispatch = useAppDispatch();

    const links = availableThemes.map((theme) => (
        <Link key={theme} to={`/${theme}`} className="text-4xl font-black" style={{ color: `var(--${theme}-primary)` }} onClick={() => dispatch(setTheme(theme))}>
            {theme.toUpperCase()}
        </Link>
    ));

    return (
        <div className="bg-black min-h-screen flex flex-col items-center justify-center gap-6">
            <h2 className="font-bold text-3xl text-white">Выберите вашу организацию:</h2>
            <div className="flex gap-4">
                {links}
            </div>
            <p className="font-bold text-2xl text-white">
                Для управления панелью, допишите в конце адреса /admin
            </p>
        </div>
    );
}

export default Redirect;
