import type {ComponentType} from 'react';
import type {TextInputFieldProps} from '@bluecateng/pelagos';

export interface FormTextInputProps extends Omit<TextInputFieldProps, 'value' | 'error' | 'onChange'> {
	/** The form field name used by auto-forms connect HOC */
	name: string;
}

/**
 * A form-connected TextInputField whose value is managed by auto-forms.
 */
declare const FormTextInput: ComponentType<FormTextInputProps>;
export default FormTextInput;
