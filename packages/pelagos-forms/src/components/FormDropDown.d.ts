import type {ReactElement} from 'react';
import type {DropDownFieldProps} from '@bluecateng/pelagos';

export interface FormDropDownProps<T> extends Omit<DropDownFieldProps<T>, 'value' | 'error' | 'onChange'> {
	/** The form field name used by auto-forms connect HOC */
	name: string;
}

/**
 * A form-connected DropDownField whose value is managed by auto-forms.
 */
declare const FormDropDown: <T>(props: FormDropDownProps<T>) => ReactElement;
export default FormDropDown;
