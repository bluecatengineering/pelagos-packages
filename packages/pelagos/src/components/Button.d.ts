import type {HTMLProps, FunctionComponent, MouseEventHandler, ReactNode} from 'react';
import type {CarbonIconType} from '@carbon/icons-react/es/CarbonIcon';

interface ButtonProps extends Omit<HTMLProps<HTMLButtonElement>, 'size'> {
	/** The component id. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The text to display. */
	text?: string;
	/** The child elements, can be provided instead of text. */
	children?: ReactNode;
	/** The icon to display. */
	icon?: CarbonIconType;
	/** The tooltip text to display. */
	tooltipText?: string;
	/** The size of the button. */
	size?: 'small' | 'medium' | 'large';
	/** The button type. */
	type?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'dangerPrimary' | 'dangerTertiary' | 'dangerGhost';
	/** Whether the button is disabled. */
	disabled?: boolean;
	/** Function invoked when the button is clicked. */
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

/** A button. */
declare const Button: FunctionComponent<ButtonProps>;
export default Button;
