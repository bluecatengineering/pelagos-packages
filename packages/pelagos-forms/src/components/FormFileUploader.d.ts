import type {ComponentType} from 'react';
import type {FileUploaderProps} from '@bluecateng/pelagos';

export interface FormFileUploaderProps extends Omit<FileUploaderProps, 'files' | 'error' | 'onChange'> {
	/** The form field name used by auto-forms connect HOC */
	name: string;
}

/**
 * A form-connected FileUploader whose value is managed by auto-forms.
 */
declare const FormFileUploader: ComponentType<FormFileUploaderProps>;
export default FormFileUploader;
