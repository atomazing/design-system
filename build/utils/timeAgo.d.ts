/**
 * Converts a given date to a human-readable relative time string.
 *
 * @param {Date} date - The date to be converted.
 * @param lang
 * @returns {string} A string representing the relative time using `Intl` format (e.g., "2 days ago").
 */
export declare const timeAgo: (date: Date, lang?: string) => string;
export declare const timeAgoFromStart: (date: Date, lang?: string) => string;
