import type {ComponentType} from 'react';
import type {RadioGroupProps} from '@bluecateng/pelagos';

export interface FormRadioGroupProps extends Omit<RadioGroupProps, 'value' | 'onChange'> {
	/** The form field name used by auto-forms connect HOC */
	name: string;
}

/**
 * A form-connected RadioGroup whose value is managed by auto-forms.
 */
declare const FormRadioGroup: ComponentType<FormRadioGroupProps>;
export default FormRadioGroup;
