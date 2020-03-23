import __ from '../strings';

import compareSuggestions from './compareSuggestions';

export default (text, list, sourceList, errorMessage) => {
	text = text.toLowerCase();
	const suggestions = sourceList.filter((item) => item.name.toLowerCase().includes(text));
	const memberText = __('MEMBER');
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
