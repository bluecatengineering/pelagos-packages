import type {FunctionComponent, HTMLProps} from 'react';

interface LabelLineProps extends HTMLProps<HTMLLabelElement> {
	/** The component id. */
	id?: string;
	/** The identifier of the accompanying element. */
	htmlFor?: string;
	/** The label text. */
	text: string;
	/** The character counter. */
	counter?: string;
	/** Whether to mark the field as required. */
	required?: boolean;
	/** Whether the field is in error. */
	error?: boolean;
}

/** The standard form input label line. */
declare const LabelLine: FunctionComponent<LabelLineProps>;
export default LabelLine;
