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
}

/** A notification to be used inside other components. */
declare const InlineNotification: FunctionComponent<InlineNotificationProps>;
export default InlineNotification;
