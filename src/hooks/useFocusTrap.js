import {useEffect} from 'react';
import {createFocusTrap} from 'focus-trap';

/**
 * Adds an effect which creates a focus trap.
 * @param {{current: Element}} ref React reference to the target element.
 * @param {string} [initialFocus] the ID of the element which receives the focus when the trap is activated.
 * @param {function(): void} [onDeactivate] invoked when the trap is deactivated.
 */
export default (ref, initialFocus, onDeactivate) =>
	useEffect(() => {
		const trap = createFocusTrap(ref.current, {initialFocus, clickOutsideDeactivates: true, onDeactivate});
		trap.activate();
		return trap.deactivate;
	}, [ref, initialFocus, onDeactivate]);
