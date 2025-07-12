import { useAppSelector } from "@/app/hooks";
import { selectTheme } from "@/features/settings/settingsSlice";

function ThemedWrapper({ children }: React.PropsWithChildren) {
    const org = useAppSelector(selectTheme);

    return (
        <main className={`${org}-theme min-h-screen flex flex-col gap-4 p-4`}
        >
            {children}
        </main>
    )
}

export default ThemedWrapper
