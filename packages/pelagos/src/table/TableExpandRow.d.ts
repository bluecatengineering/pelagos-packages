import type {FunctionComponent, HTMLProps, MouseEventHandler, ReactNode} from 'react';

interface TableExpandRowProps extends HTMLProps<HTMLTableRowElement> {
	/** The component class name(s). */
	className?: string;
	/** Whether this row is selected. */
	selected?: boolean;
	/** Whether this row is expanded. */
	expanded?: boolean;
	/** ID of the expandable row controlled by this row. */
	'aria-controls': string;
	/** The child elements. */
	children?: ReactNode;
	/** Function invoked when the expand button is clicked. */
	onExpand: MouseEventHandler<HTMLButtonElement>;
}

/** Row element which controls an expandable row, a TableExpandableRow element must follow this element. */
declare const TableExpandRow: FunctionComponent<TableExpandRowProps>;
export default TableExpandRow;
