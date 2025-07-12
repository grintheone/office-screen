import { Dialog } from "@/components/ui/dialog";
import Header from "@/features/admin/components/header/Header";
import Modal from "@/features/admin/components/modal/Modal";
import Panels from "@/features/admin/components/panels/Panels";
import ThemedWrapper from "@/features/admin/components/themed-wrapper/ThemedWrapper";

export default function AdminPanel() {
    return (
        <ThemedWrapper>
            <Dialog>
                <Header />
                <Panels />
                <Modal />
            </Dialog>
        </ThemedWrapper>
    );
}
