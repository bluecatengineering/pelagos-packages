import {forwardRef, useContext} from 'react';
import PropTypes from 'prop-types';

import SideNavContext from './SideNavContext';

import './SideNav.less';

/** Link in the side navigation panel. Must be a direct child of SideNavItems. */
const SideNavLink = forwardRef(({className, icon: Icon, current, shortcut, children, ...props}, ref) => {
	const active = useContext(SideNavContext);
	return (
		<li className={className}>
			<a
				{...props}
				className="SideNav__link"
				tabIndex={active ? 0 : -1}
				aria-current={current ? 'page' : null}
				ref={ref}>
				{Icon && <Icon className="SideNav__icon" />}
				<span
					className={`SideNav__text${shortcut ? ' SideNav__text--shortcut' : ''}`}
					title={typeof children === 'string' ? children : undefined}>
					{children}
				</span>
			</a>
		</li>
	);
});

SideNavLink.displayName = 'SideNavLink';

SideNavLink.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The link's href. */
	href: PropTypes.string,
	/** The icon to display */
	icon: PropTypes.elementType,
	/** Whether the first letter should be underlined to indicate a keyboard shortcut. */
	shortcut: PropTypes.bool,
	/** Whether this link is for the current page. */
	current: PropTypes.bool,
	/** @deprecated the value is passed from SideNav. */
	sideNavActive: PropTypes.bool,
	/** The child elements. */
	children: PropTypes.node,
	/** Function invoked when the link is clicked. */
	onClick: PropTypes.func,
};

export default SideNavLink;
