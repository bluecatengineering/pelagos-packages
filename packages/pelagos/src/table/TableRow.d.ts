import type {FunctionComponent, HTMLProps, ReactNode} from 'react';

interface TableRowProps extends HTMLProps<HTMLTableRowElement> {
	/** Whether this row is selected. */
	selected?: boolean;
	/** The child elements. */
	children?: ReactNode;
}

/** Row element for a table component. */
declare const TableRow: FunctionComponent<TableRowProps>;
export default TableRow;
