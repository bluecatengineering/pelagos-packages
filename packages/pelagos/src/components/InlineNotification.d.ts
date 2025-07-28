import type {FunctionComponent, HTMLProps} from 'react';

interface InlineNotificationProps extends HTMLProps<HTMLDivElement> {
	/** The component class name(s). */
	className?: string;
	/** The notification type. */
	type: 'success' | 'info' | 'warning' | 'error';
	/** The notification title. */
	title?: string;
	/** The notification text. */
	text: string;
}

/** A notification to be used inside other components. */
declare const InlineNotification: FunctionComponent<InlineNotificationProps>;
export default InlineNotification;
