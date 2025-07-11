
import Header from "./components/header/Header";
import Panels from "./components/panels/Panels";
import ThemedWrapper from "./components/themed-wrapper/ThemedWrapper";

export default function AdminPanel() {
    return (
        <ThemedWrapper>
            <Header />
            <Panels />
        </ThemedWrapper>
    );
}
