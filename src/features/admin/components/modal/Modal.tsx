import { useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    type AdminContentTypes,
    selectModalType,
} from "@/features/admin/adminSlice";
import { selectTheme } from "@/features/settings/settingsSlice";

function getModalTitleByType(type: AdminContentTypes) {
    switch (type) {
        case "birthday":
            return "Добавить день рождение"
        case "holiday":
            return "Добавить праздник"
        case "extra":
            return "Добавить событие/оборудование"
        case "quote":
            return "Добавить цитату"
        case "clock":
            return "Добавить элемент"
    }
}

function Modal() {
    const org = useAppSelector(selectTheme);
    const modalType = useAppSelector(selectModalType);

    if (!modalType) return null

    return (
        <DialogContent className={`${org}-theme sm:max-w-3xl`} >
            <DialogHeader>
                <DialogTitle className="text-2xl">{getModalTitleByType(modalType)}</DialogTitle>
            </DialogHeader>
            <DialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
            </DialogDescription>
            <DialogFooter>
                <Button className="text-lg">Удалить</Button>
                <Button className="text-lg">Изменить</Button>
            </DialogFooter>
        </DialogContent>
    );
}

export default Modal;
