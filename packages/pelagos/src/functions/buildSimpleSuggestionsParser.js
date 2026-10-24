import identity from 'lodash-es/identity';

/**
 * Builds a parser for simple suggestions.
 * @param {function(*): (string|null)} validate validates each entry returning either an error message or `null`.
 * @param {function(string): *} [transform] transforms each entry, it must return a string or another primitive value so duplicates can be found.
 * @returns {function(string, any[]): ({error: string}|{entries: any[]})} a function returning suggestions.
 *
 * @example
 * import {ListInput, buildSimpleSuggestionsParser} from '@bluecateng/pelagos';
 *
 * const validateInput = (input) => {
 *   // validate input
 * }
 * const parseInput = buildSimpleSuggestionsParser(validateInput);
 * const Example = () => <ListInput parseInput={parseInput} />
 */
const buildSimpleSuggestionsParser =
	(validate, transform = identity) =>
	(text, list) => {
		// empty entries are dropped before the transform, which may turn them into non-empty values
		const allEntries = text
			.split(',')
			.map((entry) => entry.trim())
			.filter(Boolean)
			.map((entry) => transform(entry));
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

export default buildSimpleSuggestionsParser;
