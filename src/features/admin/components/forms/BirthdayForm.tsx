import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRef, useState } from "react";
import { ru } from "react-day-picker/locale";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import PersonIcon from "@/assets/icons/person.svg?react";
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
import { Switch } from "@/components/ui/switch";
import {
    addNewDocByType,
    deleteDocByType,
    updateDocByType,
} from "@/features/admin/adminSlice";
import ImageCropper from "@/features/admin/components/cropper/ImageCropper";
import { selectTheme } from "@/features/settings/settingsSlice";
import { useAdminService } from "@/hooks/useAdminService";
import { cn } from "@/lib/utils";
import type { BirthdayDocument } from "@/services/AdminService";

const birthdaySchema = z.object({
    name: z.string().min(1, { message: "Заполните поле" }),
    displayDate: z.date({
        error: "Выберите дату отображения",
    }),
    // photo: z.instanceof(FileList).optional(),
    photo: z.any(),
    showEverywhere: z.boolean(),
    showInMainFeed: z.boolean(),
});

function BirthdayForm(doc: BirthdayDocument) {
    const dispatch = useAppDispatch();
    const org = useAppSelector(selectTheme);
    const admin = useAdminService();

    const [open, setOpen] = useState(false);
    const closeRef = useRef<HTMLButtonElement>(null);

    const form = useForm<z.infer<typeof birthdaySchema>>({
        resolver: zodResolver(birthdaySchema),
        defaultValues: {
            name: doc.name,
            displayDate:
                doc.displayDate === "" ? undefined : new Date(doc.displayDate),
            showEverywhere: doc.org === "all",
            showInMainFeed: doc.showInMainFeed,
            photo: undefined,
        },
    });

    const [showCropper, setShowCropper] = useState(false);
    const selectedFile = form.watch("photo")?.[0];

    console.log(selectedFile, 'selected')

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setShowCropper(true);
        }
    };

    const handleCropped = (file: File) => {
        const fileList = {
            0: file,
            length: 1,
            item: () => file
        } as unknown as FileList;

        form.setValue("photo", fileList);
        form.setValue("showInMainFeed", true)
        setShowCropper(false);
    };

    async function onSubmitCreate(values: z.infer<typeof birthdaySchema>) {
        try {
            if (!org) {
                throw new Error("Не выбрана организация");
            }

            const document: BirthdayDocument = {
                ...doc,
                name: values.name,
                displayDate: format(values.displayDate, "yyyy-MM-dd"),
                org: values.showEverywhere ? "all" : org,
                showInMainFeed: values.showInMainFeed,
                photo: "",
            };

            const res = await admin?.createDocument(document);
            if (res) {
                dispatch(addNewDocByType({ type: document.type, doc: res }));
                toast.success("День рождение успешно добавлено");
            }
        } catch (err) {
            console.log(err);
            toast.error("Не удалось добавить день рождение");
        } finally {
            closeRef.current?.click();
        }
    }

    async function onSubmitUpdate(values: z.infer<typeof birthdaySchema>) {
        try {
            if (!org) {
                throw new Error("Не выбрана организация");
            }

            const document: BirthdayDocument = {
                ...doc,
                name: values.name,
                displayDate: format(values.displayDate, "yyyy-MM-dd"),
                org: values.showEverywhere ? "all" : org,
                showInMainFeed: values.showInMainFeed,
                photo: "",
            };

            const res = await admin?.updateDocument(document);
            if (res) {
                dispatch(updateDocByType({ type: document.type, doc: res }));
                toast.success("День рождение успешно изменено");
            }
        } catch (err) {
            console.log(err);
            toast.error("Не удалось обновить день рождение");
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
                toast.success("День рождение успешно удалено");
            }
        } catch (err) {
            console.log(err);
            toast.error("Не удалось удалить день рождение");
        } finally {
            closeRef.current?.click();
        }
    }

    return (
        <Form {...form}>
            {showCropper && selectedFile && (
                <ImageCropper
                    file={selectedFile}
                    onComplete={handleCropped}
                    onCancel={() => {
                        setShowCropper(false)
                        form.resetField('photo')
                    }}
                />
            )}
            <form
                onSubmit={form.handleSubmit((values) =>
                    doc._rev ? onSubmitUpdate(values) : onSubmitCreate(values),
                )}
                className="space-y-4"
            >
                <div className="flex justify-between gap-8">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Имя Фамилия</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                    <FormDescription className="max-w-9/12">
                                        Карточка будет отображаться на доске в выбранную дату
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="photo"
                        render={({ field: { onChange, value, ...rest } }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative size-48 bg-primary/10 rounded-md flex items-center justify-center">
                                        {value ? (
                                            <img
                                                src={URL.createObjectURL(value[0])}
                                                alt={value[0].name}
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                        ) : (
                                            <PersonIcon className="text-primary/50 size-48" />
                                        )}
                                        <Input
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {

                                                onChange(e.target.files);
                                                handleFileChange(e)
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
                <FormField
                    control={form.control}
                    name="showInMainFeed"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-xs">
                            <div className="space-y-1">
                                <FormLabel>Отображать в основной ленте</FormLabel>
                                <FormDescription>
                                    Включите чтобы отобразить в основной ленте (только с фото)
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

export default BirthdayForm;
