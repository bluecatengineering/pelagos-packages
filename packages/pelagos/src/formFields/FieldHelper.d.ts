import type {FunctionComponent, HTMLProps} from 'react';

interface FieldHelperProps extends HTMLProps<HTMLDivElement> {
	/** The component id. */
	id?: string;
	/** The helper text. */
	text?: string | null;
}

/** A helper text. */
declare const FieldHelper: FunctionComponent<FieldHelperProps>;
export default FieldHelper;
