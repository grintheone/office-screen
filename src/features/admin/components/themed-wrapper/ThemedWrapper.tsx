import { useAppSelector } from "@/app/hooks";
import { selectTheme } from "@/features/settings/settingsSlice";

function ThemedWrapper({ children }: React.PropsWithChildren) {
    const theme = useAppSelector(selectTheme);

    return (
        <main className={`${theme}-theme min-h-screen flex flex-col p-4`}
        >
            {children}
        </main>
    )
}

export default ThemedWrapper
