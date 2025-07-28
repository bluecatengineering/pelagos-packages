import type {FunctionComponent, HTMLProps} from 'react';

interface TableExpandHeaderProps extends HTMLProps<HTMLTableHeaderCellElement> {
	/** The component class name(s). */
	className?: string;
}

/** Header element for the expandable column. */
declare const TableExpandHeader: FunctionComponent<TableExpandHeaderProps>;
export default TableExpandHeader;
