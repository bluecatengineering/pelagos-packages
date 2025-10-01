import type {ComponentType} from 'react';
import type {TagInputFieldProps} from '@bluecateng/pelagos';

export interface FormTagInputProps extends Omit<TagInputFieldProps, 'tags' | 'error' | 'onChange' | 'onError'> {
	/** The form field name used by auto-forms connect HOC */
	name: string;
}

/**
 * A form-connected TagInputField whose value is managed by auto-forms.
 */
declare const FormTagInput: ComponentType<FormTagInputProps>;
export default FormTagInput;
