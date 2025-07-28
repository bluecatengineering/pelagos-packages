import type {HTMLProps, ReactElement, ReactNode} from 'react';

import type {ListInputSuggestion} from '../listInput/ListInput';

interface TagComboBoxFieldProps<T> extends Omit<HTMLProps<HTMLInputElement>, 'onChange' | 'onError'> {
	/** The component id. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The label text. */
	label: string;
	/** The entered tags. */
	tags: T[];
	/** The default tags. */
	defaultTags?: T[];
	/** The tooltip for default tags. */
	defaultTooltipText?: string;
	/** Additional information for the field. */
	helperText?: string;
	/** Whether the component is in error. */
	error?: string;
	/** Whether the input is disabled. */
	disabled?: boolean;
	/** Function invoked to get the key of each tag. */
	getKey?: (tag: T) => string;
	/** Function invoked to get the name of each tag. */
	getName?: (tag: T) => string;
	/** Function invoked to render each tag. */
	renderTag?: (tag: T) => ReactNode;
	/** Function invoked to check if a tag is already present. */
	hasTag?: (tag: T) => boolean;
	/** Function invoked to validate each tag. */
	validate: (text: string) => string | null;
	/** Function that transforms the text input before it is validated. */
	transform: (input: string) => string;
	/** Function that converts the text input to a tag. */
	textToTag: (text: string) => T;
	/** Function invoked to get suggestions based on text input, can return a promise. */
	getSuggestions?: (text: string) => ListInputSuggestion[] | Promise<ListInputSuggestion[]>;
	/** Function invoked to render suggestions. */
	renderSuggestion?: (suggestion: ListInputSuggestion, index: number) => ReactNode;
	/** Function that converts a suggestion to a tag. */
	suggestionToTag?: (suggestion: ListInputSuggestion) => T;
	/** Function invoked when the tags change. */
	onChange: (list: T[], event: Event) => void;
	/** Function invoked when an error is detected. */
	onError: (error: string | null, event: Event) => void;
}

/** A form field wrapper for TagComboBox. */
declare const TagComboBoxField: <T>(props: TagComboBoxFieldProps<T>) => ReactElement;
export default TagComboBoxField;
