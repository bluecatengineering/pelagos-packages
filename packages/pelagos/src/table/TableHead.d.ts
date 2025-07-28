import type {FunctionComponent, HTMLProps, ReactNode} from 'react';

interface TableHeadProps extends HTMLProps<HTMLTableSectionElement> {
	/** The child elements. */
	children?: ReactNode;
}

/** Head element for a table component. */
declare const TableHead: FunctionComponent<TableHeadProps>;
export default TableHead;
