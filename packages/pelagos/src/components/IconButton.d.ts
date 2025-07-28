import type {FunctionComponent, HTMLProps, MouseEventHandler, ReactNode} from 'react';
import type {CarbonIconType} from '@carbon/icons-react/es/CarbonIcon';

interface IconButtonProps extends Omit<HTMLProps<HTMLButtonElement>, 'size'> {
	/** The component id. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The icon to display */
	icon: CarbonIconType;
	/** The component size. */
	size?: 'medium' | 'large';
	/** The button type. */
	type?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'dangerTertiary' | 'dangerPrimary' | 'dangerGhost';
	/** The tooltip text to display. */
	tooltipText?: string;
	/** The placement of the tooltip relative to the button. */
	tooltipPlacement?: 'bottom' | 'left' | 'right' | 'top';
	/** An overlay element. */
	overlay?: ReactNode;
	/** Whether the button is disabled. */
	disabled?: boolean;
	/** Whether the button is pressed, applies only for ghost buttons. */
	pressed?: boolean;
	/** Function invoked when the button is clicked. */
	onClick: MouseEventHandler<HTMLButtonElement>;
}

/** An icon button. */
declare const IconButton: FunctionComponent<IconButtonProps>;
export default IconButton;
