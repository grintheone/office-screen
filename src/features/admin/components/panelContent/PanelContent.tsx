import List, { type IList } from "../list/List";
import type { PanelIds } from "../panels/Panels";

type AvailableLists = {
    [key in PanelIds]: IList[];
}

const availableLists: AvailableLists = {
    main: [
        { type: "birthday", name: "Дни рождения" },
        { type: "holiday", name: "Праздники" },
        { type: "extra", name: "Дополнительно" },
    ],
    additional: [
        { type: "quote", name: "Цитаты" },
        { type: "clock", name: "Блок часов" },
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
