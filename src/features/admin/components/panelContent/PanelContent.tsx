
import List from "../list/List";
import type { PanelIds } from "../panels/Panels";

const availableLists = {
    main: [
        { id: "birthday", name: "Дни рождения" },
        { id: "holiday", name: "Праздники" },
        { id: "extra", name: "Дополнительно" },
    ],
    additional: [
        { id: "quote", name: "Цитаты" },
        { id: "clock", name: "Блок часов" },
    ],
};

type Props = {
    panelId: PanelIds;
};

function PanelContent({ panelId }: Props) {
    const content = availableLists[panelId].map(list => <List key={list.id} type={list.id} name={list.name} />)

    return content
}

export default PanelContent;
