import type {FunctionComponent, HTMLProps, ReactNode, MouseEventHandler} from 'react';

interface SideNavMenuItemProps extends HTMLProps<HTMLLinkElement> {
	/** The component class name(s). */
	className?: string;
	/** The link's href. */
	href?: string;
	/** Whether the first letter should be underlined to indicate a keyboard shortcut. */
	shortcut?: boolean;
	/** Whether this menu item is for the current page. */
	current?: boolean;
	/** The child elements. */
	children?: ReactNode;
	/** Function invoked when the menu item is clicked. */
	onClick?: MouseEventHandler<HTMLLinkElement>;
}

/** Menu item in the side navigation panel. Must be a direct child of SideNavMenu. */
declare const SideNavMenuItem: FunctionComponent<SideNavMenuItemProps>;
export default SideNavMenuItem;
