import type {FunctionComponent, HTMLProps} from 'react';

interface TextAreaProps extends Omit<HTMLProps<HTMLTextAreaElement>, 'value' | 'onChange'> {
	/** The component ID. */
	id?: string;
	/** The component class name(s). */
	className?: string;
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
	/** Whether the component is in error. */
	error?: boolean;
	/** Function invoked when the value changes. */
	onChange: (value: string) => void;
}

/** A text area input. */
declare const TextArea: FunctionComponent<TextAreaProps>;
export default TextArea;
