import type {FunctionComponent, HTMLProps} from 'react';

interface TableSelectAllProps extends HTMLProps<HTMLInputElement> {
	/** The name for the input element. */
	name?: string;
	/** Whether all rows are selected. */
	checked?: boolean;
	/** Whether a subset of the rows is selected. */
	indeterminate?: boolean;
	/** Whether the checkbox is disabled. */
	disabled?: boolean;
	/** The aria label for the input element */
	'aria-label': string;
}

/** Header element for a checkbox selection column. */
declare const TableSelectAll: FunctionComponent<TableSelectAllProps>;
export default TableSelectAll;
