import {forwardRef} from 'react';
import PropTypes from 'prop-types';

import './Menu.less';

/** A menu item. */
const MenuItem = forwardRef(({className, text, type = 'default', children, disabled, hasDivider, ...props}, ref) => (
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
	/** The content if it's more than just text. */
	children: PropTypes.node,
	/** Whether the item is disabled. */
	disabled: PropTypes.bool,
	/** @deprecated use MenuItemDivider instead. */
	hasDivider: PropTypes.bool,
};

export default MenuItem;
