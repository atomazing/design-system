/**
 * Converts a given date to a human-readable relative time string.
 *
 * @param {Date} date - The date to be converted.
 * @param lang
 * @returns {string} A string representing the relative time using `Intl` format (e.g., "2 days ago").
 */
export const timeAgo = (date, lang = navigator.language || 'en-US') => {
    // Get the current date and time
    const now = new Date();
    date = new Date(date);
    // Calculate the time difference in seconds
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    // Create an Intl.RelativeTimeFormat instance with the user's language
    const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });
    // Determine the appropriate unit and format the result
    if (diffInSeconds < 60) {
        return rtf.format(-diffInSeconds, 'second');
    }
    if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return rtf.format(-minutes, 'minute');
    }
    if (diffInSeconds < 86_400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return rtf.format(-hours, 'hour');
    }
    const days = Math.floor(diffInSeconds / 86_400);
    return rtf.format(-days, 'day');
};
export const timeAgoFromStart = (date, lang = navigator.language || 'en-US') => {
    const now = new Date();
    date = new Date(date);
    const difference = (date.getTime() - now.getTime()) / 1000;
    const differenceHours = Math.floor(difference / (60 * 60));
    const differenceMinutes = Math.floor((difference - 60 * 60 * differenceHours) / 60);
    const diffInSeconds = Math.floor(difference - 60 * 60 * differenceHours - 60 * differenceMinutes);
    const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });
    if (differenceMinutes === 0 && diffInSeconds < 60) {
        return rtf.format(diffInSeconds, 'second');
    }
    if (differenceHours === 0 && differenceMinutes < 60) {
        return rtf.format(differenceMinutes, 'minute');
    }
    if (differenceHours < 24) {
        const hours = `${new Intl.RelativeTimeFormat(lang, { numeric: 'auto' }).format(differenceHours, 'hour')}`;
        const minutes = ` ${new Intl.RelativeTimeFormat(lang, {
            localeMatcher: 'lookup',
            numeric: 'always',
            style: 'long',
        }).format(differenceMinutes, 'minute')}`.replace(/^\D+/, '');
        return `${hours} ${minutes}`;
    }
    const days = Math.floor(diffInSeconds / 86_400);
    return rtf.format(days, 'day');
};
