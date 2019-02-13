import React from 'react';
import PropTypes from 'prop-types';

import Label from '../components/Label';

import FieldError from './FieldError';
import './FormTextInput.less';

const FormTextInput = ({
	id,
	className,
	label,
	type,
	name,
	autoComplete,
	value,
	placeholder,
	maxLength,
	autoFocus,
	disabled,
	optionalText,
	error,
	onChange,
}) => {
	id = id || 'e' + ('' + Math.random()).substr(2);
	return (
		<div className={'FormTextInput' + (className ? ' ' + className : '')}>
			<div>
				<Label text={label} htmlFor={id} />
				{optionalText && !value ? <span className="FormTextInput__optional">{optionalText}</span> : null}
			</div>
			<input
				type={type}
				id={id}
				className={'FormTextInput__input' + (error ? ' FormTextInput--error' : '')}
				name={name}
				autoComplete={autoComplete}
				placeholder={placeholder}
				value={value}
				maxLength={maxLength}
				autoFocus={autoFocus}
				disabled={disabled}
				onChange={onChange}
			/>
			<FieldError text={error} />
		</div>
	);
};

FormTextInput.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	label: PropTypes.string.isRequired,
	type: PropTypes.string,
	name: PropTypes.string,
	autoComplete: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	placeholder: PropTypes.string,
	maxLength: PropTypes.number,
	autoFocus: PropTypes.bool,
	disabled: PropTypes.bool,
	optionalText: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

FormTextInput.defaultProps = {
	type: 'text',
};

export default FormTextInput;
