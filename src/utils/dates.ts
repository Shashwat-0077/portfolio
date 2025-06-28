export function getTimeDifference(inputDate: string | Date): {
    hours: number;
    minutes: number;
    seconds: number;
} {
    const now = new Date();
    let date: Date;

    if (typeof inputDate === "string") {
        // Normalize input: remove microseconds and timezone, replace space with 'T'
        const normalized = inputDate
            .replace(" ", "T")
            .replace(/\.\d+/, "") // remove microseconds
            .replace(/([+-]\d{2}):?(\d{2})?$/, "Z"); // handle timezone
        date = new Date(normalized);
    } else {
        date = inputDate;
    }

    const diffMs = Math.abs(now.getTime() - date.getTime());

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
}

export function formatTimeDifference(diff: {
    hours: number;
    minutes: number;
    seconds: number;
}): string {
    const days = Math.floor(diff.hours / 24);
    const remainingHours = diff.hours % 24;

    if (days > 0) {
        return `${days} day${days > 1 ? "s" : ""}`;
    } else if (remainingHours > 0) {
        return `${remainingHours} hr${remainingHours > 1 ? "s" : ""}`;
    } else if (diff.minutes > 0) {
        return `${diff.minutes} min${diff.minutes > 1 ? "s" : ""}`;
    } else {
        return `${diff.seconds} sec${diff.seconds !== 1 ? "s" : ""}`;
    }
}
