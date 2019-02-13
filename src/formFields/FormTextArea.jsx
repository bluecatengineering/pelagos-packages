import React from 'react';
import PropTypes from 'prop-types';

import Label from '../components/Label';

import FieldError from './FieldError';
import './FormTextArea.less';

const FormTextArea = ({id, className, label, value, placeholder, resize, maxLength, error, onChange}) => {
	id = id || 'e' + ('' + Math.random()).substr(2);
	return (
		<div className={'FormTextArea' + (className ? ' ' + className : '')}>
			<div>
				<Label text={label} htmlFor={id} />
			</div>
			<textarea
				id={id}
				className={
					'FormTextArea__area' + (resize ? '' : ' FormTextArea--noresize') + (error ? ' FormTextArea--error' : '')
				}
				placeholder={placeholder}
				value={value}
				maxLength={maxLength}
				onChange={onChange}
			/>
			<FieldError text={error} />
		</div>
	);
};

FormTextArea.propTypes = {
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

export default FormTextArea;
