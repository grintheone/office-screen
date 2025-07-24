import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { addNewDocByType, deleteDocByType, updateDocByType } from "@/features/admin/adminSlice";
import { selectTheme } from "@/features/settings/settingsSlice";
import { useAdminService } from "@/hooks/useAdminService";
import type { QuoteDocument } from "@/services/AdminService";

const quoteSchema = z.object({
    author: z.string(),
    text: z.string().min(1, { message: "Введите текст цитаты" }),
    showEverywhere: z.boolean(),
});

function QuoteForm(doc: QuoteDocument) {
    const dispatch = useAppDispatch();
    const org = useAppSelector(selectTheme);
    const admin = useAdminService();

    const closeRef = useRef<HTMLButtonElement>(null);

    const form = useForm<z.infer<typeof quoteSchema>>({
        resolver: zodResolver(quoteSchema),
        defaultValues: {
            author: doc.author,
            text: doc.text,
            showEverywhere: doc.org === "all",
        },
    });

    async function onSubmitCreate(values: z.infer<typeof quoteSchema>) {
        try {
            if (!org) {
                throw new Error("Не выбрана организация");
            }

            const document: QuoteDocument = {
                ...doc,
                author: values.author,
                text: values.text,
                org: values.showEverywhere ? "all" : org,
            }

            const res = await admin?.createDocument(document);
            if (res) {
                dispatch(
                    addNewDocByType({ type: document.type, doc: res }),
                );
                toast.success("Цитата успешно добавлена");
            }

        } catch (err) {
            console.log(err)
            toast.error("Не удалось добавить цитату");
        } finally {
            closeRef.current?.click();
        }
    }

    async function onSubmitUpdate(values: z.infer<typeof quoteSchema>) {
        try {
            if (!org) {
                throw new Error("Не выбрана организация");
            }

            const document: QuoteDocument = {
                ...doc,
                author: values.author,
                text: values.text,
                org: values.showEverywhere ? "all" : org,
            }

            const res = await admin?.updateDocument(document);
            if (res) {
                dispatch(
                    updateDocByType({ type: document.type, doc: res }),
                );
                toast.success("Цитата успешно отредактирована");
            }

        } catch (err) {
            console.log(err)
            toast.error("Не удалось отредактировать цитату");
        } finally {
            closeRef.current?.click();
        }
    }

    async function handleDelete() {
        if (!doc._rev) return

        try {
            const res = await admin?.deleteDocument(doc._id, doc._rev)

            if (res) {
                dispatch(
                    deleteDocByType({ type: doc.type, id: res.id }),
                );
                toast.success("День рождение успешно удалено");
            }
        } catch (err) {
            console.log(err)
            toast.error("Не удалось удалить день рождение");
        } finally {
            closeRef.current?.click();
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((values) => doc._rev ? onSubmitUpdate(values) : onSubmitCreate(values))}
                className="space-y-4">
                <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Автор (не обязательно)</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                    ) :
                        <Button className="text-lg" type="submit">
                            Добавить
                        </Button>
                    }
                    <DialogClose ref={closeRef} className="hidden" />
                </DialogFooter>
            </form>
        </Form>
    );
}

export default QuoteForm;
