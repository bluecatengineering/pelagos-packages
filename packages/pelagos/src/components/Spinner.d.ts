import type {FunctionComponent, HTMLProps} from 'react';

interface SpinnerProps extends Omit<HTMLProps<HTMLDivElement>, 'size'> {
	/** The component class name(s). */
	className?: string;
	/** The spinner size. */
	size: 'tiny' | 'small' | 'medium' | 'large';
	/** The element role. */
	role?: string;
	/** The element's aria label. */
	'aria-label'?: string;
}

/** A spinner. */
declare const Spinner: FunctionComponent<SpinnerProps>;
export default Spinner;
