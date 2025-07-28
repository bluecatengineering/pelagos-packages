import type {FunctionComponent, HTMLProps, ReactNode} from 'react';

interface ButtonMenuProps extends Omit<HTMLProps<HTMLButtonElement>, 'size'> {
	/** The component id. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The text to display. */
	text?: string;
	/** The tooltip text to display. */
	tooltipText?: string;
	/** The placement of the tooltip relative to the button. */
	tooltipPlacement?: 'left' | 'right' | 'top' | 'bottom';
	/** The size of the button. */
	size?: 'small' | 'medium' | 'large';
	/** The button type. */
	type?: 'primary' | 'tertiary' | 'ghost';
	/** Whether the button is disabled. */
	disabled?: boolean;
	/** Whether the menu alignment should be flipped. */
	flipped?: boolean;
	/** The menu items. */
	children: ReactNode[];
}

/** A button with a pop-up menu. */
declare const ButtonMenu: FunctionComponent<ButtonMenuProps>;
export default ButtonMenu;
