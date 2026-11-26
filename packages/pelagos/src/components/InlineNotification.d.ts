import type {FunctionComponent, HTMLProps, ReactNode} from 'react';

interface InlineNotificationProps extends HTMLProps<HTMLDivElement> {
	/** The component class name(s). */
	className?: string;
	/** The notification type. When used as callout, only `info` and `warning` are valid. */
	type: 'success' | 'info' | 'warning' | 'error';
	/** The notification title. */
	title?: string;
	/** The notification text. */
	text: ReactNode;
	/** The action button text, if set an action button is displayed. The notification never moves focus when it appears. */
	actionText?: string;
	/** Function invoked when the action button is clicked, required if `actionText` is set. */
	onAction?: () => void;
	/**
	 * Function invoked when the close button is clicked, if set a close button is displayed. Before it is invoked, focus
	 * moves to the next focusable element after the notification, or the nearest one before it. The parent is expected
	 * to remove the notification.
	 */
	onClose?: () => void;
}

/** A notification to be used inside other components. */
declare const InlineNotification: FunctionComponent<InlineNotificationProps>;
export default InlineNotification;
