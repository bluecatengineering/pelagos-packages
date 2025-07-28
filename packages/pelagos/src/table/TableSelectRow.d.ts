import type {FunctionComponent, HTMLProps} from 'react';

interface TableSelectRowProps extends HTMLProps<HTMLInputElement> {
	/** Whether the element should be a radio button or a checkbox. */
	radio?: boolean;
	/** The name for the input element. */
	name?: string;
	/** The value for the input element. */
	value?: number | string;
	/** Whether the row is selected. */
	checked?: boolean;
	/** Whether the checkbox is disabled. */
	disabled?: boolean;
	/** The aria label for the input element */
	'aria-label': string;
}

/** Cell element for row selection. */
declare const TableSelectRow: FunctionComponent<TableSelectRowProps>;
export default TableSelectRow;
