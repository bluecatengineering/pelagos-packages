import {forwardRef, Children, useContext} from 'react';
import PropTypes from 'prop-types';
import ChevronDown from '@carbon/icons-react/es/ChevronDown';

import useCollapse from '../hooks/useCollapse';

import SideNavContext from './SideNavContext';

import './SideNav.less';

const hasCurrentChild = (children) => Children.toArray(children).some((child) => child.props?.current);

/** Menu in the side navigation panel. Must be a direct child of SideNavItems. */
const SideNavMenu = forwardRef(({className, title, expanded, children, ...props}, ref) => {
	const active = useContext(SideNavContext);
	return (
		<li className={className}>
			<button
				{...props}
				className={`SideNav__submenu${
					hasCurrentChild(children) ? ` SideNav__submenu--${expanded ? 'active' : 'current'}` : ''
				}`}
				type="button"
				tabIndex={active ? 0 : -1}
				aria-expanded={expanded}
				ref={ref}>
				<span className="SideNav__submenuTitle" title={title}>
					{title}
				</span>
				<ChevronDown className="SideNav__icon" />
			</button>
			<ul className="SideNav__menu" ref={useCollapse(expanded)}>
				{children}
			</ul>
		</li>
	);
});

SideNavMenu.displayName = 'SideNavMenu';

SideNavMenu.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The menu title. */
	title: PropTypes.string,
	/** Whether the menu is expanded. */
	expanded: PropTypes.bool,
	/** @deprecated the value is passed from SideNav. */
	sideNavActive: PropTypes.bool,
	/** The child elements. */
	children: PropTypes.node,
};

export default SideNavMenu;
