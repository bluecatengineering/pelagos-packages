import {useCallback} from 'react';
import PropTypes from 'prop-types';

import Layer from '../components/Layer';
import useRandomId from '../hooks/useRandomId';

import FieldWrapper from './FieldWrapper';
import './TextAreaField.less';

/** A text area form field. */
const TextAreaField = ({
	id,
	className,
	label,
	value,
	required,
	resize,
	maxLength,
	showCounter,
	helperText,
	error,
	onChange,
	...props
}) => {
	id = useRandomId(id);
	const helperId = `${id}-helper`;
	return (
		<FieldWrapper
			className={`TextAreaField${className ? ` ${className}` : ''}`}
			htmlFor={id}
			label={label}
			counter={showCounter && maxLength ? `${value.length}/${maxLength}` : null}
			required={required}
			helperId={helperId}
			helperText={helperText}
			error={error}>
			<Layer
				{...props}
				as="textarea"
				id={id}
				className={`TextAreaField__area${resize ? '' : ' TextAreaField--noresize'}${
					error ? ' TextAreaField--error' : ''
				}`}
				value={value}
				maxLength={maxLength}
				aria-describedby={helperId}
				aria-required={required}
				aria-invalid={!!error}
				onChange={useCallback((event) => onChange(event.target.value), [onChange])}
			/>
		</FieldWrapper>
	);
};

TextAreaField.propTypes = {
	/** The component ID. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The label text. */
	label: PropTypes.string.isRequired,
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
	/** Whether to show the character counter, requires `maxLength` to be set. */
	showCounter: PropTypes.bool,
	/** Additional information for the field. */
	helperText: PropTypes.string,
	/** The error text. */
	error: PropTypes.string,
	/** Function invoked when the value changes. */
	onChange: PropTypes.func.isRequired,
};

export default TextAreaField;
