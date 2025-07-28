import type {HTMLProps, ReactElement, ReactNode} from 'react';

export interface ListInputSuggestion {
	id: string;
	name: string;
	order: number;
	description?: string;
}

interface ListInputProps<T> extends Omit<HTMLProps<HTMLInputElement>, 'list'> {
	/** The component id. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The label text. */
	label: string;
	/** Whether the field is required. */
	required?: boolean;
	/** The placeholder text in the input box. */
	placeholder?: string;
	/** The text below input box when list is empty. */
	emptyText?: string;
	/** The entries for the list. */
	list?: T[];
	/** Additional information for the field. */
	helperText?: string;
	/** The error text. */
	error?: string | null;
	/** Whether the list should be reorderable. */
	reorderable?: boolean | 'numbers';
	/** Whether the list should be reorderable. */
	column?: boolean;
	/** Function invoked to provide a list of suggestions. */
	getSuggestions: (
		text: string,
		list: T[]
	) => {error: string} | {suggestions: ListInputSuggestion[] | Promise<ListInputSuggestion[]>};
	/** Function invoked to render the suggestion text for the returned items. (see above) */
	getSuggestionText?: (suggestion: ListInputSuggestion) => string;
	/** Function invoked to get the value from the suggestion to add to the list. (see above) */
	getSuggestionValue?: (suggestion: ListInputSuggestion) => T | undefined;
	/** Function invoked to get the key of the suggestion to highlight. */
	getHighlightKey?: (suggestion: ListInputSuggestion) => string | null;
	/** Function invoked to parse the input text. */
	parseInput?: (text: string, list: T[]) => {entries?: T[]; error?: string};
	/** Function invoked to validate the suggestion. */
	validateSuggestion?: (suggestion: ListInputSuggestion) => string | null;
	/** Function invoked to render the suggestions. */
	renderSuggestion?: (suggestion: ListInputSuggestion) => ReactNode;
	/** Function invoked to get each item's key. */
	getItemKey: (item: T, index: number) => number | string;
	/** Function invoked to get each item's name. */
	getItemName: (item: T) => number | string;
	/** Function invoked to render each list item. */
	renderItem?: (item: T) => ReactNode;
	/** Function invoked when the list changes. */
	onListChange: (list: T[]) => void;
	/** Function invoked when the text input changes. */
	onTextChange: (hasText: boolean) => void;
	/** Function invoked when error status changes. */
	onErrorChange?: (error: string | null) => void;
}

/** An input box for a list of values. */
declare const ListInput: <T>(props: ListInputProps<T>) => ReactElement;
export default ListInput;
