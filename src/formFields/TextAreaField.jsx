import React from 'react';
import PropTypes from 'prop-types';

import Label from '../components/Label';

import FieldError from './FieldError';
import './TextAreaField.less';

const TextAreaField = ({id, className, label, resize, error, ...props}) => {
	id = id || 'e' + ('' + Math.random()).substr(2);
	return (
		<div className={'TextAreaField' + (className ? ' ' + className : '')}>
			<div>
				<Label text={label} htmlFor={id} />
			</div>
			<textarea
				{...props}
				id={id}
				className={
					'TextAreaField__area' + (resize ? '' : ' TextAreaField--noresize') + (error ? ' TextAreaField--error' : '')
				}
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
	resize: PropTypes.bool,
	maxLength: PropTypes.number,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

export default TextAreaField;
