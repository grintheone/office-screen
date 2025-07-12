import { Dialog } from "@/components/ui/dialog";
import Header from "./components/header/Header";
import Modal from "./components/modal/Modal";
import Panels from "./components/panels/Panels";
import ThemedWrapper from "./components/themed-wrapper/ThemedWrapper";

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
