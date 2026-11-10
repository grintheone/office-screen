import bdays from "@/features/display/bdays.json";
import type { BirthdayDocument } from "@/services/AdminService";

export function getBirthdaysFromFile(): BirthdayDocument[] {
    return bdays.map((person, index) => {
        const [day, month] = person.birthday.split(".");
        const displayDate = `${month}-${day}`;

        return {
            _id: `birthday:vbb:${person.fullname}:${day}.${month}`,
            org: "vbb",
            order: index,
            type: "birthday" as const,
            name: person.fullname,
            displayDate,
            showInMainFeed: false,
            photo: "",
        };
    });
}
