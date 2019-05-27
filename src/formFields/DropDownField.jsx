import React from 'react';
import PropTypes from 'prop-types';

import Label from '../components/Label';
import Select from '../components/Select';

import FieldError from './FieldError';
import './DropDownField.less';

const DropDownField = ({id, className, label, error, ...props}) => {
	id = id || 'e' + ('' + Math.random()).substr(2);
	return (
		<div className={'DropDownField' + (className ? ' ' + className : '')}>
			<div>
				<Label text={label} htmlFor={id} />
			</div>
			<Select {...props} id={id} error={!!error} className="DropDownField__select" />
			<FieldError text={error} />
		</div>
	);
};

DropDownField.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	label: PropTypes.string.isRequired,
	value: PropTypes.string,
	options: PropTypes.array.isRequired,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	error: PropTypes.string,
	getOptionValue: PropTypes.func,
	renderOption: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default DropDownField;
