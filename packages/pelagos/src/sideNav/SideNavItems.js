import {forwardRef} from 'react';
import PropTypes from 'prop-types';

import passSideNavActive from './passSideNavActive';
import './SideNav.less';

/** Container for a list of any mix of SideNavMenu, SideNavLink, or SideNavDivider. */
const SideNavItems = forwardRef(({className, sideNavActive, children, ...props}, ref) => (
	<ul {...props} className={`SideNav__items${className ? ` ${className}` : ''}`} ref={ref}>
		{passSideNavActive(sideNavActive, children)}
	</ul>
));

SideNavItems.displayName = 'SideNavItems';

SideNavItems.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** Whether the side navigation is active. */
	sideNavActive: PropTypes.bool,
	/** The child elements. */
	children: PropTypes.node,
};

export default SideNavItems;
