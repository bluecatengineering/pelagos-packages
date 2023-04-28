import {useCallback, useLayoutEffect, useRef, useState} from 'react';

const findCurrent = (children) => {
	const n = children.length;
	for (let i = 0; i < n; ++i) {
		if (children[i] === document.activeElement) {
			return i;
		}
	}
	return -1;
};

const setFocus = (index, increment, children) => {
	const last = children.length - 1;
	do {
		index += increment;
		if (index < 0) {
			index = last;
		} else if (index > last) {
			index = 0;
		}
	} while (children[index].getAttribute('aria-disabled') === 'true');
	children[index].focus();
};

/**
 * Returns properties to be added to the button which displays a menu and to the menu elements.
 * The menu should be rendered using the Menu and MenuItem components.
 * @param {function(Element, Element): void} [setPopUpPosition] function invoked to set the pop-up position.
 * @return {{expanded: boolean, buttonProps: Object, menuProps: Object, guardProps: Object, buttonRef: MutableRefObject<Element>, menuRef: MutableRefObject<Element>}}
 *
 * @example
 * import {useMenuHandler, Menu, MenuItem} from '@bluecateng/pelagos';
 *
 * const setPopUpPosition = (button, menu) => {
 *   // set pop-up position
 * };
 *
 * const Example = () => {
 *   const {expanded, buttonProps, menuProps, guardProps} = useMenuHandler(setPopUpPosition);
 *   return (
 *     <div>
 *       <button {...buttonProps}>...</button>
 *       <div>
 *         <div tabIndex={0} {...guardProps} />
 *         <Menu {...menuProps}>...</Menu>
 *         <div tabIndex={0} {...guardProps} />
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
		if (!event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey && event.keyCode === 40) {
			event.preventDefault();
			event.target.click();
		}
	}, []);

	const handleButtonClick = useCallback(() => setExpanded((value) => !value), []);

	const handleMenuKeyDown = useCallback((event) => {
		if (!event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
			const menuChildren = menuRef.current.childNodes;
			switch (event.keyCode) {
				case 13: // enter
				case 32: // space
					event.preventDefault();
					document.activeElement.click();
					setExpanded(false);
					buttonRef.current.focus();
					break;
				case 27: // escape
					event.preventDefault();
					setExpanded(false);
					buttonRef.current.focus();
					break;
				case 35: // end
					event.preventDefault();
					setFocus(menuChildren.length, -1, menuChildren);
					break;
				case 36: // home
					event.preventDefault();
					setFocus(-1, 1, menuChildren);
					break;
				case 38: // up
					event.preventDefault();
					setFocus(findCurrent(menuChildren), -1, menuChildren);
					break;
				case 40: // down
					event.preventDefault();
					setFocus(findCurrent(menuChildren), 1, menuChildren);
					break;
			}
		}
	}, []);

	const handleMenuClick = useCallback((event) => {
		if (event.target.closest('li')) {
			setExpanded(false);
			buttonRef.current.focus();
		}
	}, []);

	const handleGuardFocus = useCallback(() => {
		setExpanded(false);
		buttonRef.current.focus();
	}, []);

	useLayoutEffect(() => {
		const button = buttonRef.current;
		const menu = menuRef.current;
		const handleMouseDown = ({target}) => {
			if (!button.contains(target) && !menu.contains(target)) {
				setExpanded(false);
			}
		};
		const handleScroll = () => setPopUpPosition?.(button, menu);
		if (expanded) {
			setPopUpPosition?.(button, menu);
			setFocus(-1, 1, menu.childNodes);
			document.addEventListener('mousedown', handleMouseDown, true);
			document.addEventListener('scroll', handleScroll, {passive: true, capture: true});
		}
		return () => {
			document.removeEventListener('mousedown', handleMouseDown, true);
			document.removeEventListener('scroll', handleScroll, {passive: true, capture: true});
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
		guardProps: {
			onFocus: handleGuardFocus,
		},
		buttonRef,
		menuRef,
	};
};

export default useMenuHandler;
