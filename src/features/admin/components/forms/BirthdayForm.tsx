import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import PersonIcon from "@/assets/icons/person.svg?react";
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
import {
    addNewDocByType,
    deleteDocByType,
    updateDocByType,
} from "@/features/admin/adminSlice";
import ImageCropper from "@/features/admin/components/cropper/ImageCropper";
import { upload } from "@/features/admin/loader";
import { selectTheme } from "@/features/settings/settingsSlice";
import { useAdminService } from "@/hooks/useAdminService";
import { useS3Media } from "@/hooks/useS3Media";
import { getBirthdayMonthDay } from "@/lib/birthdays";
import type { BirthdayDocument } from "@/services/AdminService";

const birthdaySchema = z.object({
    name: z.string().min(1, { message: "Заполните поле" }),
    displayDate: z.string().refine((value) => getBirthdayMonthDay(value) !== "", {
        message: "Выберите день и месяц",
    }),
    photo: z.any(),
    photoUrl: z.string().optional(),
    showEverywhere: z.boolean(),
    showInMainFeed: z.boolean(),
});

function BirthdayForm(doc: BirthdayDocument) {
    const dispatch = useAppDispatch();
    const org = useAppSelector(selectTheme);
    const admin = useAdminService();

    const closeRef = useRef<HTMLButtonElement>(null);
    const s3media = useS3Media(doc.photo);

    const form = useForm<z.infer<typeof birthdaySchema>>({
        resolver: zodResolver(birthdaySchema),
        defaultValues: {
            name: doc.name,
            displayDate:
                getBirthdayMonthDay(doc.displayDate),
            showEverywhere: doc.org === "all",
            showInMainFeed: doc.showInMainFeed,
            photo: undefined,
            photoUrl: doc.photo,
        },
    });

    const [showCropper, setShowCropper] = useState(false);
    const selectedFile = form.watch("photo")?.[0];

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setShowCropper(true);
        }
    };

    const handleCropped = (file: File) => {
        const fileList = {
            0: file,
            length: 1,
            item: () => file,
        } as unknown as FileList;

        form.setValue("photo", fileList);
        form.setValue("showInMainFeed", true);
        setShowCropper(false);
        upload((url: string) => form.setValue("photoUrl", url));
    };

    async function onSubmitCreate(values: z.infer<typeof birthdaySchema>) {
        try {
            if (!org) {
                throw new Error("Не выбрана организация");
            }

            const document: BirthdayDocument = {
                ...doc,
                name: values.name,
                displayDate: getBirthdayMonthDay(values.displayDate),
                org: values.showEverywhere ? "all" : org,
                showInMainFeed: values.showInMainFeed,
                photo: values.photoUrl || "",
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
                displayDate: getBirthdayMonthDay(values.displayDate),
                org: values.showEverywhere ? "all" : org,
                showInMainFeed: values.showInMainFeed,
                photo: values.photoUrl || "",
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
                        setShowCropper(false);
                        form.resetField("photo");
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
                                    <div className="flex gap-2">
                                        <select
                                            aria-label="День"
                                            className="h-9 rounded-md border px-3"
                                            value={field.value.split("-")[1] || ""}
                                            onBlur={field.onBlur}
                                            ref={field.ref}
                                            onChange={(event) => field.onChange(`${field.value.split("-")[0] || ""}-${event.target.value}`)}
                                        >
                                            <option value="" disabled>День</option>
                                            {Array.from({ length: new Date(2000, Number(field.value.split("-")[0]) || 1, 0).getDate() }, (_, i) => (
                                                <option key={i + 1} value={String(i + 1).padStart(2, "0")}>{i + 1}</option>
                                            ))}
                                        </select>
                                        <select
                                            aria-label="Месяц"
                                            className="h-9 rounded-md border px-3"
                                            value={field.value.split("-")[0] || ""}
                                            onBlur={field.onBlur}
                                            onChange={(event) => {
                                                const month = event.target.value;
                                                const day = field.value.split("-")[1] || "";
                                                const maxDay = new Date(2000, Number(month), 0).getDate();
                                                field.onChange(`${month}-${Number(day) > maxDay ? "" : day}`);
                                            }}
                                        >
                                            <option value="" disabled>Месяц</option>
                                            {["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"].map((month, i) => (
                                                <option key={month} value={String(i + 1).padStart(2, "0")}>{month}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <FormDescription className="max-w-9/12">
                                        Карточка будет отображаться каждый год в выбранный день и месяц
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
                                        ) : s3media ? (
                                            <img
                                                src={s3media}
                                                alt={""}
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                        ) : (
                                            <PersonIcon className="text-primary/50 size-48" />
                                        )}
                                        <Input
                                            id="media"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                onChange(e.target.files);
                                                handleFileChange(e);
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
