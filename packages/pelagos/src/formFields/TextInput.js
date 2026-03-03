import {useCallback} from 'react';
import PropTypes from 'prop-types';

import Layer from '../components/Layer';

import './TextInputField.less';

/** A text input. */
const TextInputField = ({className, type = 'text', required, error, onChange, ...props}) => (
	<Layer
		{...props}
		as="input"
		className={`TextInputField__input${error ? ' TextInputField--error' : ''}${className ? ` ${className}` : ''}`}
		type={type}
		aria-required={required}
		aria-invalid={error}
		onChange={useCallback((event) => onChange(event.target.value), [onChange])}
	/>
);

TextInputField.propTypes = {
	/** The component ID. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The input type. */
	type: PropTypes.string,
	/** The input name. */
	name: PropTypes.string,
	/** The auto-complete option. */
	autoComplete: PropTypes.string,
	/** The field value. */
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	/** The placeholder text. */
	placeholder: PropTypes.string,
	/** The maximum text length. */
	maxLength: PropTypes.number,
	/** Whether the field focused on display. */
	autoFocus: PropTypes.bool,
	/** Whether the field is disabled. */
	disabled: PropTypes.bool,
	/** Whether the field is required. */
	required: PropTypes.bool,
	/** Whether the component is in error. */
	error: PropTypes.bool,
	/** Function invoked when the value changes. */
	onChange: PropTypes.func.isRequired,
};

export default TextInputField;
