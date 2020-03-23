import {useCallback, useRef, useState} from 'react';

const findInRange = (string, links, start, end) => {
	for (let i = start; i < end; ++i) {
		if (links[i].text.toUpperCase().startsWith(string)) {
			return i;
		}
	}
	return -1;
};

export default (expanded, setExpanded, links, keepExpanded) => {
	const searchString = useRef(null);
	const searchIndex = useRef(-1);
	const keyTimer = useRef(null);

	const [current, setCurrent] = useState(-1);

	const findItemToFocus = useCallback(
		(keyCode) => {
			const char = String.fromCharCode(keyCode);
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

			let result = findInRange(searchString.current, links, searchIndex.current + 1, links.length);
			if (result === -1) {
				result = findInRange(searchString.current, links, 0, searchIndex.current);
			}
			return result;
		},
		[current, links]
	);

	const handleMouseDown = useCallback(
		(event) => (
			event.preventDefault(),
			event.target.closest('[role="button"]').focus(),
			setExpanded((expanded) => (expanded ? setCurrent(-1) : null, !expanded))
		),
		[setExpanded]
	);

	const handleKeyDown = useCallback(
		(event) => {
			if (!event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
				const keyCode = event.keyCode;
				switch (keyCode) {
					case 13: // enter
					case 32: // space
					case 27: // escape
						event.preventDefault();
						break;
					case 35: // end
						event.preventDefault();
						if (expanded) {
							setCurrent(links.length - 1);
						}
						break;
					case 36: // home
						event.preventDefault();
						if (expanded) {
							setCurrent(0);
						}
						break;
					case 38: // up
						event.preventDefault();
						if (expanded) {
							setCurrent((current) => (current <= 0 ? links.length - 1 : current - 1));
						}
						break;
					case 40: // down
						event.preventDefault();
						if (expanded) {
							setCurrent((current) => (current === -1 || current === links.length - 1 ? 0 : current + 1));
						} else {
							setCurrent(0);
							setExpanded(true);
						}
						break;
					default:
						if (expanded && keyCode >= 48 && keyCode <= 90) {
							event.preventDefault();
							event.nativeEvent.stopImmediatePropagation();
							const i = findItemToFocus(keyCode);
							if (i !== -1) {
								setCurrent(i);
							}
						}
						break;
				}
			}
		},
		[expanded, links, findItemToFocus, setExpanded]
	);

	const handleKeyUp = useCallback(
		(event) => {
			if (!event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
				switch (event.keyCode) {
					case 13: // enter
					case 32: // space
						event.preventDefault();
						if (!expanded) {
							setExpanded(true);
						} else if (current === -1) {
							setExpanded(false);
						} else {
							links[current].handler();
							if (!keepExpanded) {
								setExpanded(false);
							}
						}
						break;
					case 27: // escape
						event.preventDefault();
						setCurrent(-1);
						setExpanded(false);
						break;
				}
			}
		},
		[expanded, keepExpanded, current, links, setExpanded]
	);

	const handleBlur = useCallback(() => (setCurrent(-1), keepExpanded ? null : setExpanded(false)), [
		keepExpanded,
		setExpanded,
	]);

	const handleListMouseOver = useCallback((event) => {
		const element = event.target.closest('[role="menuitem"]');
		if (element) {
			setCurrent(+element.dataset.index);
		}
	}, []);

	const handleListMouseDown = useCallback((event) => event.preventDefault(), []);

	const handleListMouseUp = useCallback(
		(event) => {
			const element = event.target.closest('[role="menuitem"]');
			if (element) {
				event.preventDefault();
				links[+element.dataset.index].handler();
				if (!keepExpanded) {
					setExpanded(false);
				}
			}
		},
		[links, keepExpanded, setExpanded]
	);

	const handleListMouseOut = useCallback(() => setCurrent(-1), []);

	return {
		current,
		buttonProps: {
			onMouseDown: handleMouseDown,
			onKeyDown: handleKeyDown,
			onKeyUp: handleKeyUp,
			onBlur: handleBlur,
		},
		listProps: {
			onMouseOver: handleListMouseOver,
			onMouseDown: handleListMouseDown,
			onMouseUp: handleListMouseUp,
			onMouseOut: handleListMouseOut,
		},
	};
};
