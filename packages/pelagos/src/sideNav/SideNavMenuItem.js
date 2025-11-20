import {forwardRef, useContext} from 'react';
import PropTypes from 'prop-types';

import SideNavContext from './SideNavContext';

import './SideNav.less';

/** Menu item in the side navigation panel. Must be a direct child of SideNavMenu. */
const SideNavMenuItem = forwardRef(({className, shortcut, current, children, ...props}, ref) => {
	const active = useContext(SideNavContext);
	return (
		<li className={className}>
			<a
				{...props}
				className="SideNav__link"
				tabIndex={active ? 0 : -1}
				aria-current={current ? 'page' : null}
				ref={ref}>
				<span
					className={`SideNav__text${shortcut ? ' SideNav__text--shortcut' : ''}`}
					title={typeof children === 'string' ? children : undefined}>
					{children}
				</span>
			</a>
		</li>
	);
});

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
	/** @deprecated the value is passed from SideNav. */
	sideNavActive: PropTypes.bool,
	/** The child elements. */
	children: PropTypes.node,
	/** Function invoked when the menu item is clicked. */
	onClick: PropTypes.func,
};

export default SideNavMenuItem;
