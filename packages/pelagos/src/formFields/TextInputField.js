import {useCallback} from 'react';
import PropTypes from 'prop-types';

import Layer from '../components/Layer';
import useRandomId from '../hooks/useRandomId';

import FieldWrapper from './FieldWrapper';

import './TextInputField.less';

/** A text input form field. */
const TextInputField = ({
	id,
	className,
	label,
	type = 'text',
	value,
	required,
	helperText,
	error,
	onChange,
	...props
}) => {
	id = useRandomId(id);
	const helperId = `${id}-helper`;
	return (
		<FieldWrapper
			className={`TextInputField${className ? ` ${className}` : ''}`}
			htmlFor={id}
			label={label}
			required={required}
			helperId={helperId}
			helperText={helperText}
			error={error}>
			<Layer
				{...props}
				as="input"
				id={id}
				className={`TextInputField__input${error ? ' TextInputField--error' : ''}`}
				type={type}
				value={value}
				aria-describedby={helperId}
				aria-required={required}
				aria-invalid={!!error}
				onChange={useCallback((event) => onChange(event.target.value), [onChange])}
			/>
		</FieldWrapper>
	);
};

TextInputField.propTypes = {
	/** The component ID. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The label text. */
	label: PropTypes.string.isRequired,
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
	/** Additional information for the field. */
	helperText: PropTypes.string,
	/** The error text. */
	error: PropTypes.string,
	/** Function invoked when the value changes. */
	onChange: PropTypes.func.isRequired,
};

export default TextInputField;
