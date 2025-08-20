import type {FunctionComponent, ReactNode} from 'react';

interface DialogProps {
	/** The component ID. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The dialog title. */
	title: string;
	/** The URL to use in the help link, if specified a link will be added in the header. */
	helpHref?: string;
	/** The dialog ARIA role. */
	role?: 'alertdialog' | 'dialog';
	/** The dialog size. */
	size?: 'xs' | 'sm' | 'md' | 'lg';
	/** Whether the dialog should use the maximum height for the size. */
	stretch?: boolean;
	/** Whether the dialog body can scroll. */
	scrollable?: boolean;
	/** The ID of the component to focus. */
	initialFocus?: string;
	/** The dialog children (content and buttons). */
	children: [ReactNode, ReactNode];
	/** Function invoked when a submit button is clicked. */
	onSubmit?: () => void;
}

/** A modal dialog box. */
declare const Dialog: FunctionComponent<DialogProps>;
export default Dialog;
