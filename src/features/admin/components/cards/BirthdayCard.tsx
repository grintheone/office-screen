import { useAppDispatch } from "@/app/hooks";
import PersonIcon from "@/assets/icons/person.svg?react";
import { DialogTrigger } from "@/components/ui/dialog";
import { setFormData } from "@/features/admin/adminSlice";
import { useS3Media } from "@/hooks/useS3Media";
import type { BirthdayDocument } from "@/services/AdminService";

function BirthdayCard(doc: BirthdayDocument) {
    const dispatch = useAppDispatch();
    const imageUrl = useS3Media(doc.photo);

    return (
        <div
            className={`${doc.org === "all" ? "ring-primary/90" : ""} bg-white ring-2 ring-primary/10 m-4 rounded-md  hover:ring-primary/50`}
        >
            <DialogTrigger
                className="flex justify-between items-center gap-4 text-sm size-full p-2"
                onClick={() => dispatch(setFormData(doc))}
            >
                <div className="flex items-center gap-4">
                    {doc.photo && imageUrl ? (
                        <img
                            className="size-16 text-primary/50 object-center object-cover rounded-md"
                            src={imageUrl}
                            alt=""
                        />
                    ) : (
                        <PersonIcon className="size-16 text-primary/50" />
                    )}
                    <div>{doc.name}</div>
                </div>
                <div>{new Date(doc.displayDate).toLocaleDateString()}</div>
            </DialogTrigger>
        </div>
    );
}

export default BirthdayCard;
