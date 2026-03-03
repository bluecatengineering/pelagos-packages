import type {FunctionComponent, HTMLProps} from 'react';

interface TextInputProps extends Omit<HTMLProps<HTMLInputElement>, 'value' | 'onChange'> {
	/** The component ID. */
	id?: string;
	/** The component class name(s). */
	className?: string;
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
	/** Whether the component is in error. */
	error?: boolean;
	/** Function invoked when the value changes. */
	onChange: (value: string) => void;
}

/** A text input. */
declare const TextInput: FunctionComponent<TextInputProps>;
export default TextInput;
