import SettingsIcon from "@/assets/icons/settings.svg?react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

function Settings() {
    return (
        <Sheet>
            <SheetTrigger className="hover:animate-half-spin">
                <SettingsIcon className="size-10 text-primary" />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}

export default Settings;
