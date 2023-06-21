import {Children, cloneElement, forwardRef, useMemo} from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';

import setRefs from '../functions/setRefs';
import useRandomId from '../hooks/useRandomId';
import useMenuHandler from '../hooks/useMenuHandler';
import useLayer from '../hooks/useLayer';
import useMenuPositioner from '../hooks/useMenuPositioner';
import Button from '../components/Button';
import Layer from '../components/Layer';

import Menu from './Menu';

import './ButtonMenu.less';

/** A button with a pop-up menu. */
const ButtonMenu = forwardRef(({id, className, disabled, flipped, children, ...props}, ref) => {
	id = useRandomId(id);
	const menuId = `${id}-menu`;

	const allDisabled = useMemo(() => Children.toArray(children).every((child) => child.props.disabled), [children]);

	const level = useLayer() + 1;

	const setPopUpPosition = useMenuPositioner(flipped);

	const {expanded, buttonProps, menuProps, guardProps, buttonRef} = useMenuHandler(setPopUpPosition);

	return (
		<>
			<Button
				{...buttonProps}
				{...props}
				id={id}
				className={`ButtonMenu${className ? ` ${className}` : ''}`}
				type="ghost"
				disabled={disabled || allDisabled}
				aria-controls={expanded ? menuId : null}
				aria-haspopup="true"
				aria-expanded={expanded}
				data-layer={expanded ? level : null}
				ref={ref ? setRefs(ref, buttonRef) : buttonRef}
			/>
			{expanded &&
				createPortal(
					<Layer className="ButtonMenu__popUp" level={level}>
						<div {...guardProps} tabIndex={0} />
						<Menu {...menuProps} id={menuId} aria-labelledby={id}>
							{Children.map(children, (child, index) =>
								cloneElement(child, {
									id: `${id}-${index}`,
									'data-index': index,
								})
							)}
						</Menu>
						<div {...guardProps} tabIndex={0} />
					</Layer>,
					document.body
				)}
		</>
	);
});

ButtonMenu.displayName = 'ButtonMenu';

ButtonMenu.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The text to display. */
	text: PropTypes.string,
	/** The object representing the icon. (using FontAwesome, etc.) */
	icon: PropTypes.object,
	/** The tooltip text to display. */
	tooltipText: PropTypes.string,
	/** The placement of the tooltip relative to the button. */
	tooltipPlacement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
	/** The size of the button. */
	size: PropTypes.oneOf(['small', 'medium', 'large']),
	/** The button type. */
	type: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'ghost']),
	/** Whether the button is disabled. */
	disabled: PropTypes.bool,
	/** Whether the menu alignment should be flipped. */
	flipped: PropTypes.bool,
	/** The menu items. */
	children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

ButtonMenu.defaultProps = {
	size: 'small',
};

export default ButtonMenu;