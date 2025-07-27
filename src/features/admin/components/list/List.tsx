import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import LoadingIcon from "@/assets/icons/loading.svg?react"
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    type AdminContentTypes,
    selectAllDocsByType,
    setAllDocsByType,
    setFormData
} from "@/features/admin/adminSlice";
import BirthdayCard from "@/features/admin/components/cards/BirthdayCard";
import ClockCard from "@/features/admin/components/cards/ClockCard";
import HolidayCard from "@/features/admin/components/cards/HolidayCard";
import InfoCard from "@/features/admin/components/cards/InfoCard";
import QuoteCard from "@/features/admin/components/cards/QuoteCard";
import { selectTheme, type Theme } from "@/features/settings/settingsSlice";
import { useAdminService } from "@/hooks/useAdminService";
import type { AnyDocument, BirthdayDocument, ClockDocument, HolidayDocument, InfoDocument, QuoteDocument } from "@/services/AdminService";

export interface IList {
    type: AdminContentTypes;
    name: string;
}

// temporary hack to scale the panels
// and allow scrolling within
const height = "calc(100vh - 222px)";

function displayCardsByType<T extends AdminContentTypes>(type: T, docs: AnyDocument[]) {
    return docs.map(doc => {
        switch (type) {
            case "info":
                return <InfoCard key={doc._id} {...doc as InfoDocument} />;
            case "holiday":
                return <HolidayCard key={doc._id} {...doc as HolidayDocument} />;
            case "quote":
                return <QuoteCard key={doc._id} {...doc as QuoteDocument} />;
            case "birthday":
                return <BirthdayCard key={doc._id} {...doc as BirthdayDocument} />;
            case "clock":
                return <ClockCard key={doc._id} {...doc as ClockDocument} />;
            default:
                return null;
        }
    })
}

function getInitialFormDataByType(type: AdminContentTypes, org: Theme) {
    switch (type) {
        case "info":
            return {
                _id: new Date().toISOString(),
                org,
                type,
                text: "",
                effect: "none",
                showNow: true,
                media: ""
            } as InfoDocument
        case "holiday":
            return {
                _id: new Date().toISOString(),
                org,
                type,
                title: "",
                displayDate: "",
                effect: "none",
                image: ""
            } as HolidayDocument
        case "quote":
            return {
                _id: new Date().toISOString(),
                org,
                type,
                author: "",
                text: ""
            }
        case "birthday":
            return {
                _id: new Date().toISOString(),
                org,
                type,
                name: "",
                displayDate: "",
                showInMainFeed: false,
                photo: "",
            } as BirthdayDocument
        case "clock":
            return {
                _id: new Date().toISOString(),
                org,
                type,
                text: "",
                showNow: true,
                image: ""
            } as ClockDocument
    }

    return null
}

function List({ type, name }: IList) {
    const [loading, setIsLoading] = useState(false)

    const org = useAppSelector(selectTheme);
    const docs = useAppSelector(state => selectAllDocsByType(state, type));

    const dispatch = useAppDispatch();
    const service = useAdminService();

    useEffect(() => {
        if (!service) return;

        const db = service.getLocalDb();

        const fetchData = async () => {
            try {
                setIsLoading(true)
                const result = await db.find({
                    selector: {
                        type,
                        org: { $in: [org, 'all'] },
                        _id: { $gt: null }
                    },
                    sort: [{ '_id': 'desc' }],
                    limit: 999,
                });
                const docs = result.docs as AnyDocument[]
                dispatch(setAllDocsByType({ type, docs }))
            } catch (err) {
                console.error("Failed to fetch data:", err);
            } finally {
                setIsLoading(false)
            }
        };

        fetchData();
    }, [service, type, org, dispatch]);

    return (
        <section className="flex flex-col rounded-md ring-2 ring-primary/10">
            <div className="text-lg flex justify-between items-center p-4">
                {name}{" "}
                <DialogTrigger asChild>
                    <Button
                        className="text-lg"
                        onClick={() => dispatch(setFormData(getInitialFormDataByType(type, org as Theme)))}
                    >
                        Добавить
                    </Button>
                </DialogTrigger>
            </div>
            {loading ? (
                <div className="grow flex items-center justify-center">
                    <LoadingIcon className="fill-primary size-10" />
                </div>
            ) : <ScrollArea
                className="rounded-md border bg-primary/3 inset-shadow-sm inset-shadow-primary/10 m-2 p-0"
                style={{ maxHeight: height, minHeight: height }}
            >
                {displayCardsByType(type, docs)}
            </ScrollArea>}
        </section>
    );
}

export default List;
