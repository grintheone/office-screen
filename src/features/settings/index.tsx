import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import SettingsIcon from "@/assets/icons/settings.svg?react";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { selectSettings, selectTheme, setSettings } from "@/features/settings/settingsSlice";

const FormSchema = z.object({
    globalEffect: z.enum(["disabled", "snow", "flowers"], {
        error: "Выберите один из вариантов",
    }),
});

export type TSettings = z.infer<typeof FormSchema>

function Settings() {
    const dispatch = useAppDispatch()
    const currentSettings = useAppSelector(selectSettings)
    const [open, setOpen] = useState(false);

    const org = useAppSelector(selectTheme);
    const form = useForm<TSettings>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            globalEffect: currentSettings.globalEffect
        }
    });

    function onSubmit(data: TSettings) {
        setOpen(false)
        dispatch(setSettings(data))
        toast.success("Настройки сохранены");
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="hover:animate-half-spin">
                <SettingsIcon className="size-10 text-primary" />
            </SheetTrigger>
            <SheetContent className={`${org}-theme justify-between`}>
                <SheetHeader className="grow gap-3">
                    <SheetTitle className="text-xl">Настройки панели</SheetTitle>
                    <SheetDescription asChild>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="h-full flex flex-col"
                            >
                                <FormField
                                    control={form.control}
                                    name="globalEffect"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel className="text-lg">
                                                Глобальный эффект
                                            </FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex flex-col"
                                                >
                                                    <FormItem className="flex items-center gap-3">
                                                        <FormControl>
                                                            <RadioGroupItem value="disabled" />
                                                        </FormControl>
                                                        <FormLabel>Выключен</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center gap-3">
                                                        <FormControl>
                                                            <RadioGroupItem value="snow" />
                                                        </FormControl>
                                                        <FormLabel>Снегопад</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center gap-3">
                                                        <FormControl>
                                                            <RadioGroupItem value="flowers" />
                                                        </FormControl>
                                                        <FormLabel>Цветопад</FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <SheetFooter className="p-0">
                                    <Button type="submit">
                                        Сохранить
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => {
                                            setOpen(false)
                                            form.reset()
                                        }}
                                    >
                                        Отмена
                                    </Button>
                                </SheetFooter>
                            </form>
                        </Form>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}

export default Settings;
