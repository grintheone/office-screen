import { useAppDispatch } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    type AdminContentTypes,
    setModalType,
} from "@/features/admin/adminSlice";

export interface IList {
    type: AdminContentTypes;
    name: string;
};

// temporary hack to scale the panels
// and allow scrolling within
const height = "calc(100vh - 222px)";

function List({ type, name }: IList) {
    const dispatch = useAppDispatch();

    return (
        <section className="flex flex-col rounded-md ring-2 ring-primary/5">
            <div className="text-lg flex justify-between items-center p-4">
                {name}{" "}
                <DialogTrigger asChild>
                    <Button
                        className="text-lg"
                        onClick={() => dispatch(setModalType(type))}
                    >
                        Добавить
                    </Button>
                </DialogTrigger>
            </div>
            <ScrollArea
                className="rounded-md border bg-primary/3 p-4 inset-shadow-sm inset-shadow-primary/10 m-2"
                style={{ maxHeight: height, minHeight: height }}
            ></ScrollArea>
        </section>
    );
}

export default List;
