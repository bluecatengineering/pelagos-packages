import type {FunctionComponent, HTMLProps} from 'react';

interface DateInputProps extends Omit<HTMLProps<HTMLInputElement>, 'onChange'> {
	/** The component class name(s). */
	className?: string;
	/** The field value. */
	value?: string;
	/** The placeholder text. */
	placeholder?: string;
	/** Whether the field should be focused on display. */
	autoFocus?: boolean;
	/** Whether the field is disabled. */
	disabled?: boolean;
	/** Whether the component is in error. */
	error?: boolean;
	/** Function invoked to format the date selected form the calendar. */
	format: (timestamp: number) => string;
	/** Function invoked to parse the value to pass to the calendar, must return null if the value is not valid. */
	parse: (dateTimeString: string) => number | null;
	/** Function invoked when the value changes. */
	onChange: (dateTimeString: string) => void;
}

/** A date input. */
declare const DateInput: FunctionComponent<DateInputProps>;
export default DateInput;
