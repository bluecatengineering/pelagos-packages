import {forwardRef} from 'react';
import PropTypes from 'prop-types';

import './SideNav.less';

/** Link in the side navigation panel. Must be a direct child of SideNavItems. */
const SideNavLink = forwardRef(({className, current, shortcut, sideNavActive, children, ...props}, ref) => (
	<li className={className}>
		<a
			{...props}
			className="SideNav__link"
			tabIndex={sideNavActive ? 0 : -1}
			aria-current={current ? 'page' : null}
			ref={ref}>
			<span
				className={`SideNav__text${shortcut ? ' SideNav__text--shortcut' : ''}`}
				title={typeof children === 'string' ? children : ''}>
				{children}
			</span>
		</a>
	</li>
));

SideNavLink.displayName = 'SideNavLink';

SideNavLink.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The link's href. */
	href: PropTypes.string,
	/** Whether the first letter should be underlined to indicate a keyboard shortcut. */
	shortcut: PropTypes.bool,
	/** Whether this link is for the current page. */
	current: PropTypes.bool,
	/** Whether the side navigation is active. */
	sideNavActive: PropTypes.bool,
	/** The child elements. */
	children: PropTypes.node,
	/** Function invoked when the link is clicked. */
	onClick: PropTypes.func,
};

export default SideNavLink;
