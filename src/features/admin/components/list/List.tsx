import { useAppDispatch } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    type AdminContentTypes,
    setModalType,
} from "@/features/admin/adminSlice";
import BirthdayCard from "@/features/admin/components/cards/BirthdayCard";
import ClockCard from "@/features/admin/components/cards/ClockCard";
import ExtraCard from "@/features/admin/components/cards/ExtraCard";
import HolidayCard from "@/features/admin/components/cards/HolidayCard";
import QuoteCard from "@/features/admin/components/cards/QuoteCard";

export interface IList {
    type: AdminContentTypes;
    name: string;
}

// temporary hack to scale the panels
// and allow scrolling within
const height = "calc(100vh - 222px)";

function displayCardByType(type: AdminContentTypes) {
    switch (type) {
        case "birthday":
            return <BirthdayCard />;
        case "holiday":
            return <HolidayCard />;
        case "extra":
            return <ExtraCard />;
        case "quote":
            return <QuoteCard />;
        case "clock":
            return <ClockCard />
    }
}

function List({ type, name }: IList) {
    const dispatch = useAppDispatch();

    return (
        <section className="flex flex-col rounded-md ring-2 ring-primary/10">
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
                className="rounded-md border bg-primary/3 inset-shadow-sm inset-shadow-primary/10 m-2 p-0"
                style={{ maxHeight: height, minHeight: height }}
            >
                {displayCardByType(type)}
            </ScrollArea>
        </section>
    );
}

export default List;
