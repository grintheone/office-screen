import { format, subDays } from "date-fns";

export function getClockBirthdayDates(today = new Date()): string[] {
    const dates = [format(today, "yyyy-MM-dd")];

    if (today.getDay() === 1) {
        dates.push(format(subDays(today, 2), "yyyy-MM-dd"));
        dates.push(format(subDays(today, 1), "yyyy-MM-dd"));
    }

    return dates;
}
