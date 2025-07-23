import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { AdministrationLayout } from "@/components/layout/AdministrationLayout";
import { OrganizationLayout } from "@/components/layout/OrganizationLayout";
import { Fallback, Redirect } from "@/features/fallback";

const Screen = lazy(() => import("@/features/display"));
const AdminPanel = lazy(() => import("@/features/admin"));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<Fallback />}>
                <Routes>
                    <Route element={<OrganizationLayout />}>
                        <Route element={<AdministrationLayout />}>
                            <Route path="/:org/admin" element={<AdminPanel />} />
                            <Route path="/:org" element={<Screen />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<Redirect />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
