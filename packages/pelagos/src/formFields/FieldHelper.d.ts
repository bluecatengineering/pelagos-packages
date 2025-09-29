import type {FunctionComponent, HTMLProps} from 'react';

interface FieldHelperProps extends HTMLProps<HTMLDivElement> {
	/** The component id. */
	id?: string;
	/** The helper text. */
	text?: string | null;
	/** The error text. */
	error?: string | null;
}

/** A field helper which displays either a helper text or an error message. */
declare const FieldHelper: FunctionComponent<FieldHelperProps>;
export default FieldHelper;
