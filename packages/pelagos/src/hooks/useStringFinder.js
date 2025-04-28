import {useCallback, useRef} from 'react';

const findInRange = (string, start, end, getUpperCaseText) => {
	for (let i = start; i < end; ++i) {
		if (getUpperCaseText(i).startsWith(string)) {
			return i;
		}
	}
	return -1;
};

/**
 * Returns a React callback to search a string in a range.
 * @returns {function(number, number, number, function(number): string): number} search function.
 * @private
 */
export default () => {
	const searchString = useRef(null);
	const searchIndex = useRef(-1);
	const keyTimer = useRef(null);
	return useCallback((key, current, listLength, getUpperCaseText) => {
		const char = key.toUpperCase();
		if (!searchString.current) {
			searchString.current = char;
			searchIndex.current = current;
		} else {
			searchString.current += char;
		}

		if (keyTimer.current) {
			clearTimeout(keyTimer.current);
		}
		keyTimer.current = setTimeout(() => {
			searchString.current = null;
			keyTimer.current = null;
		}, 500);

		let result = findInRange(searchString.current, searchIndex.current + 1, listLength, getUpperCaseText);
		if (result === -1) {
			result = findInRange(searchString.current, 0, searchIndex.current, getUpperCaseText);
		}
		return result;
	}, []);
};
