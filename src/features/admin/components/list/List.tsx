import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import LoadingIcon from "@/assets/icons/loading.svg?react"
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GripVertical } from "lucide-react";
import { toast } from "sonner";
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
import { cn } from "@/lib/utils";
import {
    normalizeDocumentOrders,
    sortDocumentsByOrder,
} from "@/lib/adminDocuments";
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
    const defaultOrder = -Date.now();

    switch (type) {
        case "info":
            return {
                _id: new Date().toISOString(),
                org,
                order: defaultOrder,
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
                order: defaultOrder,
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
                order: defaultOrder,
                type,
                author: "",
                text: ""
            }
        case "birthday":
            return {
                _id: new Date().toISOString(),
                org,
                order: defaultOrder,
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
                order: defaultOrder,
                type,
                text: "",
                showNow: true,
                image: ""
            } as ClockDocument
    }

    return null
}

type DropPosition = "before" | "after";

function reorderDocuments<T extends AnyDocument>(
    docs: T[],
    draggedId: string,
    targetId: string,
    position: DropPosition,
) {
    if (draggedId === targetId) {
        return docs;
    }

    const nextDocs = [...docs];
    const draggedIndex = nextDocs.findIndex((doc) => doc._id === draggedId);
    if (draggedIndex === -1) {
        return docs;
    }

    const [draggedDoc] = nextDocs.splice(draggedIndex, 1);
    const targetIndex = nextDocs.findIndex((doc) => doc._id === targetId);
    if (targetIndex === -1) {
        return docs;
    }

    nextDocs.splice(position === "after" ? targetIndex + 1 : targetIndex, 0, draggedDoc);
    return normalizeDocumentOrders(nextDocs) as T[];
}

function List({ type, name }: IList) {
    const [loading, setIsLoading] = useState(false)
    const [draggedId, setDraggedId] = useState<string | null>(null);
    const [dropTarget, setDropTarget] = useState<{
        id: string;
        position: DropPosition;
    } | null>(null);
    const [isSavingOrder, setIsSavingOrder] = useState(false);

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
                    limit: 999,
                });
                const docs = sortDocumentsByOrder(result.docs as AnyDocument[])
                dispatch(setAllDocsByType({ type, docs }))
            } catch (err) {
                console.error("Failed to fetch data:", err);
            } finally {
                setIsLoading(false)
            }
        };

        fetchData();
    }, [service, type, org, dispatch]);

    const resetDragState = () => {
        setDraggedId(null);
        setDropTarget(null);
    };

    const handleDrop = async (targetId: string) => {
        if (!draggedId || draggedId === targetId || !service || isSavingOrder) {
            resetDragState();
            return;
        }

        const nextDocs = reorderDocuments(
            docs,
            draggedId,
            targetId,
            dropTarget?.position ?? "before",
        );

        if (nextDocs === docs) {
            resetDragState();
            return;
        }

        dispatch(setAllDocsByType({ type, docs: nextDocs }));
        resetDragState();
        setIsSavingOrder(true);

        try {
            const updatedDocs = await Promise.all(
                nextDocs.map((doc) => service.updateDocument(doc)),
            );
            dispatch(
                setAllDocsByType({
                    type,
                    docs: sortDocumentsByOrder(updatedDocs),
                }),
            );
        } catch (err) {
            console.error("Failed to persist new order:", err);
            dispatch(
                setAllDocsByType({
                    type,
                    docs: sortDocumentsByOrder(docs),
                }),
            );
            toast.error("Не удалось сохранить новый порядок карточек");
        } finally {
            setIsSavingOrder(false);
        }
    };

    return (
        <section className="flex flex-col rounded-md ring-2 ring-primary/10">
            <div className="text-lg flex justify-between items-center p-4">
                <div>{name}</div>
                <div className="flex items-center gap-3">
                    {isSavingOrder && (
                        <span className="flex items-center gap-2 text-sm text-primary/70">
                            <LoadingIcon className="size-4 fill-primary animate-spin" />
                            Сохраняем порядок...
                        </span>
                    )}
                <DialogTrigger asChild>
                    <Button
                        className="text-lg"
                        disabled={isSavingOrder}
                        onClick={() => dispatch(setFormData(getInitialFormDataByType(type, org as Theme)))}
                    >
                        Добавить
                    </Button>
                </DialogTrigger>
                </div>
            </div>
            {loading ? (
                <div className="grow flex items-center justify-center">
                    <LoadingIcon className="fill-primary size-10" />
                </div>
            ) : <ScrollArea
                className="rounded-md border bg-primary/3 inset-shadow-sm inset-shadow-primary/10 m-2 p-0"
                style={{ maxHeight: height, minHeight: height }}
            >
                {docs.map((doc) => {
                    const isDragged = draggedId === doc._id;
                    const isDropTarget = dropTarget?.id === doc._id;

                    return (
                        <div
                            key={doc._id}
                            className={cn(
                                "group relative transition-all",
                                isDragged && "scale-[0.99] opacity-45",
                                isSavingOrder && "pointer-events-none",
                            )}
                            onDragOver={(event) => {
                                event.preventDefault();

                                if (draggedId === doc._id || isSavingOrder) {
                                    return;
                                }

                                const rect = event.currentTarget.getBoundingClientRect();
                                const position = event.clientY - rect.top < rect.height / 2
                                    ? "before"
                                    : "after";

                                setDropTarget({
                                    id: doc._id,
                                    position,
                                });
                            }}
                            onDrop={(event) => {
                                event.preventDefault();
                                void handleDrop(doc._id);
                            }}
                            onDragLeave={(event) => {
                                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                                    setDropTarget((prev) => prev?.id === doc._id ? null : prev);
                                }
                            }}
                            onDragEnd={resetDragState}
                        >
                            {isDropTarget && (
                                <div
                                    className={cn(
                                        "pointer-events-none absolute left-4 right-4 z-30",
                                        dropTarget.position === "before" ? "top-0 -translate-y-1/2" : "bottom-0 translate-y-1/2",
                                    )}
                                >
                                    <div className="relative">
                                        <div className="h-1 rounded-full bg-primary shadow-[0_0_0_4px_rgba(255,255,255,0.85)]" />
                                        <span className="absolute -top-6 right-0 rounded-md bg-primary px-2 py-0.5 text-[11px] font-medium text-white shadow-sm">
                                            Отпустите, чтобы переместить
                                        </span>
                                    </div>
                                </div>
                            )}
                            <button
                                type="button"
                                draggable
                                className={cn(
                                    "absolute right-7 top-1/2 z-20 -translate-y-1/2 rounded-md bg-white/90 p-1 text-primary shadow-sm ring-1 ring-primary/15 cursor-grab active:cursor-grabbing transition-all opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
                                    isSavingOrder && "cursor-not-allowed opacity-50",
                                )}
                                aria-label="Перетащить карточку"
                                disabled={isSavingOrder}
                                onClick={(event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                }}
                                onDragStart={(event) => {
                                    if (isSavingOrder) {
                                        event.preventDefault();
                                        return;
                                    }

                                    setDraggedId(doc._id);
                                    event.dataTransfer.effectAllowed = "move";
                                    event.dataTransfer.setData("text/plain", doc._id);
                                }}
                            >
                                <GripVertical className="size-4" />
                            </button>
                            {displayCardsByType(type, [doc])}
                        </div>
                    );
                })}
            </ScrollArea>}
        </section>
    );
}

export default List;
