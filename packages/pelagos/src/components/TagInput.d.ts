import type {FunctionComponent, HTMLProps} from 'react';

interface TagInputProps extends Omit<HTMLProps<HTMLInputElement>, 'onChange' | 'onError'> {
	/** The component id. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The entered tags. */
	tags: string[];
	/** The default tags. */
	defaultTags?: string[];
	/** The tooltip for default tags. */
	defaultTooltipText?: string;
	/** Whether the component is in error. */
	error?: string;
	/** Function invoked to validate each tag. */
	validate: (name: string) => string | null;
	/** Whether the input is disabled. */
	disabled?: boolean;
	/** Function that transforms a tag before it is added. */
	transform?: (name: string) => string;
	/** Function invoked when the tags change. */
	onChange: (tags: string[], event: Event) => void;
	/** Function invoked when an error is detected. */
	onError: (error: string | null, event: Event) => void;
}

/** A component to enter tags. */
declare const TagInput: FunctionComponent<TagInputProps>;
export default TagInput;
