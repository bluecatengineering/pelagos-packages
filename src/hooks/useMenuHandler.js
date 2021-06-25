import {useCallback, useMemo, useRef, useState} from 'react';

const defaultGetItemText = (item) => item.text;
const defaultOnItemSelected = (item) => item.handler();

const findInRange = (string, texts, start, end) => {
	for (let i = start; i < end; ++i) {
		if (texts[i].startsWith(string)) {
			return i;
		}
	}
	return -1;
};

/**
 * Returns properties to be added to the button which displays a menu and to the menu item list element.
 * Rendered menu items must have `role="menuitem"` and `data-index={<index>}`.
 * @param {boolean} expanded whether the menu is expanded.
 * @param {function(boolean): void} setExpanded function invoked to change `expanded`.
 * @param {*[]} items the menu items.
 * @param {Object} [options] the options.
 * @param {function(*): string} options.getItemText returns the item text.
 * @param {function(*): void} options.onItemSelected invoked when the item is selected by the user.
 * @return {{current: number, buttonProps: Object, listProps: Object}}
 */
export default (expanded, setExpanded, items, options) => {
	const {getItemText, onItemSelected} = {
		getItemText: defaultGetItemText,
		onItemSelected: defaultOnItemSelected,
		...options,
	};

	const searchString = useRef(null);
	const searchIndex = useRef(-1);
	const keyTimer = useRef(null);

	const [current, setCurrent] = useState(-1);

	const texts = useMemo(() => items.map((item) => getItemText(item).toUpperCase()), [items, getItemText]);

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

			let result = findInRange(searchString.current, texts, searchIndex.current + 1, texts.length);
			if (result === -1) {
				result = findInRange(searchString.current, texts, 0, searchIndex.current);
			}
			return result;
		},
		[current, texts]
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
						event.preventDefault();
						if (!expanded) {
							setExpanded(true);
						} else if (current === -1) {
							setExpanded(false);
						} else {
							onItemSelected(items[current]);
							setCurrent(-1);
							setExpanded(false);
						}
						break;
					case 27: // escape
						event.preventDefault();
						setCurrent(-1);
						setExpanded(false);
						break;
					case 35: // end
						event.preventDefault();
						if (expanded) {
							setCurrent(items.length - 1);
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
							setCurrent((current) => (current <= 0 ? items.length - 1 : current - 1));
						}
						break;
					case 40: // down
						event.preventDefault();
						if (expanded) {
							setCurrent((current) => (current === -1 || current === items.length - 1 ? 0 : current + 1));
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
		[expanded, items, current, findItemToFocus, setExpanded, onItemSelected]
	);

	const handleBlur = useCallback(() => (setCurrent(-1), setExpanded(false)), [setExpanded]);

	const handleListMouseDown = useCallback((event) => event.preventDefault(), []);

	const handleListMouseUp = useCallback(
		(event) => {
			const element = event.target.closest('[role="menuitem"]');
			if (element) {
				event.preventDefault();
				onItemSelected(items[+element.dataset.index]);
				setCurrent(-1);
				setExpanded(false);
			}
		},
		[items, setExpanded, onItemSelected]
	);

	return {
		current,
		buttonProps: {
			onMouseDown: handleMouseDown,
			onKeyDown: handleKeyDown,
			onBlur: handleBlur,
		},
		listProps: {
			onMouseDown: handleListMouseDown,
			onMouseUp: handleListMouseUp,
		},
	};
};
