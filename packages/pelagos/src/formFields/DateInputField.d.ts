import type {FunctionComponent, HTMLProps} from 'react';

interface DateInputFieldProps extends Omit<HTMLProps<HTMLInputElement>, 'onChange'> {
	/** The component id. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The field label. */
	label: string;
	/** The field value. */
	value?: string;
	/** The placeholder text. */
	placeholder?: string;
	/** Whether the field should be focused on display. */
	autoFocus?: boolean;
	/** Whether the field is disabled. */
	disabled?: boolean;
	/** Whether the field is required. */
	required?: boolean;
	/** Additional information for the field. */
	helperText?: string;
	/** The error text. */
	error?: string;
	/** Function invoked to format the date selected form the calendar. */
	format: (timestamp: number) => string;
	/** Function invoked to parse the value to pass to the calendar, must return null if the value is not valid. */
	parse: (dateTimeString: string) => number | null;
	/** Function invoked when the value changes. */
	onChange: (dateTimeString: string) => void;
}

/** A form field wrapper for DateInput. */
declare const DateInputField: FunctionComponent<DateInputFieldProps>;
export default DateInputField;
