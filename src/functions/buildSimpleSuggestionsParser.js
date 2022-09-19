import identity from 'lodash-es/identity';

/**
 * Builds a parser for simple suggestions.
 * @param {function(*): (string|null)} validate validates each entry returning either an error message or `null`.
 * @param {function(string): *} transform transforms the input text.
 * @returns {function(string, *[]): ({error: string}|{entries: *[]})} a function returning suggestions.
 */
export default (validate, transform = identity) =>
	(text, list) => {
		const allEntries = text
			.split(',')
			.map((entry) => transform(entry.trim()))
			.filter(Boolean);
		const entries = [];
		for (let i = 0; i < allEntries.length; ++i) {
			const entry = allEntries[i];
			const error = validate(entry);
			if (error) {
				return {error};
			}
			if (!entries.includes(entry) && !list.includes(entry)) {
				entries.push(entry);
			}
		}
		return {entries};
	};
