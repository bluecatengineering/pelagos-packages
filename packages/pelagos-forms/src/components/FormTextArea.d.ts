import type {ComponentType} from 'react';
import type {TextAreaFieldProps} from '@bluecateng/pelagos';

export interface FormTextAreaProps extends Omit<TextAreaFieldProps, 'value' | 'error' | 'onChange'> {
	/** The form field name used by auto-forms connect HOC */
	name: string;
}

/**
 * A form-connected TextAreaField whose value is managed by auto-forms.
 */
declare const FormTextArea: ComponentType<FormTextAreaProps>;
export default FormTextArea;
