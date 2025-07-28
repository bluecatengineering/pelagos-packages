import type {FunctionComponent} from 'react';

interface TimeFilterEditorProps {
	/** The component id. */
	id?: string;
	/** The field label. */
	label?: string;
	/** The current value. */
	value?: string | {from?: number; to?: number};
	/** The hint for the "from" field. */
	fromPlaceholder?: string;
	/** The hint for the "to" field. */
	toPlaceholder?: string;
	/** The list of predefined time ranges. */
	options: string[];
	/** Function returning the label for the specified option. */
	getOptionLabel: (option: string) => string;
	/** Function returning a formatted time. */
	format: (value: number) => string;
	/** Function returning a formatted time. */
	parse: (value: string) => number;
	/** Function invoked to validate the "from" time, must return either an error message or `null`. */
	validateFrom: (value?: string) => string | null;
	/** Function invoked to validate the "to" time, must return either an error message or `null`. */
	validateTo: (value?: string) => string | null;
	/** The ID of the chip which triggered the editor. */
	chipId: string;
	/** Function invoked to close the editor. */
	onClose: () => void;
	/** Function invoked to save changes. */
	onSave: (value: string | {from?: number; to?: number} | null) => void;
}

/**
 * Filter editor which accepts a time range.
 * The list of options must have `custom` as the last entry.
 * If `value` is an object the format is `{from?: number, to?: number}`.
 */
declare const TimeFilterEditor: FunctionComponent<TimeFilterEditorProps>;
export default TimeFilterEditor;
