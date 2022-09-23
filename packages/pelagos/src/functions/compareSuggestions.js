/**
 * Compares suggestions.
 * @param {{order: number, name: string}} a the first suggestion.
 * @param {{order: number, name: string}} b the second suggestion.
 * @returns {number} the comparison result.
 */
export default (a, b) => a.order - b.order || a.name.localeCompare(b.name);
