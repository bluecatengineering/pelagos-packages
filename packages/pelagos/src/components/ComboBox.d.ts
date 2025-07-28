import type {FunctionComponent, HTMLProps, ReactNode} from 'react';

import type {ListInputSuggestion} from '../listInput/ListInput';

interface ComboBoxProps extends Omit<HTMLProps<HTMLInputElement>, 'onChange'> {
	/** The component id. */
	id?: string;
	/** The placeholder text. */
	placeholder?: string;
	/** Whether the first suggestion is selected by default. */
	autoSelect?: boolean;
	/** The input field text. */
	text?: string;
	/** Whether the component is disabled. */
	disabled?: boolean;
	/** Whether the component is in error. */
	error?: boolean;
	/** Function invoked to get suggestions based on text input, can return a promise. */
	getSuggestions: (text: string) => ListInputSuggestion[] | Promise<ListInputSuggestion[]>;
	/** Function invoked to render suggestions. */
	renderSuggestion?: (suggestion: ListInputSuggestion) => ReactNode;
	/** Function invoked when a suggestion is selected. */
	onChange?: (suggestion: ListInputSuggestion) => void;
	/** Function invoked when the enter key is pressed. */
	onEnter?: (text: string) => void;
	/** Function invoked when the text input is changed. */
	onTextChange?: (text: string) => void;
}

/** A combination box of a text field and an autocomplete list. */
declare const ComboBox: FunctionComponent<ComboBoxProps>;
export default ComboBox;
