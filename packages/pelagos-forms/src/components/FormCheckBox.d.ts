import type {ComponentType} from 'react';
import type {CheckBoxProps} from '@bluecateng/pelagos';

export interface FormCheckBoxProps extends Omit<CheckBoxProps, 'checked' | 'onChange'> {
	/** The form field name used by auto-forms connect HOC */
	name: string;
}

/**
 * A form-connected CheckBox whose checked state is managed by auto-forms.
 */
declare const FormCheckBox: ComponentType<FormCheckBoxProps>;
export default FormCheckBox;
