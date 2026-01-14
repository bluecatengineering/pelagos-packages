import type {HTMLProps, ReactElement} from 'react';

interface MultiSelectProps<T> extends Omit<HTMLProps<HTMLDivElement>, 'onChange' | 'value'> {
	/** The component ID. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The selected values. */
	values?: T[];
	/** The list of options. */
	options: T[];
	/** The text to display in the content. */
	text?: string;
	/** Whether the component is disabled. */
	disabled?: boolean;
	/** Whether the component is in error. */
	error?: boolean;
	/** Function invoked to get the key of each option. */
	getOptionKey?: (option: T) => string;
	/** Function invoked to get the text of each option. */
	getOptionText?: (option: T) => string;
	/** Function invoked when the selected values change. */
	onChange: (value: T[]) => void;
}

/** A multi-select drop-down. */
declare const MultiSelect: <T>(props: MultiSelectProps<T>) => ReactElement;
export default MultiSelect;
