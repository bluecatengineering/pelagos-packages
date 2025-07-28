import type {FunctionComponent, HTMLProps, ReactNode} from 'react';

interface TableProps extends HTMLProps<HTMLTableElement> {
	/** The component class name(s). */
	className?: string;
	/** The mode rows are displayed. */
	rowMode?: 'line' | 'zebra';
	/** Whether to enable sticky headers. */
	stickyHeader?: boolean;
	/** Whether to enable fixed layout. */
	fixedLayout?: boolean;
	/** Whether to enable fixed column widths, implies fixed layout and requires `direction="both"` on the wrapper. */
	fixedColumns?: boolean;
	/** The child elements. */
	children?: ReactNode;
}

/** Basic table component. */
declare const Table: FunctionComponent<TableProps>;
export default Table;
