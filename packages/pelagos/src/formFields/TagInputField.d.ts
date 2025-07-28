import type {FunctionComponent, HTMLProps} from 'react';

interface TagInputFieldProps extends Omit<HTMLProps<HTMLInputElement>, 'onChange' | 'onError'> {
	/** The component id. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The label text. */
	label: string;
	/** Whether the field is required. */
	required?: boolean;
	/** The entered tags. */
	tags: string[];
	/** The default tags. */
	defaultTags?: string[];
	/** The tooltip for default tags. */
	defaultTooltipText?: string;
	/** Additional information for the field. */
	helperText?: string;
	/** The error text. */
	error?: string;
	/** Whether the field is disabled. */
	disabled?: boolean;
	/** Function invoked to validate each tag. */
	validate: (name: string) => string | null;
	/** Function invoked when the tags change. */
	onChange: (tags: string[], event: Event) => void;
	/** Function invoked when an error is detected. */
	onError: (error: string | null, event: Event) => void;
}

/** A form field wrapper for TagInput. */
declare const TagInputField: FunctionComponent<TagInputFieldProps>;
export default TagInputField;
