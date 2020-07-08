import React from 'react';
import PropTypes from 'prop-types';

import LabelLine from '../components/LabelLine';

import FieldError from './FieldError';
import './TextInputField.less';

const TextInputField = ({id, className, label, value, optionalText, error, ...props}) => {
	id = id || 'e' + ('' + Math.random()).substr(2);
	return (
		<div className={'TextInputField' + (className ? ' ' + className : '')}>
			<LabelLine htmlFor={id} text={label} optionalText={optionalText} showOptionalText={!value} />
			<input
				{...props}
				id={id}
				className={'TextInputField__input' + (error ? ' TextInputField--error' : '')}
				value={value}
			/>
			<FieldError text={error} />
		</div>
	);
};

TextInputField.propTypes = {
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

TextInputField.defaultProps = {
	type: 'text',
};

export default TextInputField;
