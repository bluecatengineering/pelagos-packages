import type {ComponentPropsWithoutRef, ElementType, MouseEventHandler, ReactElement} from 'react';

interface LinkButtonOwnProps {
	/** The component id. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The link URL. */
	href?: string;
	/** The text to display. */
	text: string;
	/** The tooltip text to display. Custom components must support `ref` forwarding. */
	tooltipText?: string;
	/** The size of the button. */
	size?: 'small' | 'medium' | 'large';
	/** The button type. */
	type?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
	/** Whether the button is disabled. */
	disabled?: boolean;
	/** Function invoked when the button is clicked. */
	onClick?: MouseEventHandler;
}

type LinkButtonProps<T extends ElementType = 'a'> = LinkButtonOwnProps & {
	/** Element or custom component to use as main element. */
	as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof LinkButtonOwnProps | 'as'>;

/** A link styled as a button. */
declare const LinkButton: <T extends ElementType = 'a'>(props: LinkButtonProps<T>) => ReactElement | null;
export default LinkButton;
