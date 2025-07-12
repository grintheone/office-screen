import { useAppSelector } from "@/app/hooks";
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { selectModalType } from "@/features/admin/adminSlice";



function Modal() {
    const modalType = useAppSelector(selectModalType)
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>This is a dialog modal for {modalType}</DialogTitle>
                <DialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers.
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    );
}

export default Modal;
