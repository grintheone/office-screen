import { useAppDispatch } from "@/app/hooks";
import PersonIcon from "@/assets/icons/person.svg?react";
import { DialogTrigger } from "@/components/ui/dialog";
import { setFormData } from "@/features/admin/adminSlice";
import type { BirthdayDocument } from "@/services/AdminService";

function BirthdayCard(doc: BirthdayDocument) {
    const dispatch = useAppDispatch()

    return (
        <div
            className={`${doc.org === "all" ? "ring-primary/90" : ""} bg-white ring-2 ring-primary/10 m-4 rounded-md  hover:ring-primary/50`}
        >
            <DialogTrigger
                className="flex justify-between items-center gap-4 text-sm size-full p-2"
                onClick={() => dispatch(setFormData(doc))}>
                <div className="flex items-center gap-4">
                    <PersonIcon className="size-16 text-primary/50" />
                    <div>{doc.name}</div>
                </div>
                <div>{new Date(doc.displayDate).toLocaleDateString()}</div>
            </DialogTrigger>
        </div>
    );
}

export default BirthdayCard;
