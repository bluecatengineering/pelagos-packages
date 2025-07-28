import type {FunctionComponent, HTMLProps, ReactNode} from 'react';

interface TabProps extends HTMLProps<HTMLButtonElement> {
	/** The component class name(s). */
	className?: string;
	/** A label to display under the primary label, only available in contained tabs. */
	secondaryLabel?: string;
	/** The primary label. */
	children?: ReactNode;
	/** Function invoked when the remove button is clicked. The remove button is displayed only when this property is not null. */
	onRemove?: (index: number) => void;
}

/** A single tab in a TabList. */
declare const Tab: FunctionComponent<TabProps>;
export default Tab;
