import type {FunctionComponent, MouseEventHandler} from 'react';

interface ConfirmDialogProps {
	/** The dialog title. */
	title: string;
	/** The URL to use in the help link, if specified a link will be added in the header. */
	helpHref?: string;
	/** The text to display in the dialog body. */
	body?: string;
	/** The text to display in the confirm button. */
	confirmText: string;
	/** The confirm button type. */
	confirmBtnType?: 'primary' | 'dangerPrimary';
	/** The dialog size. */
	size?: 'xs' | 'sm' | 'md' | 'lg';
	/** Function invoked when the close button is clicked. */
	onClose: MouseEventHandler<HTMLButtonElement>;
	/** Function invoked when the confirm button is clicked. */
	onConfirm: MouseEventHandler<HTMLButtonElement>;
}

/** A confirmation dialog. */
declare const ConfirmDialog: FunctionComponent<ConfirmDialogProps>;
export default ConfirmDialog;
