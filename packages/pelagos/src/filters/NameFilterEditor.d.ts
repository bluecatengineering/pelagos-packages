import type {FunctionComponent} from 'react';

interface NameFilterEditorProps {
	/** The component id. */
	id?: string;
	/** The field label. */
	label?: string;
	/** The field hint. */
	placeholder?: string;
	/** The current filter values. */
	list: string[];
	/** The source for filter values. */
	sourceById: Record<string, {id: string; name: string}>;
	/** The error message when a value does not match. */
	errorMessage?: string;
	/** The ID of the chip which triggered the editor. */
	chipId: string;
	/** Function invoked to close the editor. */
	onClose: () => void;
	/** Function invoked to save changes. */
	onSave: (list: string[] | null) => void;
	/** Whether to enable new behaviour for FilterArea.  */
	forArea: true;
}

/** Filter editor where values are selected from a list. */
declare const NameFilterEditor: FunctionComponent<NameFilterEditorProps>;
export default NameFilterEditor;
