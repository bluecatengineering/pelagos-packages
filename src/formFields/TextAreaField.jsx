import React from 'react';
import PropTypes from 'prop-types';

import Label from '../components/Label';

import FieldError from './FieldError';
import './TextAreaField.less';

const TextAreaField = ({id, className, label, value, optionalText, resize, error, ...props}) => {
	id = id || 'e' + ('' + Math.random()).substr(2);
	return (
		<div className={'TextAreaField' + (className ? ' ' + className : '')}>
			<div className="TextAreaField__label">
				<Label text={label} htmlFor={id} />
				{optionalText && !value && <span className="TextAreaField__optional">{optionalText}</span>}
			</div>
			<textarea
				{...props}
				id={id}
				className={
					'TextAreaField__area' + (resize ? '' : ' TextAreaField--noresize') + (error ? ' TextAreaField--error' : '')
				}
				value={value}
			/>
			<FieldError text={error} />
		</div>
	);
};

TextAreaField.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	label: PropTypes.string.isRequired,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	optionalText: PropTypes.string,
	resize: PropTypes.bool,
	maxLength: PropTypes.number,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

export default TextAreaField;
