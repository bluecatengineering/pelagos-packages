import type {ComponentPropsWithRef, ElementType, ReactElement, ReactNode} from 'react';

interface VerticalTabOwnProps {
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

type VerticalTabProps<T extends ElementType> = VerticalTabOwnProps & {
	/** Element or custom component to use as main element. */
	as?: T;
} & Omit<ComponentPropsWithRef<T>, keyof VerticalTabOwnProps | 'as'>;

/** A single tab in a VerticalTabList. */
declare const VerticalTab: <T extends ElementType>(props: VerticalTabProps<T>) => ReactElement;
export default VerticalTab;
