import {useEffect} from 'react';
import focusTrap from 'focus-trap';

export default (ref, initialFocus, onClose) =>
	useEffect(() => {
		const trap = focusTrap(ref.current, {initialFocus, clickOutsideDeactivates: true, onDeactivate: onClose});
		trap.activate();
		return trap.deactivate;
	}, [ref, initialFocus, onClose]);
