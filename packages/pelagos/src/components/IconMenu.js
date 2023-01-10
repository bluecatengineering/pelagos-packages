import {
	Children,
	cloneElement,
	forwardRef,
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';

import setRefs from '../functions/setRefs';
import elementOfType from '../functions/elementOfType';
import useRandomId from '../hooks/useRandomId';

import Layer from './Layer';
import IconButton from './IconButton';
import IconMenuItem from './IconMenuItem';
import MenuArrow from './MenuArrow';
import './IconMenu.less';

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

/** An icon button with a pop-up menu. */
const IconMenu = forwardRef(({id, className, icon, arrow, disabled, flipped, children, ...props}, ref) => {
	id = useRandomId(id);
	const menuId = `${id}-menu`;
	const buttonRef = useRef(null);
	const menuRef = useRef(null);
	const [menuVisible, setMenuVisible] = useState(false);

	const allDisabled = useMemo(() => Children.toArray(children).every((child) => child.props.disabled), [children]);

	const handleButtonClick = useCallback(() => setMenuVisible((value) => !value), []);

	const handleMenuKeyDown = useCallback((event) => {
		if (!event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
			const menuChildren = menuRef.current.childNodes;
			switch (event.keyCode) {
				case 13: // enter
				case 32: // space
					event.preventDefault();
					document.activeElement.click();
					setMenuVisible(false);
					buttonRef.current.focus();
					break;
				case 27: // escape
					event.preventDefault();
					setMenuVisible(false);
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
			setMenuVisible(false);
			buttonRef.current.focus();
		}
	}, []);

	const handleGuardFocus = useCallback(() => {
		setMenuVisible(false);
		buttonRef.current.focus();
	}, []);

	useLayoutEffect(() => {
		if (menuVisible) {
			const button = buttonRef.current;
			const {top, bottom, left, right} = button.getBoundingClientRect();

			const menu = menuRef.current;
			const wrapper = menu.parentNode;
			const {width: menuWidth, height: menuHeight} = wrapper.getBoundingClientRect();
			const scrollTop = document.scrollingElement.scrollTop;
			wrapper.style.top = `${
				(bottom + menuHeight < innerHeight ? bottom : top - menuHeight >= 0 ? top - menuHeight : 0) + scrollTop
			}px`;
			wrapper.style.left = flipped ? `${right - menuWidth}px` : `${left}px`;
			wrapper.dataset.layer = button.parentNode.dataset.layer;
			setFocus(-1, 1, menu.childNodes);
		}
	}, [menuVisible, flipped]);

	useEffect(() => {
		const handler = ({target}) => {
			if (
				buttonRef.current.getAttribute('aria-expanded') === 'true' &&
				!buttonRef.current.contains(target) &&
				!menuRef.current.contains(target)
			) {
				setMenuVisible(false);
			}
		};
		window.addEventListener('mousedown', handler, true);
		return () => window.removeEventListener('mousedown', handler, true);
	}, []);

	return (
		<Layer>
			<IconButton
				{...props}
				id={id}
				className={`IconMenu${className ? ` ${className}` : ''}`}
				icon={icon}
				overlay={arrow && <MenuArrow className="IconMenu__overlay" />}
				disabled={disabled || allDisabled}
				aria-controls={menuVisible ? menuId : null}
				aria-haspopup="true"
				aria-expanded={menuVisible}
				ref={ref ? setRefs(ref, buttonRef) : buttonRef}
				onClick={handleButtonClick}
			/>
			{menuVisible &&
				createPortal(
					<div className="IconMenu__wrapper">
						<div tabIndex={0} onFocus={handleGuardFocus} />
						<ul
							id={menuId}
							className="IconMenu__menu"
							role="menu"
							aria-labelledby={id}
							ref={menuRef}
							onKeyDown={handleMenuKeyDown}
							onClick={handleMenuClick}>
							{Children.map(children, (child, index) =>
								cloneElement(child, {
									id: `${id}-${index}`,
									'data-index': index,
								})
							)}
						</ul>
						<div tabIndex={0} onFocus={handleGuardFocus} />
					</div>,
					document.body
				)}
		</Layer>
	);
});

IconMenu.displayName = 'IconMenu';

IconMenu.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The object representing the icon. (using FontAwesome, etc.) */
	icon: PropTypes.object.isRequired,
	/** The tooltip text to display. */
	tooltipText: PropTypes.string,
	/** The placement of the tooltip relative to the button. */
	tooltipPlacement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
	/** Whether to show an arrow. */
	arrow: PropTypes.bool,
	/** Whether the button is disabled. */
	disabled: PropTypes.bool,
	/** Whether the menu alignment should be flipped. */
	flipped: PropTypes.bool,
	/** The menu items. */
	children: PropTypes.arrayOf(elementOfType(IconMenuItem)).isRequired,
};

export default IconMenu;
