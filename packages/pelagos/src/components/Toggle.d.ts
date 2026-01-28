import type {FunctionComponent, HTMLProps, MouseEventHandler} from 'react';

interface ToggleProps extends Omit<HTMLProps<HTMLButtonElement>, 'onChange'> {
	/** The component ID. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The label for the "on" position. */
	labelOn?: string;
	/** The label for the "off" position. */
	labelOff?: string;
	/** Whether the toggle is checked */
	checked?: boolean;
	/** Whether the toggle is disabled */
	disabled?: boolean;
	/** Function invoked when checked status changes. */
	onChange: MouseEventHandler<HTMLButtonElement>;
}

/** A toggle button. */
declare const Toggle: FunctionComponent<ToggleProps>;
export default Toggle;
