import type {FunctionComponent, HTMLProps, MouseEventHandler} from 'react';

interface LinkButtonProps extends Omit<HTMLProps<HTMLLinkElement>, 'size'> {
	/** The component id. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The link URL. */
	href?: string;
	/** The text to display. */
	text: string;
	/** The tooltip text to display. */
	tooltipText?: string;
	/** The size of the button. */
	size?: 'small' | 'medium' | 'large';
	/** The button type. */
	type?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
	/** Whether the button is disabled. */
	disabled?: boolean;
	/** Function invoked when the button is clicked. */
	onClick?: MouseEventHandler<HTMLLinkElement>;
}

/** A link styled as a button. */
declare const LinkButton: FunctionComponent<LinkButtonProps>;
export default LinkButton;
