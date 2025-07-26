import { useEffect } from "react";
import { useAppDispatch } from "@/app/hooks";
import { Dialog } from "@/components/ui/dialog";
import { setFormData } from "@/features/admin/adminSlice";
import Header from "@/features/admin/components/header/Header";
import Modal from "@/features/admin/components/modal/Modal";
import Panels from "@/features/admin/components/panels/Panels";
import ThemedWrapper from "@/features/admin/components/themed-wrapper/ThemedWrapper";

export default function AdminPanel() {
    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     // In your component or console
    //     const fetchInitial = async () => {
    //         const response = await fetch('/api/ping');
    //         const data = await response.json()
    //         console.log(data)
    //     }
    //     fetchInitial()
    // }, []);

    return (
        <ThemedWrapper>
            <Dialog onOpenChange={(open) => !open && dispatch(setFormData(null))}>
                <Header />
                <Panels />
                <Modal />
            </Dialog>
        </ThemedWrapper>
    );
}
