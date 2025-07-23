import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import ImageIcon from "@/assets/icons/image.svg?react";
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
import { addNewDocByType } from "@/features/admin/adminSlice";
import { selectTheme } from "@/features/settings/settingsSlice";
import { useAdminService } from "@/hooks/useAdminService";
import type { ClockDocument } from "@/services/AdminService";

// Define accepted MIME types
const ACCEPTER_IMAGE_TYPES = [
    "image/jpeg", // .jpeg, .jpg
    "image/png", // .png
];

const maxFileSize = 10 * 1024 * 1024; // 10MB

const clockSchema = z.object({
    text: z.string().min(1, { message: "Заполните поле" }),
    image: z
        .any()
        .refine((files) => files?.length === 1, "Добавьте фото/видео")
        .refine(
            (files) => files[0]?.size <= maxFileSize,
            `Размер не должен превышеать ${maxFileSize / 1024 / 1024}MB`,
        )
        .refine(
            (files) => ACCEPTER_IMAGE_TYPES.includes(files[0]?.type),
            `Доступные медиа форматы: ${[".jpg", ".jpeg", ".png"].join(", ")}`,
        ),
    showNow: z.boolean(),
    showEverywhere: z.boolean(),
});

function ClockForm() {
    const dispatch = useAppDispatch();
    const org = useAppSelector(selectTheme);
    const admin = useAdminService();

    const closeRef = useRef<HTMLButtonElement>(null);

    const form = useForm<z.infer<typeof clockSchema>>({
        resolver: zodResolver(clockSchema),
        defaultValues: {
            text: "",
            showNow: true,
            showEverywhere: false,
            image: [] as File[],
        },
    });

    async function onSubmit(values: z.infer<typeof clockSchema>) {
        try {
            if (!org) {
                throw new Error("Не выбрана организация");
            }

            const document: Omit<ClockDocument, "_id" | "_rev" | "type"> = {
                text: values.text,
                org: values.showEverywhere ? "all" : org,
                showNow: values.showNow,
                image: "",
            };

            const res = await admin?.createDocument("clock", document);
            dispatch(addNewDocByType({ type: "clock", doc: res as ClockDocument }));
            toast.success("Элемент успешно добавлен");
        } catch (err) {
            console.log(err);
            toast.error("Не удалось добавить элемент");
        } finally {
            closeRef.current?.click();
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex gap-4 justify-between items-stretch">
                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                            <FormItem className="grow w-full">
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
                        name="image"
                        render={({ field: { onChange, value, ...rest } }) => (
                            (
                                <FormItem>
                                    <FormControl>
                                        <div className="relative w-72 h-48 bg-primary/10 rounded-md flex items-center justify-center">
                                            {value.length > 0 ? (
                                                <img
                                                    src={URL.createObjectURL(value[0])}
                                                    alt={value[0].name}
                                                    className="w-full h-full object-cover rounded-md"
                                                />
                                            ) : (
                                                <ImageIcon className="text-primary/50 size-48" />
                                            )}
                                            <Input
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => onChange(e.target.files)}
                                                {...rest}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
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
                    <Button className="text-lg" type="submit">
                        Добавить
                    </Button>
                    <DialogClose ref={closeRef} className="hidden" />
                </DialogFooter>
            </form>
        </Form>
    );
}

export default ClockForm;
