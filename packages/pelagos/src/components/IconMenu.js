import {Children, cloneElement, forwardRef, useCallback, useMemo} from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';

import setRefs from '../functions/setRefs';
import elementOfType from '../functions/elementOfType';
import useRandomId from '../hooks/useRandomId';
import useMenuHandler from '../hooks/useMenuHandler';

import Layer from './Layer';
import IconButton from './IconButton';
import IconMenuItem from './IconMenuItem';
import MenuArrow from './MenuArrow';
import './IconMenu.less';

/** An icon button with a pop-up menu. */
const IconMenu = forwardRef(({id, className, icon, arrow, disabled, flipped, children, ...props}, ref) => {
	id = useRandomId(id);
	const menuId = `${id}-menu`;

	const allDisabled = useMemo(() => Children.toArray(children).every((child) => child.props.disabled), [children]);

	const setPopUpPosition = useCallback(
		(button, menu) => {
			const {top, bottom, left, right} = button.getBoundingClientRect();

			const wrapper = menu.parentNode;
			const {width: menuWidth, height: menuHeight} = wrapper.getBoundingClientRect();
			const scrollTop = document.scrollingElement.scrollTop;
			wrapper.style.top = `${
				(bottom + menuHeight < innerHeight ? bottom : top - menuHeight >= 0 ? top - menuHeight : 0) + scrollTop
			}px`;
			wrapper.style.left = flipped ? `${right - menuWidth}px` : `${left}px`;
			wrapper.dataset.layer = button.parentNode.dataset.layer;
		},
		[flipped]
	);

	const {expanded, buttonProps, menuProps, guardProps, buttonRef} = useMenuHandler(setPopUpPosition);

	return (
		<Layer>
			<IconButton
				{...buttonProps}
				{...props}
				id={id}
				className={`IconMenu${className ? ` ${className}` : ''}`}
				icon={icon}
				overlay={arrow && <MenuArrow className="IconMenu__overlay" />}
				disabled={disabled || allDisabled}
				aria-controls={expanded ? menuId : null}
				aria-haspopup="true"
				aria-expanded={expanded}
				ref={ref ? setRefs(ref, buttonRef) : buttonRef}
			/>
			{expanded &&
				createPortal(
					<div className="IconMenu__wrapper">
						<div {...guardProps} tabIndex={0} />
						<ul {...menuProps} id={menuId} className="IconMenu__menu" role="menu" aria-labelledby={id}>
							{Children.map(children, (child, index) =>
								cloneElement(child, {
									id: `${id}-${index}`,
									'data-index': index,
								})
							)}
						</ul>
						<div {...guardProps} tabIndex={0} />
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
