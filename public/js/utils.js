/**
 * Convert date to format YYYY-MM-DD
 * @param {Date} date - The date to format
 * @returns {string} The date in YYYY-MM-DD format
 */
function formatDateToString(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
