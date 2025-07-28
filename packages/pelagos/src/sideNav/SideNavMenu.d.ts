import type {FunctionComponent, HTMLProps, ReactNode} from 'react';

interface SideNavMenuProps extends Omit<HTMLProps<HTMLButtonElement>, 'title'> {
	/** The component class name(s). */
	className?: string;
	/** The menu title. */
	title: string | null;
	/** Whether the menu is expanded. */
	expanded?: boolean;
	/** The child elements. */
	children?: ReactNode;
}

/** Menu in the side navigation panel. Must be a direct child of SideNavItems. */
declare const SideNavMenu: FunctionComponent<SideNavMenuProps>;
export default SideNavMenu;
