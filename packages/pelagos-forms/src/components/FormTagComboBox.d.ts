import type {ReactElement} from 'react';
import type {TagComboBoxFieldProps} from '@bluecateng/pelagos';

export interface FormTagComboBoxProps<T>
	extends Omit<TagComboBoxFieldProps<T>, 'tags' | 'error' | 'onChange' | 'onError'> {
	/** The form field name used by auto-forms connect HOC */
	name: string;
}

/**
 * A form-connected TagComboBoxField whose value is managed by auto-forms.
 */
declare const FormTagComboBox: <T>(props: FormTagComboBoxProps<T>) => ReactElement;
export default FormTagComboBox;
