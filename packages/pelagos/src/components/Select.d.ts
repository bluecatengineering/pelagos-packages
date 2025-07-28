import type {HTMLProps, ReactElement, ReactNode} from 'react';

interface SelectProps<T> extends Omit<HTMLProps<HTMLDivElement>, 'onChange' | 'value'> {
	/** The component ID. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The value of the selected option. */
	value?: T;
	/** The list of options. */
	options: T[];
	/** The placeholder text. */
	placeholder?: string;
	/** Whether the component is disabled. */
	disabled?: boolean;
	/** Whether the component is in error. */
	error?: boolean;
	/** Function invoked to get the key of each option. */
	getOptionKey?: (option: T) => string;
	/** Function invoked to render each option. */
	renderOption: (option: T) => ReactNode;
	/** Function invoked when the selected option changes. */
	onChange: (value: T) => void;
}

/** A select drop-down. */
declare const Select: <T>(props: SelectProps<T>) => ReactElement;
export default Select;
