import type {FunctionComponent} from 'react';

interface ProgressBarProps {
	/** The component id. */
	id?: string;
	/** The component class name(s). */
	className?: string;
	/** The label text. */
	label?: string;
	/** The textual representation of the current progress. */
	helperText?: string;
	/** The alignment type. */
	type?: 'default' | 'inline' | 'indented';
	/** The size of the progress bar. */
	size?: 'small' | 'big';
	/** The progress bar status. */
	status?: 'active' | 'finished' | 'error';
	/** The maximum value. */
	max?: number;
	/** The current value. */
	value?: number;
}

/** Displays the progress status for tasks that take a long time. */
declare const ProgressBar: FunctionComponent<ProgressBarProps>;
export default ProgressBar;
