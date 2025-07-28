import type {FunctionComponent, HTMLProps} from 'react';

interface ModalSpinnerProps extends HTMLProps<HTMLDivElement> {
	/** The component id. */
	id?: string;
}

/** A modal spinner. */
declare const ModalSpinner: FunctionComponent<ModalSpinnerProps>;
export default ModalSpinner;
