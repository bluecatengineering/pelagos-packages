import {useCallback, useEffect, useState} from 'react';
import identity from 'lodash-es/identity';

/**
 * Returns a stateful boolean and a function to toggle it.
 * Additionally, adds an effect which sets the state to true if any errors are found.
 * @param {boolean} initialState the initial state.
 * @param {any[]} errors the array of errors.
 * @return {[boolean, (function(): void)]} tuple which can be used to control a collapsible.
 */
export default (initialState, errors) => {
	const [value, setValue] = useState(initialState);
	const toggle = useCallback(() => setValue((value) => !value), []);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => (!value && errors.some(identity) ? setValue(true) : undefined), errors);

	return [value, toggle];
};
