import type {FunctionComponent, HTMLProps} from 'react';

interface FieldErrorProps extends HTMLProps<HTMLDivElement> {
	/** The component id. */
	id?: string;
	/** The error text. */
	text?: string | null;
}

/** @deprecated use FieldHelper with an error message. */
declare const FieldError: FunctionComponent<FieldErrorProps>;
export default FieldError;
