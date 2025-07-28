import type {FunctionComponent} from 'react';

import type {ListInputSuggestion} from '../listInput/ListInput';

interface TextFilterEditorProps {
	/** The component id. */
	id?: string;
	/** The field label. */
	label?: string;
	/** The field hint. */
	placeholder?: string;
	/** The current filter values. */
	list: string[];
	/** Function returning suggestions. */
	getSuggestions?: (
		text: string,
		list: string[]
	) => {error: string} | {suggestions: ListInputSuggestion[] | Promise<ListInputSuggestion[]>};
	/** Function to parse the input text. */
	parseInput?: (text: string, list: string[]) => {entries?: string[]; error?: string};
	/** The ID of the chip which triggered the editor. */
	chipId: string;
	/** Function invoked to close the editor. */
	onClose: () => void;
	/** Function invoked to save changes. */
	onSave: (list: string[] | null) => void;
	/** Whether to enable new behaviour for FilterArea.  */
	forArea: true;
}

/** Filter editor where values are typed. */
declare const TextFilterEditor: FunctionComponent<TextFilterEditorProps>;
export default TextFilterEditor;
