import type {HTMLProps, ReactElement, ReactNode} from 'react';

interface DropDownFieldProps<T> extends Omit<HTMLProps<HTMLDivElement>, 'onChange' | 'value'> {
	/** The component id. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The field label. */
	label: string;
	/** The selected value. */
	value?: T | null;
	/** The options for the dropdown. */
	options: T[];
	/** The placeholder text when no option is selected. */
	placeholder?: string;
	/** Whether the field is disabled. */
	disabled?: boolean;
	/** Whether the field is required. */
	required?: boolean;
	/** Additional information for the field. */
	helperText?: string;
	/** The error text. */
	error?: string;
	/** Function invoked to get the key of each option. */
	getOptionKey?: (option: T) => number | string;
	/** Function invoked to render the options. */
	renderOption: (option: T) => ReactNode;
	/** Function invoked when the option is changed. */
	onChange: (option: T) => void;
}

/** A form field wrapper for Select. */
declare const DropDownField: <T>(props: DropDownFieldProps<T>) => ReactElement;
export default DropDownField;
