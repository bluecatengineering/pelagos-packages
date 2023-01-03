import {forwardRef, Children} from 'react';
import PropTypes from 'prop-types';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';

import SvgIcon from '../components/SvgIcon';
import useCollapse from '../hooks/useCollapse';

import passSideNavActive from './passSideNavActive';
import './SideNav.less';

const hasCurrentChild = (children) => Children.toArray(children).some((child) => child.props?.current);

/** Menu in the side navigation panel. Must be a direct child of SideNavItems. */
const SideNavMenu = forwardRef(({className, title, expanded, sideNavActive, children, ...props}, ref) => (
	<li className={className}>
		<button
			{...props}
			className={`SideNav__submenu${
				hasCurrentChild(children) ? ` SideNav__submenu--${expanded ? 'active' : 'current'}` : ''
			}`}
			type="button"
			tabIndex={sideNavActive ? 0 : -1}
			aria-expanded={expanded}
			ref={ref}>
			<div className="SideNav__submenuTitle">{title}</div>
			<SvgIcon className="SideNav__icon" icon={faAngleDown} />
		</button>
		<ul className="SideNav__menu" ref={useCollapse(expanded)}>
			{passSideNavActive(sideNavActive, children)}
		</ul>
	</li>
));

SideNavMenu.displayName = 'SideNavMenu';

SideNavMenu.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The menu title. */
	title: PropTypes.string,
	/** Whether the menu is expanded. */
	expanded: PropTypes.bool,
	/** Whether the side navigation is active. */
	sideNavActive: PropTypes.bool,
	/** The child elements. */
	children: PropTypes.node,
};

export default SideNavMenu;
