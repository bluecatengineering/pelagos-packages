import type {FunctionComponent, HTMLProps, ReactNode} from 'react';

interface TableExpandableRowProps extends HTMLProps<HTMLTableRowElement> {
	/** The component class name(s). */
	className?: string;
	/** The width of the expanded row's internal cell. */
	colSpan: number;
	/** The child elements. */
	children?: ReactNode;
}

/** Expandable row element, it must follow a TableExpandRow element. */
declare const TableExpandableRow: FunctionComponent<TableExpandableRowProps>;
export default TableExpandableRow;
