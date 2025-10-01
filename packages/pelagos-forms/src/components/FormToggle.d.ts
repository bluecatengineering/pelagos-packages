import type {ComponentType} from 'react';
import type {ToggleFieldProps} from '@bluecateng/pelagos';

export interface FormToggleProps extends Omit<ToggleFieldProps, 'value' | 'onChange'> {
	/** The form field name used by auto-forms connect HOC */
	name: string;
}

/**
 * A form-connected ToggleField whose value is managed by auto-forms.
 */
declare const FormToggle: ComponentType<FormToggleProps>;
export default FormToggle;
