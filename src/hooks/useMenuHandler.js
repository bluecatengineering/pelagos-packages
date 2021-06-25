import {useCallback, useMemo, useRef, useState} from 'react';

const defaultGetItemText = (item) => item.text;
const defaultIsItemDisabled = () => false;
const defaultOnItemSelected = (item) => item.handler();

const checkEnabled = (index, increment, items, isItemDisabled) => {
	const last = items.length - 1;
	do {
		index += increment;
		if (index < 0) {
			index = last;
		} else if (index > last) {
			index = 0;
		}
	} while (isItemDisabled(items[index]));
	return index;
};

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
 * @param {function(*): string} options.isItemDisabled returns whether the item is disabled.
 * @param {function(*): void} options.onItemSelected invoked when the item is selected by the user.
 * @return {{current: number, buttonProps: Object, listProps: Object}}
 */
export default (expanded, setExpanded, items, options) => {
	const {getItemText, isItemDisabled, onItemSelected} = {
		getItemText: defaultGetItemText,
		isItemDisabled: defaultIsItemDisabled,
		onItemSelected: defaultOnItemSelected,
		...options,
	};

	const searchString = useRef(null);
	const searchIndex = useRef(-1);
	const keyTimer = useRef(null);

	const [current, setCurrent] = useState(-1);

	const hasEnabledItems = useMemo(() => items.some((item) => !isItemDisabled(item)), [items, isItemDisabled]);
	const texts = useMemo(
		() => items.map((item) => (isItemDisabled(item) ? '' : getItemText(item).toUpperCase())),
		[items, getItemText, isItemDisabled]
	);

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
				if (keyCode === 27) {
					event.preventDefault();
					setCurrent(-1);
					setExpanded(false);
				} else if (hasEnabledItems)
					switch (keyCode) {
						case 13: // enter
						case 32: // space
							event.preventDefault();
							if (!expanded) {
								setExpanded(true);
							} else if (current === -1) {
								setExpanded(false);
							} else {
								const item = items[current];
								if (!isItemDisabled(item)) {
									onItemSelected(item);
									setCurrent(-1);
									setExpanded(false);
								}
							}
							break;
						case 35: // end
							event.preventDefault();
							if (expanded) {
								setCurrent(checkEnabled(items.length, -1, items, isItemDisabled));
							}
							break;
						case 36: // home
							event.preventDefault();
							if (expanded) {
								setCurrent(checkEnabled(-1, 1, items, isItemDisabled));
							}
							break;
						case 38: // up
							event.preventDefault();
							if (expanded) {
								setCurrent((current) => checkEnabled(current, -1, items, isItemDisabled));
							}
							break;
						case 40: // down
							event.preventDefault();
							if (expanded) {
								setCurrent((current) => checkEnabled(current, 1, items, isItemDisabled));
							} else {
								setCurrent(checkEnabled(-1, 1, items, isItemDisabled));
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
		[hasEnabledItems, expanded, current, setExpanded, items, isItemDisabled, onItemSelected, findItemToFocus]
	);

	const handleBlur = useCallback(() => (setCurrent(-1), setExpanded(false)), [setExpanded]);

	const handleListMouseDown = useCallback((event) => event.preventDefault(), []);

	const handleListMouseUp = useCallback(
		(event) => {
			const element = event.target.closest('[role="menuitem"]');
			if (element) {
				event.preventDefault();
				const item = items[+element.dataset.index];
				if (!isItemDisabled(item)) {
					onItemSelected(item);
					setCurrent(-1);
					setExpanded(false);
				}
			}
		},
		[items, setExpanded, isItemDisabled, onItemSelected]
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
