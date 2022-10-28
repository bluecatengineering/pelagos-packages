import {t} from '@bluecateng/l10n.macro';

import compareSuggestions from './compareSuggestions';

/**
 * Returns suggestions from a list.
 * @param {string} text the text to search in the list.
 * @param {Array<{id: *}>} list the list of options already selected.
 * @param {Array<{id: *, name: string}>} sourceList the list where options are searched.
 * @param {string} errorMessage the error message to show if no suggestions are found.
 * @returns {{error: string}|{suggestions: Array<{id: *, name: string, description: string, order: number}>}} the suggestions.
 *
 * @example
 * import {ListInput, getGenericSuggestions} from '@bluecateng/pelagos';
 *
 * const Example = ({items}) => {
 *   const getSuggestions = useCallback(
 *     (text, list) => getGenericSuggestions(text, list, items, t`No matching items found`),
 *     [items]
 *   );
 *   return <ListInput getSuggestions={getSuggestions} />
 * }
 */
const getGenericSuggestions = (text, list, sourceList, errorMessage) => {
	text = text.toLowerCase();
	const suggestions = sourceList.filter((item) => item.name.toLowerCase().includes(text));
	const memberText = t`member`;
	return suggestions.length === 0
		? {error: errorMessage}
		: {
				suggestions: suggestions
					.map(({id, name}) => {
						const member = list.find((d) => d.id === id);
						return {
							id,
							name,
							description: member ? memberText : '',
							order: member ? 2 : name.toLowerCase().startsWith(text) ? 0 : 1,
						};
					})
					.sort(compareSuggestions)
					.slice(0, 10),
		  };
};

export default getGenericSuggestions;
