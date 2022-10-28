import {useCallback, useEffect, useState} from 'react';
import identity from 'lodash-es/identity';

/**
 * return type for `useToggle`.
 * @typedef {Array} useToggle~Return
 * @property {boolean} 0 the current value.
 * @property {function(): void} 1 function to toggle the value.
 */

/**
 * Returns a stateful boolean and a function to toggle it.
 * Additionally, adds an effect which sets the state to true if any errors are found.
 * @param {boolean} initialState the initial state.
 * @param {any[]} errors the array of errors.
 * @return {useToggle~Return} tuple which can be used to control a collapsible.
 *
 * @example
 * import {Collapsible, useToggle} from '@bluecateng/pelagos';
 *
 * const Example = ({errors}) => {
 *   const [open, toggleOpen] = useToggle(false, errors);
 *   return <Collapsible open={open} onHeaderClick={toggleOpen}>...</Collapsible>;
 * };
 */
const useToggle = (initialState, errors) => {
	const [value, setValue] = useState(initialState);
	const toggle = useCallback(() => setValue((value) => !value), []);

	// eslint-disable-next-line react-hooks/exhaustive-deps -- the errors array contains the actual dependencies
	useEffect(() => (!value && errors.some(identity) ? setValue(true) : undefined), errors);

	return [value, toggle];
};

export default useToggle;
