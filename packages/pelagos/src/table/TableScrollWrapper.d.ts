import type {FunctionComponent, HTMLProps, ReactNode} from 'react';

interface TableScrollWrapperProps extends HTMLProps<HTMLDivElement> {
	/** The component class name(s). */
	className?: string;
	/** The scroll direction. */
	direction?: 'vertical' | 'both';
	/** The child elements. */
	children?: ReactNode;
}

/** Scrolling wrapper element for a table component. */
declare const TableScrollWrapper: FunctionComponent<TableScrollWrapperProps>;
export default TableScrollWrapper;
