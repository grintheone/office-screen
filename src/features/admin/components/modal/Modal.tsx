import { useAppSelector } from "@/app/hooks";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    type AdminContentTypes,
    selectModalType,
} from "@/features/admin/adminSlice";
import BirthdayForm from "@/features/admin/components/forms/BirthdayForm";
import ClockForm from "@/features/admin/components/forms/ClockForm";
import HolidayForm from "@/features/admin/components/forms/HolidayForm";
import InfoForm from "@/features/admin/components/forms/InfoForm";
import QuoteForm from "@/features/admin/components/forms/QuoteForm";
import { selectTheme } from "@/features/settings/settingsSlice";

function getModalTitleByType(type: AdminContentTypes) {
    switch (type) {
        case "birthday":
            return "Добавить день рождение";
        case "holiday":
            return "Добавить праздник";
        case "info":
            return "Добавить событие/оборудование";
        case "quote":
            return "Добавить цитату";
        case "clock":
            return "Добавить элемент";
    }
}

function getModalFormByType(type: AdminContentTypes) {
    switch (type) {
        case "birthday":
            return <BirthdayForm />;
        case "holiday":
            return <HolidayForm />;
        case "info":
            return <InfoForm />;
        case "quote":
            return <QuoteForm />;
        case "clock":
            return <ClockForm />;
    }
}

function Modal() {
    const org = useAppSelector(selectTheme);
    const modalType = useAppSelector(selectModalType);

    if (!modalType) return null;

    return (
        <DialogContent
            className={`${org}-theme ${modalType === "holiday" || modalType === "info" ? "sm:max-w-4xl" : "sm:max-w-3xl"}`}
        >
            <DialogHeader>
                <DialogTitle className="text-2xl">
                    {getModalTitleByType(modalType)}
                </DialogTitle>
            </DialogHeader>
            {getModalFormByType(modalType)}
        </DialogContent>
    );
}

export default Modal;
