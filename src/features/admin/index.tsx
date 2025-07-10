import { useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { selectTheme } from "@/features/settings/settingsSlice";


export default function Admin() {
    const theme = useAppSelector(selectTheme);

    return (
        <div
            className={`${theme}-theme min-h-screen flex flex-col items-center justify-center gap-4`}
        >
            <h1 className="text-3xl font-bold text-primary">Themed App</h1>

            <Button className="mt-4"> Shadcn Primary Button </Button>
        </div>
    );
}
