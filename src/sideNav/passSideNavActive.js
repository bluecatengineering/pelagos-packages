import {Children, cloneElement} from 'react';

const components = ['SideNavItems', 'SideNavMenu', 'SideNavMenuItem', 'SideNavLink'];

export default (sideNavActive, children) =>
	sideNavActive
		? Children.map(children, (child) =>
				components.includes(child.type?.displayName) ? cloneElement(child, {sideNavActive}) : child
		  )
		: children;
