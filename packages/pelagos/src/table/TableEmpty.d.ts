import type {FunctionComponent, HTMLProps, ReactNode} from 'react';

interface TableEmptyProps extends HTMLProps<HTMLDivElement> {
	/** The component class name(s). */
	className?: string;
	/** The child elements. */
	children?: ReactNode;
}

/** Element displayed when a table is empty. */
declare const TableEmpty: FunctionComponent<TableEmptyProps>;
export default TableEmpty;
