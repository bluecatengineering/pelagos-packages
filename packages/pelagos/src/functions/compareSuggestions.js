/**
 * a suggestion.
 * @typedef {Object} compareSuggestions~Suggestion
 * @property {number} order the priority of the suggestion.
 * @property {string} name the displayed name.
 */

/**
 * Compares suggestions.
 * @param {compareSuggestions~Suggestion} a the first suggestion.
 * @param {compareSuggestions~Suggestion} b the second suggestion.
 * @returns {number} the comparison result.
 *
 * @example
 * import {compareSuggestions} from '@bluecateng/pelagos';
 *
 * const suggestions = generateSuggestions().sort(compareSuggestions);
 */
const compareSuggestions = (a, b) => a.order - b.order || a.name.localeCompare(b.name);

export default compareSuggestions;
