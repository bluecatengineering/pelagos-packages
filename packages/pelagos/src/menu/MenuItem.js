import {forwardRef} from 'react';
import PropTypes from 'prop-types';

import './Menu.less';

/** A menu item. */
const MenuItem = forwardRef(({className, text, type, children, disabled, hasDivider, ...props}, ref) => (
	<li
		{...props}
		className={`Menu__item Menu--${type}${hasDivider ? ' Menu--divider' : ''}${className ? ` ${className}` : ''}`}
		tabIndex={-1}
		role="menuitem"
		aria-disabled={disabled}
		ref={ref}>
		{text || children}
	</li>
));

MenuItem.displayName = 'MenuItem';

MenuItem.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The menu item text. */
	text: PropTypes.string,
	/** The menu item type. */
	type: PropTypes.oneOf(['default', 'danger']),
	/** @deprecated use text instead. */
	children: PropTypes.node,
	/** Whether the item is disabled. */
	disabled: PropTypes.bool,
	/** @deprecated use MenuItemDivider instead. */
	hasDivider: PropTypes.bool,
};

MenuItem.defaultProps = {
	type: 'default',
};

export default MenuItem;
