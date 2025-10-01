import type {ComponentType} from 'react';
import type {DateInputFieldProps} from '@bluecateng/pelagos';

export interface FormDateInputProps extends Omit<DateInputFieldProps, 'value' | 'error' | 'onChange'> {
	/** The form field name used by auto-forms connect HOC */
	name: string;
}

/**
 * A form-connected DateInputField whose value is managed by auto-forms.
 */
declare const FormDateInput: ComponentType<FormDateInputProps>;
export default FormDateInput;
