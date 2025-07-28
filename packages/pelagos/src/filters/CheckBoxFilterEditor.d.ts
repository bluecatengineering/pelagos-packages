import type {FunctionComponent} from 'react';

interface CheckBoxFilterEditorProps {
	/** The component id. */
	id?: string;
	/** The field label. */
	label: string;
	/** The filter options. */
	options: string[];
	/** The current filter values. */
	list?: string[];
	/** Function returning the option label. */
	getLabel: (option: string) => string;
	/** The ID of the chip which triggered the editor. */
	chipId: string;
	/** Function invoked to close the editor. */
	onClose: () => void;
	/** Function invoked to save changes. */
	onSave: (list: string[] | null) => void;
	/** Whether to enable new behaviour for FilterArea.  */
	forArea: true;
}

/** Filter editor where options are presented as check boxes. */
declare const CheckBoxFilterEditor: FunctionComponent<CheckBoxFilterEditorProps>;
export default CheckBoxFilterEditor;
