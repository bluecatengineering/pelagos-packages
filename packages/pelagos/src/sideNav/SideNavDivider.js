import PropTypes from 'prop-types';

import './SideNav.less';

/** A divider which can be placed inside SideNavItems. */
const SideNavDivider = ({className}) => <li className={`SideNav__divider${className ? ` ${className}` : ''}`} />;

SideNavDivider.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
};

export default SideNavDivider;
