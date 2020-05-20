import {useCallback} from 'react';

export default () =>
	useCallback(
		(event) =>
			!event.shiftKey &&
			!event.ctrlKey &&
			!event.altKey &&
			!event.metaKey &&
			(event.keyCode === 13 || event.keyCode === 32)
				? (event.preventDefault(), event.nativeEvent.stopImmediatePropagation(), event.target.click())
				: null,
		[]
	);
