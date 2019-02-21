import React from 'react';
import PropTypes from 'prop-types';

import Label from '../components/Label';

import FieldError from './FieldError';
import './FormTextInput.less';

const FormTextInput = ({id, className, label, value, optionalText, error, ...props}) => {
	id = id || 'e' + ('' + Math.random()).substr(2);
	return (
		<div className={'FormTextInput' + (className ? ' ' + className : '')}>
			<div className="FormTextInput__label">
				<Label text={label} htmlFor={id} />
				{optionalText && !value ? <span className="FormTextInput__optional">{optionalText}</span> : null}
			</div>
			<input
				{...props}
				id={id}
				className={'FormTextInput__input' + (error ? ' FormTextInput--error' : '')}
				value={value}
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
