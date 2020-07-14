import React from 'react';
import PropTypes from 'prop-types';

import LabelLine from '../components/LabelLine';

import FieldError from './FieldError';
import './TextAreaField.less';

const TextAreaField = ({id, className, label, value, optional, optionalText, resize, error, ...props}) => {
	id = id || 'e' + ('' + Math.random()).substr(2);
	return (
		<div className={'TextAreaField' + (className ? ' ' + className : '')}>
			<LabelLine
				htmlFor={id}
				text={label}
				optional={optional && !value}
				optionalText={optionalText}
				showOptionalText={!value}
			/>
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
	/** @deprecated use optional instead. */
	optionalText: PropTypes.string,
	optional: PropTypes.bool,
	resize: PropTypes.bool,
	maxLength: PropTypes.number,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

export default TextAreaField;
