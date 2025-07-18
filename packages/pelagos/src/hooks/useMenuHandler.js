import {useCallback, useLayoutEffect, useRef, useState} from 'react';

import createPopUpTrap from '../functions/createPopUpTrap';

const findCurrent = (children) => {
	const n = children.length;
	for (let i = 0; i < n; ++i) {
		if (children[i] === document.activeElement) {
			return i;
		}
	}
	return -1;
};

const findFocused = (index, increment, children) => {
	const last = children.length - 1;
	do {
		index += increment;
		if (index < 0) {
			index = last;
		} else if (index > last) {
			index = 0;
		}
	} while (children[index].getAttribute('role') !== 'menuitem');
	const child = children[index];
	child.tabIndex = 0;
	return child;
};

const setFocus = (index, increment, children) => findFocused(index, increment, children).focus();

const isDisabled = (element) => element.getAttribute('aria-disabled') === 'true';

/**
 * Returns properties to be added to the button which displays a menu and to the menu elements.
 * The menu should be rendered using the Menu and MenuItem components.
 * @param {function(Element, Element): void} [setPopUpPosition] function invoked to set the pop-up position.
 * @return {{expanded: boolean, buttonProps: Object, menuProps: Object, buttonRef: MutableRefObject<Element>, menuRef: MutableRefObject<Element>}}
 *
 * @example
 * import {useMenuHandler, Menu, MenuItem} from '@bluecateng/pelagos';
 *
 * const setPopUpPosition = (button, menu) => {
 *   // set pop-up position
 * };
 *
 * const Example = () => {
 *   const {expanded, buttonProps, menuProps} = useMenuHandler(setPopUpPosition);
 *   return (
 *     <div>
 *       <button {...buttonProps}>...</button>
 *       <div>
 *         <Menu {...menuProps}>...</Menu>
 *       </div>
 *     </div>
 *   );
 * };
 */
const useMenuHandler = (setPopUpPosition) => {
	const buttonRef = useRef(null);
	const menuRef = useRef(null);

	const [expanded, setExpanded] = useState(false);

	const handleButtonKeyDown = useCallback((event) => {
		if (!event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey && event.key === 'ArrowDown') {
			event.preventDefault();
			event.target.click();
		}
	}, []);

	const handleButtonClick = useCallback(() => setExpanded(true), []);

	const handleMenuKeyDown = useCallback((event) => {
		if (event.key === 'Tab') {
			if (!event.ctrlKey && !event.altKey && !event.metaKey) {
				event.preventDefault();
				setExpanded(false);
			}
		} else if (!event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
			const menuChildren = menuRef.current.childNodes;
			switch (event.key) {
				case 'Enter': // enter
				case ' ': // space
					event.preventDefault();
					if (!isDisabled(document.activeElement)) {
						document.activeElement.click();
						setExpanded(false);
					}
					break;
				case 'End': // end
					event.preventDefault();
					document.activeElement.tabIndex = -1;
					setFocus(menuChildren.length, -1, menuChildren);
					break;
				case 'Home': // home
					event.preventDefault();
					document.activeElement.tabIndex = -1;
					setFocus(-1, 1, menuChildren);
					break;
				case 'ArrowUp': // up
					event.preventDefault();
					document.activeElement.tabIndex = -1;
					setFocus(findCurrent(menuChildren), -1, menuChildren);
					break;
				case 'ArrowDown': // down
					event.preventDefault();
					document.activeElement.tabIndex = -1;
					setFocus(findCurrent(menuChildren), 1, menuChildren);
					break;
			}
		}
	}, []);

	const handleMenuClick = useCallback((event) => {
		if (event.target.closest('li')) {
			setExpanded(false);
		}
	}, []);

	useLayoutEffect(() => {
		const button = buttonRef.current;
		const menu = menuRef.current;
		const handleScroll = () => setPopUpPosition?.(button, menu);
		// the focus trap allows menus to be nested inside another focus trap
		const trap = createPopUpTrap(menu, button, {
			initialFocus: expanded && findFocused(-1, 1, menu.childNodes),
			onDeactivate: () => setExpanded(false),
		});
		if (expanded) {
			setPopUpPosition?.(button, menu);
			trap.activate();
			document.addEventListener('scroll', handleScroll, {passive: true, capture: true});
			window.addEventListener('resize', handleScroll, {passive: true, capture: true});
		}
		return () => {
			document.removeEventListener('scroll', handleScroll, {passive: true, capture: true});
			window.removeEventListener('resize', handleScroll, {passive: true, capture: true});
			trap.deactivate();
		};
	}, [expanded, setPopUpPosition]);

	return {
		expanded,
		buttonProps: {
			ref: buttonRef,
			onKeyDown: handleButtonKeyDown,
			onClick: handleButtonClick,
		},
		menuProps: {
			ref: menuRef,
			onKeyDown: handleMenuKeyDown,
			onClick: handleMenuClick,
		},
		guardProps: {},
		buttonRef,
		menuRef,
	};
};

export default useMenuHandler;
