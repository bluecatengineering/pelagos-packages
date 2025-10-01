import type {ReactElement} from 'react';
import type {ListInputProps} from '@bluecateng/pelagos';

export interface FormListInputProps<T>
	extends Omit<ListInputProps<T>, 'list' | 'error' | 'onListChange' | 'onTextChange' | 'onErrorChange'> {
	/** The form field name used by auto-forms connect HOC */
	name: string;
}

/**
 * A form-connected ListInput whose value is managed by auto-forms.
 */
declare const FormListInput: <T>(props: FormListInputProps<T>) => ReactElement;
export default FormListInput;
