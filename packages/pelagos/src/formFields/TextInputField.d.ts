import type {FunctionComponent, HTMLProps} from 'react';

interface TextInputFieldProps extends Omit<HTMLProps<HTMLInputElement>, 'value' | 'onChange'> {
	/** The component ID. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The label text. */
	label: string;
	/** The input type. */
	type?: string;
	/** The input name. */
	name?: string;
	/** The auto-complete option. */
	autoComplete?: string;
	/** The field value. */
	value?: number | string | null;
	/** The placeholder text. */
	placeholder?: string;
	/** The maximum text length. */
	maxLength?: number;
	/** Whether the field focused on display. */
	autoFocus?: boolean;
	/** Whether the field is disabled. */
	disabled?: boolean;
	/** Whether the field is required. */
	required?: boolean;
	/** Additional information for the field. */
	helperText?: string;
	/** The error text. */
	error?: string | null;
	/** Function invoked when the value changes. */
	onChange: (value: string) => void;
}

/** A text input form field. */
declare const TextInputField: FunctionComponent<TextInputFieldProps>;
export default TextInputField;
