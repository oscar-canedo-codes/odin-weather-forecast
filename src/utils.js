

/**
 * Generates a localized string of the current date and time in EU format.
 * @function getCurrentDateTime
 * @returns {string} Formatted string (e.g., "Friday 1 April 2022 | 16:33").
 */
export function getCurrentDateTime() {
    const now = new Date();

    const weekday = now.toLocaleDateString('en-GB', { weekday: 'long' });
    const day = now.toLocaleDateString('en-GB', { day: 'numeric' });
    const month = now.toLocaleDateString('en-GB', { month: 'long' });
    const year = now.toLocaleDateString('en-GB', { year: 'numeric' });

    const time = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    // Assemble manually: [Weekday] [Day] [Month] [Year] | [Time]
    return `${weekday} ${day} ${month} ${year} | ${time}`;
}

/**
 * Converts Unix timestamp to a 12-hour format string.
 * @param {number} unixTime - Seconds since 1970.
 * @returns {string} e.g., "6:30 AM"
 */
export function formatUnixTime(unixTime) {
    const date = new Date(unixTime * 1000);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}