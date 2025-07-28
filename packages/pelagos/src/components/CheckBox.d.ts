import type {ChangeEventHandler, FunctionComponent, HTMLProps, ReactNode} from 'react';

interface CheckBoxProps extends Omit<HTMLProps<HTMLInputElement>, 'label'> {
	/** The component id. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The checkbox label. */
	label?: ReactNode;
	/** Whether the box is checked. */
	checked?: boolean;
	/** Whether the box state is indeterminate. */
	indeterminate?: boolean;
	/** Whether the box is disabled. */
	disabled?: boolean;
	/** Whether the box is in error. */
	error?: boolean;
	/** Function invoked when the checked status is changed. */
	onChange: ChangeEventHandler<HTMLInputElement>;
}

/* A checkbox. */
declare const CheckBox: FunctionComponent<CheckBoxProps>;
export default CheckBox;
