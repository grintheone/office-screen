import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
    type: string;
    name: string;
};

// temporary hack to scale the panels
// and allow scrolling within
const height = "calc(100vh - 222px)";

function List({ type, name }: Props) {
    return (
        <section className="flex flex-col rounded-md ring-2 ring-primary/5">
            <div className="text-lg flex justify-between items-center p-4">
                {name} <Button className="text-lg">Добавить</Button>
            </div>
            <ScrollArea
                className="rounded-md border bg-primary/3 p-4 inset-shadow-sm inset-shadow-primary/10 m-2"
                style={{ maxHeight: height, minHeight: height }}
            >
            </ScrollArea>
        </section>
    );
}

export default List;
