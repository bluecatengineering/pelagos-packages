import type {ComponentPropsWithRef, ElementType, ReactElement, ReactNode} from 'react';

interface TabOwnProps {
	/** The component class name(s). */
	className?: string;
	/** A label to display under the primary label, only available in contained tabs. */
	secondaryLabel?: string;
	/** The primary label. */
	children?: ReactNode;
	/** Function invoked when the remove button is clicked. The remove button is displayed only when this property is not null. */
	onRemove?: (index: number) => void;
}

type TabProps<T extends ElementType> = TabOwnProps & {
	/** Element or custom component to use as main element. */
	as?: T;
} & Omit<ComponentPropsWithRef<T>, keyof TabOwnProps | 'as'>;

/** A single tab in a TabList. */
declare const Tab: <T extends ElementType>(props: TabProps<T>) => ReactElement;
export default Tab;
