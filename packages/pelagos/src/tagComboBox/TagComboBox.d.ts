import type {HTMLProps, MouseEventHandler, ReactElement} from 'react';

import type {ListInputSuggestion} from '../listInput';

interface TagComboBoxProps<T> extends Omit<HTMLProps<HTMLInputElement>, 'onChange' | 'onError'> {
	/** The component id. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The entered tags. */
	tags: T[];
	/** The default tags. */
	defaultTags?: T[];
	/** The tooltip for default tags. */
	defaultTooltipText?: string;
	/** Whether the component is in error. */
	error?: string | null;
	/** Whether the input is disabled. */
	disabled?: boolean;
	/** Function invoked to get the key of each tag. */
	getKey?: (tag: T) => string;
	/** Function invoked to get the name of each tag. */
	getName?: (tag: T) => string;
	/**
	 * Function invoked to render each tag, it must return an element. isDefault is true for the default tags,
	 * which get the tooltip callback ref instead of the remove handler.
	 */
	renderTag?: (
		tag: T,
		disabled: boolean,
		isDefault: boolean,
		handleRemove: MouseEventHandler<HTMLButtonElement> | null,
		tooltipRef?: (element: Element | null) => void
	) => ReactElement;
	/** Function invoked to check if a tag is already present in the tags. */
	hasTag?: (tags: T[], tag: T) => boolean;
	/** Function invoked to validate each tag. */
	validate: (text: string) => string | null;
	/** Function that transforms the text input before it is validated. */
	transform?: (input: string) => string;
	/** Function that converts the text input to a tag. */
	textToTag?: (text: string) => T;
	/** Function invoked to get suggestions based on text input, can return a promise. It must be stable (for example wrapped in useCallback), a new function discards the pending suggestions. */
	getSuggestions?: (text: string) => ListInputSuggestion[] | Promise<ListInputSuggestion[]>;
	/** Function invoked to render suggestions, must return an element. Defaults to `renderSuggestion`. */
	renderSuggestion?: (suggestion: ListInputSuggestion, index: number) => ReactElement;
	/** Function that converts a suggestion to a tag. */
	suggestionToTag?: (suggestion: ListInputSuggestion) => T;
	/** Function invoked when the tags change. */
	onChange: (list: T[], event: Event) => void;
	/** Function invoked when an error is detected. */
	onError: (error: string | null, event: Event) => void;
}

/** A component to enter tags with auto complete. */
declare const TagComboBox: <T>(props: TagComboBoxProps<T>) => ReactElement;
export default TagComboBox;
