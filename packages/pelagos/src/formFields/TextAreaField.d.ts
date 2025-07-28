import type {FunctionComponent, HTMLProps} from 'react';

interface TextAreaFieldProps extends Omit<HTMLProps<HTMLTextAreaElement>, 'value' | 'onChange'> {
	/** The component ID. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The label text. */
	label: string;
	/** The field value. */
	value?: string;
	/** The placeholder text. */
	placeholder?: string;
	/** Whether the field is required. */
	required?: boolean;
	/** Whether the field can be resized. */
	resize?: boolean;
	/** The maximum text length. */
	maxLength?: number;
	/** Whether to show the character counter, requires `maxLength` to be set. */
	showCounter?: boolean;
	/** Additional information for the field. */
	helperText?: string;
	/** The error text. */
	error?: string | null;
	/** Function invoked when the value changes. */
	onChange: (value: string) => void;
}

/** A text area form field. */
declare const TextAreaField: FunctionComponent<TextAreaFieldProps>;
export default TextAreaField;
