import List, { type IList } from "@/features/admin/components/list/List";
import type { PanelIds } from "@/features/admin/components/panels/Panels";

type AvailableLists = {
    [key in PanelIds]: IList[];
};

const availableLists: AvailableLists = {
    "main-feed": [
        { type: "info", name: "Информационные слайды" },
        { type: "holiday", name: "Праздники" },
        { type: "quote", name: "Цитаты" },
    ],
    "clock-feed": [
        { type: "birthday", name: "Дни рождения" },
        { type: "clock", name: "Информационные слайды" },
    ],
};

type Props = {
    panelId: PanelIds;
};

function PanelContent({ panelId }: Props) {
    const content = availableLists[panelId].map((list) => (
        <List key={list.type} type={list.type} name={list.name} />
    ));

    return content;
}

export default PanelContent;
