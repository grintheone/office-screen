import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "@/app/store.ts";
import App from "./App.tsx";
import "@/assets/fonts/fonts.css";

const domNode = document.getElementById("root");

if (domNode) {
    const root = createRoot(domNode);
    root.render(
        <StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </StrictMode>,
    );
}
