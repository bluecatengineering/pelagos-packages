import type {FunctionComponent, HTMLProps} from 'react';

interface TableToolbarSearchProps extends Omit<HTMLProps<HTMLInputElement>, 'onChange'> {
	/** The component class name(s). */
	className?: string;
	/** The search text. Must be in lowercase. */
	value: string;
	/** The placeholder text. */
	placeholder?: string;
	/** Function invoked when the text changes. */
	onChange: (text: string) => void;
}

/** Search input for a table toolbar. */
declare const TableToolbarSearch: FunctionComponent<TableToolbarSearchProps>;
export default TableToolbarSearch;
