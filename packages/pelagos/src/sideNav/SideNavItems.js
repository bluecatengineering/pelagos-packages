import {forwardRef} from 'react';
import PropTypes from 'prop-types';

import './SideNav.less';

/** Container for a list of any mix of SideNavMenu, SideNavLink, or SideNavDivider. */
const SideNavItems = forwardRef(({className, children, ...props}, ref) => (
	<ul {...props} className={`SideNav__items${className ? ` ${className}` : ''}`} ref={ref}>
		{children}
	</ul>
));

SideNavItems.displayName = 'SideNavItems';

SideNavItems.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** @deprecated the value is passed from SideNav. */
	sideNavActive: PropTypes.bool,
	/** The child elements. */
	children: PropTypes.node,
};

export default SideNavItems;
