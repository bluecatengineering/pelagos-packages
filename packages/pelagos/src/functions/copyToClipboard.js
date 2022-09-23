/**
 * Copies the specified text to the clipboard.
 * @param {string} text the text to copy.
 * @returns {Promise<void>} a `Promise` which is resolved once the clipboard's contents have been updated.
 */
export default (text) => navigator.clipboard.writeText(text);
