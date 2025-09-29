import type {FunctionComponent, HTMLProps, ReactNode} from 'react';

interface FieldWrapperProps extends HTMLProps<HTMLLabelElement> {
	/** The component class name(s). */
	className?: string;
	/** The identifier of the accompanying element. */
	htmlFor?: string;
	/** The label text. */
	label: string;
	/** The character counter. */
	counter?: string;
	/** Whether to mark the field as required. */
	required?: boolean;
	/** The field helper component identifier. */
	helperId?: string;
	/** Additional information for the field. */
	helperText?: string;
	/** The error text. */
	error?: string | null;
	/** The child elements. */
	children?: ReactNode;
}

/** Standard wrapper for form field components. */
declare const FieldWrapper: FunctionComponent<FieldWrapperProps>;
export default FieldWrapper;
