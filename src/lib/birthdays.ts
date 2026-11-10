import { format } from "date-fns";

// Accept both recurring MM-dd values and existing yyyy-MM-dd records.
export function getBirthdayMonthDay(value: string): string {
    const monthDay = /^\d{4}-\d{2}-\d{2}$/.test(value) ? value.slice(5) : value;
    if (!/^\d{2}-\d{2}$/.test(monthDay)) return "";
    const [month, day] = monthDay.split("-").map(Number);
    const date = new Date(2000, month - 1, day);
    return date.getMonth() === month - 1 && date.getDate() === day ? monthDay : "";
}

export function isBirthdayOn(value: string, date = new Date()): boolean {
    return getBirthdayMonthDay(value) === format(date, "MM-dd");
}

export function formatBirthday(value: string): string {
    const monthDay = getBirthdayMonthDay(value);
    if (!monthDay) return "";
    const [month, day] = monthDay.split("-");
    return `${day}.${month}`;
}
