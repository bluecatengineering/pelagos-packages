import type {FunctionComponent, HTMLProps, ReactNode} from 'react';

interface VerticalTabProps extends HTMLProps<HTMLButtonElement> {
	/** The component class name(s). */
	className?: string;
	/** A label to display under the primary label, only available in contained tabs. */
	secondaryLabel?: string;
	/** Whether the tab is disabled. */
	disabled?: boolean;
	/** Whether the tab has an error. */
	error?: boolean;
	/** The primary label. */
	children?: ReactNode;
}

/** A single tab in a VerticalTabList. */
declare const VerticalTab: FunctionComponent<VerticalTabProps>;
export default VerticalTab;
