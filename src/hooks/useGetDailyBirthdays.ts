import { useEffect, useState } from "react";
import bdays from "@/features/display/bdays.json";
import type { Theme } from "@/features/settings/settingsSlice";

function getBirthdaysFromFile() {
    const today = new Date().setHours(0, 0, 0, 0);
    const currentYear = new Date().getFullYear();

    const birthdays: string[] = [];

    if (new Date().getDay() === 1) {
        const sunday = new Date(today - 1).setHours(0, 0, 0, 0);
        const saturday = new Date(sunday - 1).setHours(0, 0, 0, 0);
        bdays.forEach((person) => {
            const [d, m] = person.Birthday.split(".");
            const birthday = new Date(`${m}/${d}/${currentYear}`).setHours(
                0,
                0,
                0,
                0,
            );
            if (birthday === saturday || birthday === sunday) {
                birthdays.push(`${person.Name} (${d}.${m})`);
            } else if (birthday === today) {
                birthdays.push(person.Name);
            }
        });
    } else {
        bdays.forEach((person) => {
            const [d, m] = person.Birthday.split(".");
            const birthday = new Date(`${m}/${d}/${currentYear}`).setHours(
                0,
                0,
                0,
                0,
            );

            if (birthday === today) {
                birthdays.push(person.Name);
            }
        });
    }

    return birthdays;
}

export function useGetDailyBirthdays(org: Theme) {
    const [data, setData] = useState(() => {
        const b = getBirthdaysFromFile();

        if (b.length > 0) return b;
    });

    useEffect(() => {
        // Abort if not vbb
        if (org !== "vbb") return

        // Daily check
        const checkTimeAndRun = () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();

            if (hours === 12 && minutes === 0) {
                const b = getBirthdaysFromFile();
                if (b.length > 0) setData(b)
            }
        };

        // Check every minute (adjust frequency as needed)
        const intervalId = setInterval(checkTimeAndRun, 60000);

        return () => clearInterval(intervalId);
    }, [org]);

    return org === "vbb" ? data : undefined;
}
