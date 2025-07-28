import type {FunctionComponent} from 'react';

import type ToastTypes from '../toasts/ToastTypes';

export interface ToastMessage {
	id?: string;
	type?: (typeof ToastTypes)[keyof typeof ToastTypes];
	text?: string;
	actionText?: string;
	onClick?: () => void;
}

interface ToastProps {
	/** Messages to display. */
	messages?: ToastMessage[];
	/** Function to remove a message. */
	onRemove?: (message: ToastMessage) => void;
}

/** Displays messages as toasts. */
declare const Toast: FunctionComponent<ToastProps>;
export default Toast;
