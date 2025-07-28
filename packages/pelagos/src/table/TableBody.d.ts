import type {FunctionComponent, HTMLProps, ReactNode} from 'react';

interface TableBodyProps extends HTMLProps<HTMLTableSectionElement> {
	/** The child elements. */
	children?: ReactNode;
}

/** Body element for a table component. */
declare const TableBody: FunctionComponent<TableBodyProps>;
export default TableBody;
