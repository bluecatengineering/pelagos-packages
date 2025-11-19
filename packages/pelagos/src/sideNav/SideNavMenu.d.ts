import type {FunctionComponent, HTMLProps, ReactNode} from 'react';
import type {CarbonIconType} from '@carbon/icons-react/es/CarbonIcon';

interface SideNavMenuProps extends Omit<HTMLProps<HTMLButtonElement>, 'title'> {
	/** The component id. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The menu title. */
	title: string | null;
	/** The icon to display */
	icon?: CarbonIconType;
	/** Whether the menu is expanded. */
	expanded?: boolean;
	/** The child elements. */
	children?: ReactNode;
}

/** Menu in the side navigation panel. Must be a direct child of SideNavItems. */
declare const SideNavMenu: FunctionComponent<SideNavMenuProps>;
export default SideNavMenu;
