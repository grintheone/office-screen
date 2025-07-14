import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRef, useState } from "react";
import { ru } from "react-day-picker/locale";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import MediaIcon from "@/assets/icons/media.svg?react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

// Define accepted MIME types
const acceptedImageTypes = [
    'image/jpeg',      // .jpeg, .jpg
    'image/png',       // .png
];

const acceptedVideoTypes = [
    'video/mp4',       // .mp4
    'video/webm',      // .webm
];

const maxFileSize = 10 * 1024 * 1024; // 10MB


const holidaySchema = z.object({
    title: z.string().min(1, { message: "Заполните поле" }),
    displayDate: z.date({
        error: "Выберите дату отображения",
    }),
    media: z
        .any()
        .refine((files) => files?.length === 1, 'Добавьте фото/видео')
        .refine(
            (files) => files[0]?.size <= maxFileSize,
            `Размер не должен превышеать ${maxFileSize / 1024 / 1024}MB`
        )
        .refine(
            (files) => [...acceptedImageTypes, ...acceptedVideoTypes].includes(files[0]?.type),
            `Доступные медиа форматы: ${[
                '.jpg', '.jpeg', '.png', '.webp',
                '.mp4', '.webm', '.mov', '.avi'
            ].join(', ')}`
        ),
    effect: z.string(),
    showEverywhere: z.boolean(),
});

function HolidayForm() {
    const [open, setOpen] = useState(false);
    const closeRef = useRef<HTMLButtonElement>(null);

    const form = useForm<z.infer<typeof holidaySchema>>({
        resolver: zodResolver(holidaySchema),
        defaultValues: {
            title: "",
            displayDate: undefined,
            effect: "0",
            showEverywhere: false,
            media: [] as File[],
        },
    });

    function onSubmit(values: z.infer<typeof holidaySchema>) {
        console.log(values);
        toast.success("Праздник успешно добавлен");
        closeRef.current?.click();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex justify-between gap-8">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Название</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-4">
                            <FormField
                                control={form.control}
                                name="displayDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Дата отображения</FormLabel>
                                        <Popover open={open} onOpenChange={setOpen}>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[248px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground",
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Нажмите чтобы выбрать</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    locale={ru}
                                                    selected={field.value}
                                                    onSelect={(date) => {
                                                        field.onChange(date);
                                                        setOpen(false);
                                                    }}
                                                    captionLayout="label"
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                            Карточка будет отображаться на доске в выбранную дату
                                        </FormDescription>
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
                                            defaultValue={"0"}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="0">
                                                    Без эффекта
                                                </SelectItem>
                                                <SelectItem value="1">
                                                    Салют
                                                </SelectItem>
                                                <SelectItem value="2">
                                                    Конфетти
                                                </SelectItem>
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

export default HolidayForm;
