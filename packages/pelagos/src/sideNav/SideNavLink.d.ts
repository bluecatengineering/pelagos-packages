import type {FunctionComponent, HTMLProps, MouseEventHandler, ReactNode} from 'react';

interface SideNavLinkProps extends HTMLProps<HTMLLinkElement> {
	/** The component class name(s). */
	className?: string;
	/** The link's href. */
	href?: string;
	/** Whether the first letter should be underlined to indicate a keyboard shortcut. */
	shortcut?: boolean;
	/** Whether this link is for the current page. */
	current?: boolean;
	/** The child elements. */
	children?: ReactNode;
	/** Function invoked when the link is clicked. */
	onClick: MouseEventHandler<HTMLLinkElement>;
}

/** Link in the side navigation panel. Must be a direct child of SideNavItems. */
declare const SideNavLink: FunctionComponent<SideNavLinkProps>;
export default SideNavLink;
