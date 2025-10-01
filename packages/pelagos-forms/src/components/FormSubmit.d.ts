import type {ComponentType} from 'react';
import type {ButtonProps} from '@bluecateng/pelagos';

/**
 * A submit button that adapts its visual `type` based on form dirty state.
 * The underlying Button's `type` prop is controlled internally.
 */
declare const FormSubmit: ComponentType<Omit<ButtonProps, 'type'>>;
export default FormSubmit;
