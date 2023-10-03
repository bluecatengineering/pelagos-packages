import {Children, cloneElement, forwardRef, useMemo} from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';

import setRefs from '../functions/setRefs';
import useRandomId from '../hooks/useRandomId';
import useMenuHandler from '../hooks/useMenuHandler';
import useLayer from '../hooks/useLayer';
import useMenuPositioner from '../hooks/useMenuPositioner';

import IconButton from './IconButton';
import MenuArrow from './MenuArrow';
import Layer from './Layer';
import './IconMenu.less';

/** An icon button with a pop-up menu. */
const IconMenu = forwardRef(({id, className, icon, arrow, disabled, flipped, children, ...props}, ref) => {
	id = useRandomId(id);
	const menuId = `${id}-menu`;

	const allDisabled = useMemo(() => Children.toArray(children).every((child) => child.props.disabled), [children]);

	const level = useLayer() + 1;

	const setPopUpPosition = useMenuPositioner(flipped);

	const {expanded, buttonProps, menuProps, buttonRef} = useMenuHandler(setPopUpPosition);

	return (
		<>
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
				data-layer={expanded ? level : null}
				ref={ref ? setRefs(ref, buttonRef) : buttonRef}
			/>
			{expanded &&
				createPortal(
					<Layer className="IconMenu__popUp" level={level}>
						<ul {...menuProps} id={menuId} className="IconMenu__menu" role="menu" aria-labelledby={id}>
							{Children.map(children, (child, index) =>
								cloneElement(child, {
									id: `${id}-${index}`,
									'data-index': index,
								})
							)}
						</ul>
					</Layer>,
					document.body
				)}
		</>
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
	children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default IconMenu;
