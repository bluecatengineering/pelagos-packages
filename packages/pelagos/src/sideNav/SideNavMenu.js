import {forwardRef, Children, useContext} from 'react';
import PropTypes from 'prop-types';
import ChevronDown from '@carbon/icons-react/es/ChevronDown';

import useCollapse from '../hooks/useCollapse';
import useRandomId from '../hooks/useRandomId';

import SideNavContext from './SideNavContext';

import './SideNav.less';

const hasCurrentChild = (children) => Children.toArray(children).some((child) => child.props?.current);

/** Menu in the side navigation panel. Must be a direct child of SideNavItems. */
const SideNavMenu = forwardRef(({id, className, title, icon: Icon, expanded, children, ...props}, ref) => {
	const active = useContext(SideNavContext);
	id = useRandomId(id);
	const menuId = `${id}-menu`;
	return (
		<li className={className}>
			<button
				{...props}
				id={id}
				className={`SideNav__submenu${
					hasCurrentChild(children) ? ` SideNav__submenu--${expanded ? 'active' : 'current'}` : ''
				}`}
				type="button"
				tabIndex={active ? 0 : -1}
				aria-expanded={expanded}
				aria-controls={menuId}
				ref={ref}>
				{Icon && <Icon className="SideNav__icon" />}
				<span className="SideNav__submenuTitle" title={title}>
					{title}
				</span>
				<ChevronDown className="SideNav__chevron" />
			</button>
			<ul id={menuId} className={`SideNav__menu${Icon ? ' SideNav__menu--withIcon' : ''}`} ref={useCollapse(expanded)}>
				{children}
			</ul>
		</li>
	);
});

SideNavMenu.displayName = 'SideNavMenu';

SideNavMenu.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The menu title. */
	title: PropTypes.string,
	/** The icon to display */
	icon: PropTypes.elementType,
	/** Whether the menu is expanded. */
	expanded: PropTypes.bool,
	/** @deprecated the value is passed from SideNav. */
	sideNavActive: PropTypes.bool,
	/** The child elements. */
	children: PropTypes.node,
};

export default SideNavMenu;
