import { useAppSelector } from "@/app/hooks";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    selectFormData
} from "@/features/admin/adminSlice";
import BirthdayForm from "@/features/admin/components/forms/BirthdayForm";
import ClockForm from "@/features/admin/components/forms/ClockForm";
import HolidayForm from "@/features/admin/components/forms/HolidayForm";
import InfoForm from "@/features/admin/components/forms/InfoForm";
import QuoteForm from "@/features/admin/components/forms/QuoteForm";
import { selectTheme } from "@/features/settings/settingsSlice";
import type { AnyDocument, BirthdayDocument, ClockDocument, HolidayDocument, InfoDocument, QuoteDocument } from "@/services/AdminService";

function getModalTitleByType(formData: AnyDocument) {
    const firstWord = formData._rev ? "Изменить" : "Добавить"

    switch (formData.type) {
        case "birthday":
            return `${firstWord} день рождение`;
        case "holiday":
            return `${firstWord} праздник`;
        case "info":
            return `${firstWord} событие/оборудование`;
        case "quote":
            return `${firstWord} цитату`;
        case "clock":
            return `${firstWord} элемент`;
    }


}

function getModalFormByType(formData: AnyDocument) {
    switch (formData.type) {
        case "birthday":
            return <BirthdayForm {...formData as BirthdayDocument} />;
        case "holiday":
            return <HolidayForm {...formData as HolidayDocument} />;
        case "info":
            return <InfoForm {...formData as InfoDocument} />;
        case "quote":
            return <QuoteForm {...formData as QuoteDocument} />;
        case "clock":
            return <ClockForm {...formData as ClockDocument} />;
    }
}

function Modal() {
    const org = useAppSelector(selectTheme);
    const formData = useAppSelector(selectFormData);

    if (!formData) return null;

    return (
        <DialogContent
            className={`${org}-theme ${formData.type === "holiday" || formData.type === "info" ? "sm:max-w-4xl" : "sm:max-w-3xl"}`}
        >
            <DialogHeader>
                <DialogTitle className="text-2xl">
                    {getModalTitleByType(formData)}
                </DialogTitle>
            </DialogHeader>
            {getModalFormByType(formData)}
        </DialogContent>
    );
}

export default Modal;
