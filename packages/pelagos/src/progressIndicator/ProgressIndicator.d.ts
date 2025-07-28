import type {FunctionComponent, ReactNode} from 'react';

interface ProgressIndicatorProps {
	/** The component class name(s). */
	className?: string;
	/** The index of the current step. */
	current?: number;
	/** The steps, must be instances of `ProgressStep`. */
	children?: ReactNode[];
}

/** Indicates progress on a multi-step process. */
declare const ProgressIndicator: FunctionComponent<ProgressIndicatorProps>;
export default ProgressIndicator;
