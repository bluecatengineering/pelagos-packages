import type {FunctionComponent, HTMLProps, ReactNode} from 'react';

interface SideNavItemsProps extends HTMLProps<HTMLUListElement> {
	/** The component class name(s). */
	className?: string;
	/** The child elements. */
	children?: ReactNode;
}

/** Container for a list of any mix of SideNavMenu, SideNavLink, or SideNavDivider. */
declare const SideNavItems: FunctionComponent<SideNavItemsProps>;
export default SideNavItems;
