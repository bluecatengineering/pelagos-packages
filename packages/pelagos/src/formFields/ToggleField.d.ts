import type {FunctionComponent} from 'react';

interface ToggleFieldProps {
	/** The component ID. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The label text. */
	label: string;
	/** The field value. */
	value?: boolean;
	/** Whether the toggle is disabled */
	disabled?: boolean;
	/** The label for the "on" position. */
	labelOn?: string;
	/** The label for the "off" position. */
	labelOff?: string;
	/** Function invoked when the value changes. */
	onChange: (value: boolean) => void;
}

/** A form field wrapper for Toggle. */
declare const ToggleField: FunctionComponent<ToggleFieldProps>;
export default ToggleField;
