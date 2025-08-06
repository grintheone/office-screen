import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import MediaIcon from "@/assets/icons/media.svg?react";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
    addNewDocByType,
    deleteDocByType,
    updateDocByType,
    videoFormats,
} from "@/features/admin/adminSlice";
import { upload } from "@/features/admin/loader";
import { EffectSelectShema } from "@/features/display/displaySlice";
import { selectTheme } from "@/features/settings/settingsSlice";
import { useAdminService } from "@/hooks/useAdminService";
import { useS3Media } from "@/hooks/useS3Media";
import type { InfoDocument } from "@/services/AdminService";

function isVideoUrl(url: string) {
    const isVideo = videoFormats.some((format) => url.includes(format));

    if (isVideo) {
        return (
            <video
                className="w-full h-full object-cover rounded-md"
                src={url}
                preload="auto"
                autoPlay
                muted
            />
        );
    } else {
        return <img src={url} alt={""} className="" />;
    }
}

function isVideoFile(file: File) {
    const isVideo = videoFormats.some((format) => file.name.includes(format));

    if (isVideo) {
        return (
            <video
                className="w-full h-full object-contain rounded-md"
                src={URL.createObjectURL(file)}
                preload="auto"
                autoPlay
                muted
            />
        );
    } else {
        return (
            <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-full h-full object-contain rounded-md"
            />
        );
    }
}

const extraSchema = z.object({
    text: z.string(),
    media: z.any(),
    mediaUrl: z.string(),
    effect: z.enum(EffectSelectShema),
    showNow: z.boolean(),
    showEverywhere: z.boolean(),
});

function InfoForm(doc: InfoDocument) {
    const dispatch = useAppDispatch();
    const org = useAppSelector(selectTheme);
    const admin = useAdminService();

    const closeRef = useRef<HTMLButtonElement>(null);
    const s3media = useS3Media(doc.media);

    const form = useForm<z.infer<typeof extraSchema>>({
        resolver: zodResolver(extraSchema),
        defaultValues: {
            text: doc.text,
            effect: doc.effect,
            showNow: doc.showNow,
            showEverywhere: doc.org === "all",
            media: [] as File[],
            mediaUrl: doc.media,
        },
    });

    async function onSubmitCreate(values: z.infer<typeof extraSchema>) {
        try {
            if (!org) {
                throw new Error("Не выбрана организация");
            }

            const document: InfoDocument = {
                ...doc,
                text: values.text,
                effect: values.effect,
                showNow: values.showNow,
                org: values.showEverywhere ? "all" : org,
                media: values.mediaUrl,
            };

            const res = await admin?.createDocument(document);
            if (res) {
                dispatch(addNewDocByType({ type: document.type, doc: res }));
                toast.success("Событие успешно добавлено");
            }
        } catch (err) {
            console.log(err);
            toast.error("Не удалось добавить событие");
        } finally {
            closeRef.current?.click();
        }
    }

    async function onSubmitUpdate(values: z.infer<typeof extraSchema>) {
        try {
            if (!org) {
                throw new Error("Не выбрана организация");
            }

            const document: InfoDocument = {
                ...doc,
                text: values.text,
                effect: values.effect,
                showNow: values.showNow,
                org: values.showEverywhere ? "all" : org,
                media: values.mediaUrl,
            };

            const res = await admin?.updateDocument(document);
            if (res) {
                dispatch(updateDocByType({ type: document.type, doc: res }));
                toast.success("Событие успешно изменено");
            }
        } catch (err) {
            console.log(err);
            toast.error("Не удалось изменить событие");
        } finally {
            closeRef.current?.click();
        }
    }

    async function handleDelete() {
        if (!doc._rev) return;

        try {
            const res = await admin?.deleteDocument(doc._id, doc._rev);

            if (res) {
                dispatch(deleteDocByType({ type: doc.type, id: res.id }));
                toast.success("Событие успешно удалено");
            }
        } catch (err) {
            console.log(err);
            toast.error("Не удалось удалить событие");
        } finally {
            closeRef.current?.click();
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((values) =>
                    doc._rev ? onSubmitUpdate(values) : onSubmitCreate(values),
                )}
                className="space-y-4"
            >
                <div className="flex justify-between gap-8">
                    <div className="space-y-4 grow">
                        <FormField
                            control={form.control}
                            name="text"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Текст</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="effect"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Эффект</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={doc.effect}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="none">Без эффекта</SelectItem>
                                            <SelectItem value="fireworks">Салют</SelectItem>
                                            <SelectItem value="confetti">Конфетти</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Опционально можно выбрать эффект отображения.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="media"
                        render={({ field: { onChange, value, ...rest } }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative w-72 h-48 bg-primary/10 rounded-md flex items-center justify-center">
                                        {value.length > 0 ? (
                                            isVideoFile(value[0])
                                        ) : s3media ? (
                                            isVideoUrl(s3media)
                                        ) : (
                                            <MediaIcon className="text-primary/50 size-36" />
                                        )}
                                        <Input
                                            id="media"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            type="file"
                                            accept="image/*, video/*"
                                            onChange={(e) => {
                                                onChange(e.target.files);
                                                upload((url: string) => form.setValue("mediaUrl", url));
                                            }}
                                            {...rest}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="showNow"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-xs">
                            <div className="space-y-1">
                                <FormLabel>Показывать сейчас</FormLabel>
                                <FormDescription>
                                    Если включено, то показывается на экране
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="showEverywhere"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-xs">
                            <div className="space-y-1">
                                <FormLabel>Показывать везде</FormLabel>
                                <FormDescription>
                                    Включите чтобы отобразить на экранах в каждом офисе
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <DialogFooter>
                    {doc._rev ? (
                        <>
                            <Button className="text-lg" type="button" onClick={handleDelete}>
                                Удалить
                            </Button>
                            <Button className="text-lg" type="submit">
                                Изменить
                            </Button>
                        </>
                    ) : (
                        <Button className="text-lg" type="submit">
                            Добавить
                        </Button>
                    )}
                    <DialogClose ref={closeRef} className="hidden" />
                </DialogFooter>
            </form>
        </Form>
    );
}

export default InfoForm;
