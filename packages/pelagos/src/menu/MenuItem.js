import {forwardRef} from 'react';
import PropTypes from 'prop-types';

import './Menu.less';

/** A menu item. */
const MenuItem = forwardRef(({className, children, disabled, hasDivider, ...props}, ref) => (
	<li
		{...props}
		className={`Menu__item${hasDivider ? ' Menu--divider' : ''}${className ? ` ${className}` : ''}`}
		tabIndex={-1}
		role="menuitem"
		aria-disabled={disabled}
		ref={ref}>
		{children}
	</li>
));

MenuItem.displayName = 'MenuItem';

MenuItem.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The menu item text. */
	children: PropTypes.node,
	/** Whether the item is disabled. */
	disabled: PropTypes.bool,
	/** Whether the item has a divider. */
	hasDivider: PropTypes.bool,
};

export default MenuItem;
