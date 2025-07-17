import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
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
import { EffectSelectShema } from "@/features/display/displaySlice";


// Define accepted MIME types
const acceptedImageTypes = [
    "image/jpeg", // .jpeg, .jpg
    "image/png", // .png
];

const acceptedVideoTypes = [
    "video/mp4", // .mp4
    "video/webm", // .webm
];

const maxFileSize = 10 * 1024 * 1024; // 10MB

const extraSchema = z.object({
    text: z.string(),
    media: z
        .any()
        .refine((files) => files?.length === 1, "Добавьте фото/видео")
        .refine(
            (files) => files[0]?.size <= maxFileSize,
            `Размер не должен превышеать ${maxFileSize / 1024 / 1024}MB`,
        )
        .refine(
            (files) =>
                [...acceptedImageTypes, ...acceptedVideoTypes].includes(files[0]?.type),
            `Доступные медиа форматы: ${[
                ".jpg",
                ".jpeg",
                ".png",
                ".webp",
                ".mp4",
                ".webm",
                ".mov",
                ".avi",
            ].join(", ")}`,
        ),
    effect: z.enum(EffectSelectShema),
    showNow: z.boolean(),
    showEverywhere: z.boolean(),
});

function InfoForm() {
    const closeRef = useRef<HTMLButtonElement>(null);

    const form = useForm<z.infer<typeof extraSchema>>({
        resolver: zodResolver(extraSchema),
        defaultValues: {
            text: "",
            effect: "none",
            showNow: true,
            showEverywhere: false,
            media: [] as File[],
        },
    });

    function onSubmit(values: z.infer<typeof extraSchema>) {
        console.log(values);
        toast.success("Событие успешно добавлено");
        closeRef.current?.click();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                    <Select onValueChange={field.onChange} defaultValue={"none"}>
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
                                            <img
                                                src={URL.createObjectURL(value[0])}
                                                alt={value[0].name}
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                        ) : (
                                            <MediaIcon className="text-primary/50 size-36" />
                                        )}
                                        <Input
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            type="file"
                                            accept="image/*, video/*"
                                            onChange={(e) => onChange(e.target.files)}
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
                    <Button className="text-lg" type="submit">
                        Добавить
                    </Button>
                    <DialogClose ref={closeRef} className="hidden" />
                </DialogFooter>
            </form>
        </Form>
    );
}

export default InfoForm;
