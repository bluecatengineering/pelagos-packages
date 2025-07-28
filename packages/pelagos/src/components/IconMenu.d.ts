import type {FunctionComponent, HTMLProps, ReactNode} from 'react';
import type {CarbonIconType} from '@carbon/icons-react/es/CarbonIcon';

interface IconMenuProps extends HTMLProps<HTMLButtonElement> {
	/** The component id. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The icon to display */
	icon?: CarbonIconType;
	/** The tooltip text to display. */
	tooltipText?: string;
	/** The placement of the tooltip relative to the button. */
	tooltipPlacement?: 'left' | 'right' | 'top' | 'bottom';
	/** Whether to show an arrow. */
	arrow?: boolean;
	/** Whether the button is disabled. */
	disabled?: boolean;
	/** Whether the menu alignment should be flipped. */
	flipped?: boolean;
	/** The menu items. */
	children: ReactNode;
}

/** An icon button with a pop-up menu. */
declare const IconMenu: FunctionComponent<IconMenuProps>;
export default IconMenu;
