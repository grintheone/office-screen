
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PanelContent from "@/features/admin/components/panelContent/PanelContent";

const availablePanels = [
    { id: "main-feed", name: "Основная лента" },
    { id: "clock-feed", name: "Лента часов" },
] as const

export type PanelIds = (typeof availablePanels)[number]["id"]

function Panels() {
    const triggers = availablePanels.map(panelInfo =>
        <TabsTrigger key={panelInfo.id} value={panelInfo.id}>{panelInfo.name}</TabsTrigger>)

    const content = availablePanels.map(panelInfo =>
        <TabsContent key={panelInfo.id} value={panelInfo.id} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <PanelContent panelId={panelInfo.id} />
        </TabsContent>)

    return (
        <main className="grow relative">
            <Tabs defaultValue="main-feed" className="gap-4 h-full absolute left-0 right-0 top-0 bottom-0">
                <TabsList>
                    {triggers}
                </TabsList>
                {content}
            </Tabs>
        </main>
    );
}

export default Panels;
