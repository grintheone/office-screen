import { useAppSelector } from "@/app/hooks";
import Settings from "@/features/settings";
import { selectTheme, type Theme } from "@/features/settings/settingsSlice";

function calculateReadableName(theme: Theme) {
    switch (theme) {
        case "vbb":
            return "Кубинская";
        case "solt":
            return "Институтский";
        case "lis":
            return "ЛИС";
        case "kpd":
            return "КПД";
        case "a78":
            return "Аналитика 78";
    }
}

function Header() {
    const theme = useAppSelector(selectTheme);

    if (!theme) return null;

    return (
        <header className="flex justify-between items-center">
            <div className="flex items-center gap-4">
                <span className="text-lg font-me">Панель управления</span>
                <h1 className="text-3xl font-bold underline decoration-primary">{calculateReadableName(theme)}</h1>
            </div>
            <Settings />
        </header>
    );
}

export default Header;
