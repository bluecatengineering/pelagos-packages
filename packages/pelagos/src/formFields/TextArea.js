import {useCallback} from 'react';
import PropTypes from 'prop-types';

import Layer from '../components/Layer';

import './TextAreaField.less';

/** A text area input. */
const TextAreaField = ({className, required, resize, error, onChange, ...props}) => (
	<Layer
		{...props}
		as="textarea"
		className={`TextAreaField__area${resize ? '' : ' TextAreaField--noresize'}${
			error ? ' TextAreaField--error' : ''
		}${className ? ` ${className}` : ''}`}
		aria-required={required}
		aria-invalid={error}
		onChange={useCallback((event) => onChange(event.target.value), [onChange])}
	/>
);

TextAreaField.propTypes = {
	/** The component ID. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The field value. */
	value: PropTypes.string,
	/** The placeholder text. */
	placeholder: PropTypes.string,
	/** Whether the field is required. */
	required: PropTypes.bool,
	/** Whether the field can be resized. */
	resize: PropTypes.bool,
	/** The maximum text length. */
	maxLength: PropTypes.number,
	/** Whether the component is in error. */
	error: PropTypes.bool,
	/** Function invoked when the value changes. */
	onChange: PropTypes.func.isRequired,
};

export default TextAreaField;
