import {useCallback} from 'react';

export default (onClick) =>
	useCallback(
		(event) =>
			!event.shiftKey &&
			!event.ctrlKey &&
			!event.altKey &&
			!event.metaKey &&
			(event.keyCode === 13 || event.keyCode === 32)
				? (event.preventDefault(), onClick(event))
				: null,
		[onClick]
	);
