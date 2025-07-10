import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { withValidOrg } from "@/components/hocs/withValidOrg";
import { Fallback, Redirect } from "@/features/fallback";

const Screen = lazy(() => import("@/features/display"));
const AdminPanel = lazy(() => import("@/features/admin"));

const WrappedScreen = withValidOrg(Screen);
const WrappedAdminPanel = withValidOrg(AdminPanel);

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<Fallback />}>
                <Routes>
                    <Route path=":org/admin" element={<WrappedAdminPanel />} />
                    <Route path=":org" element={<WrappedScreen />} />
                    <Route path="*" element={<Redirect />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
