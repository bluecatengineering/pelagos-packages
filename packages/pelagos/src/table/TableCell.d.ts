import type {FunctionComponent, HTMLProps, ReactNode} from 'react';

interface TableCellProps extends HTMLProps<HTMLTableCellElement> {
	/** The component class name(s). */
	className?: string;
	/** The alignment for text in the cell. */
	align?: 'center' | 'left' | 'right';
	/** The child elements. */
	children?: ReactNode;
}

/** Cell element for a table component. */
declare const TableCell: FunctionComponent<TableCellProps>;
export default TableCell;
