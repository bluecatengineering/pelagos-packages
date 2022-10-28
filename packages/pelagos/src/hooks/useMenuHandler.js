import {useCallback, useMemo, useState} from 'react';

import useStringFinder from './useStringFinder';

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

/**
 * Returns properties to be added to the button which displays a menu and to the menu item list element.
 * Rendered menu items must have `role="menuitem"` and `data-index={<index>}`.
 * @param {boolean} expanded whether the menu is expanded.
 * @param {function(boolean): void} setExpanded function invoked to change `expanded`.
 * @param {any[]} items the menu items.
 * @param {Object} [options] the options.
 * @param {function(*): string} options.getItemText returns the item text.
 * @param {function(*): boolean} [options.isItemDisabled] returns whether the item is disabled.
 * @param {function(*): void} options.onItemSelected invoked when the item is selected by the user.
 * @return {{current: number, buttonProps: Object, listProps: Object}}
 *
 * @example
 * import {useCallback, useState} from 'react';
 * import {useMenuHandler} from '@bluecateng/pelagos';
 *
 * const items = ['item0'];
 * const getItemText = (item) => ''; // return text for item
 *
 * const Example = () => {
 *   const [expanded, setExpanded] = useState(false);
 *   const handleItemSelected = useCallback((item) => {
 *     // handle menu item selection
 *   }, []);
 *   const {current, buttonProps, listProps} = useMenuHandler(expanded, setExpanded, items, {
 *     getItemText,
 *     onItemSelected: handleItemSelected,
 *   });
 *   return (
 *     <div>
 *       <button {...buttonProps}>...</button>
 *       <ul {...listProps} role="menu">...</ul>
 *     </div>
 *   );
 * };
 */
const useMenuHandler = (expanded, setExpanded, items, options) => {
	const {getItemText, isItemDisabled, onItemSelected} = {
		getItemText: defaultGetItemText,
		isItemDisabled: defaultIsItemDisabled,
		onItemSelected: defaultOnItemSelected,
		...options,
	};

	const [current, setCurrent] = useState(-1);

	const hasEnabledItems = useMemo(() => items.some((item) => !isItemDisabled(item)), [items, isItemDisabled]);
	const texts = useMemo(
		() => items.map((item) => (isItemDisabled(item) ? '' : getItemText(item).toUpperCase())),
		[items, getItemText, isItemDisabled]
	);

	const findItemToFocus = useStringFinder();

	const handleClick = useCallback(
		(event) => {
			event.preventDefault();
			const target = event.target;
			const button = target.closest('button') || target.closest('[role="button"]');
			if (!button.disabled) {
				setExpanded((expanded) => (setCurrent(expanded ? -1 : checkEnabled(-1, 1, items, isItemDisabled)), !expanded));
			}
		},
		[setExpanded, items, isItemDisabled]
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
							if (expanded) {
								event.preventDefault();
								if (current === -1) {
									setExpanded(false);
								} else {
									const item = items[current];
									if (!isItemDisabled(item)) {
										onItemSelected(item);
										setCurrent(-1);
										setExpanded(false);
									}
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
								const i = findItemToFocus(keyCode, current, texts.length, (i) => texts[i]);
								if (i !== -1) {
									setCurrent(i);
								}
							}
							break;
					}
			}
		},
		[hasEnabledItems, setExpanded, expanded, current, items, isItemDisabled, onItemSelected, findItemToFocus, texts]
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
			onClick: handleClick,
			onKeyDown: handleKeyDown,
			onBlur: handleBlur,
		},
		listProps: {
			onMouseDown: handleListMouseDown,
			onMouseUp: handleListMouseUp,
		},
	};
};

export default useMenuHandler;
