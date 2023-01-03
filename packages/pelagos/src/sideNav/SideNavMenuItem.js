import {forwardRef} from 'react';
import PropTypes from 'prop-types';

import './SideNav.less';

/** Menu item in the side navigation panel. Must be a direct child of SideNavMenu. */
const SideNavMenuItem = forwardRef(({className, shortcut, current, sideNavActive, children, ...props}, ref) => (
	<li className={className}>
		<a
			{...props}
			className="SideNav__link"
			tabIndex={sideNavActive ? 0 : -1}
			aria-current={current ? 'page' : null}
			ref={ref}>
			<span className={shortcut ? 'SideNav__text--shortcut' : ''}>{children}</span>
		</a>
	</li>
));

SideNavMenuItem.displayName = 'SideNavMenuItem';

SideNavMenuItem.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The link's href. */
	href: PropTypes.string,
	/** Whether the first letter should be underlined to indicate a keyboard shortcut. */
	shortcut: PropTypes.bool,
	/** Whether this menu item is for the current page. */
	current: PropTypes.bool,
	/** Whether the side navigation is active. */
	sideNavActive: PropTypes.bool,
	/** The child elements. */
	children: PropTypes.node,
	/** Function invoked when the menu item is clicked. */
	onClick: PropTypes.func,
};

export default SideNavMenuItem;
