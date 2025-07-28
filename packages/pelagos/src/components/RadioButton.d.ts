import type {ChangeEventHandler, FunctionComponent, HTMLProps, ReactNode} from 'react';

interface RadioButtonProps extends Omit<HTMLProps<HTMLInputElement>, 'label'> {
	/** The component id. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The label text. */
	label?: ReactNode;
	/** Whether the radio button is checked */
	checked?: boolean;
	/** Whether the button is in error. */
	error?: boolean;
	/** The tab index. */
	tabIndex?: number;
	/** Function invoked when checked status changes. */
	onChange?: ChangeEventHandler<HTMLInputElement>;
}

/** A radio button. */
declare const RadioButton: FunctionComponent<RadioButtonProps>;
export default RadioButton;
