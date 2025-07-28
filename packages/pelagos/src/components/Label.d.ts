import type {FunctionComponent, HTMLProps} from 'react';

interface LabelProps extends HTMLProps<HTMLLabelElement> {
	/** The component id. */
	id?: string;
	/** The identifier of the accompanying element. */
	htmlFor?: string;
	/** The label text. */
	text: string;
}

/** A label. */
declare const Label: FunctionComponent<LabelProps>;
export default Label;
