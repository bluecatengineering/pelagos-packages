import {useEffect} from 'react';
import {createFocusTrap} from 'focus-trap';

export default (ref, initialFocus, onClose) =>
	useEffect(() => {
		const trap = createFocusTrap(ref.current, {initialFocus, clickOutsideDeactivates: true, onDeactivate: onClose});
		trap.activate();
		return trap.deactivate;
	}, [ref, initialFocus, onClose]);
