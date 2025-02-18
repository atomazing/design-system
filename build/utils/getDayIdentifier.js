/**
 * Function to extract year, month, and day from a Date object
 */
export const getDayIdentifier = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based in JavaScript
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};
