import React from 'react';
import PropTypes from 'prop-types';

import Label from '../components/Label';
import Select from '../components/Select';
import './FormDropDown.less';

const FormDropDown = ({className, label, ...props}) => (
	<div className={'FormDropDown' + (className ? ' ' + className : '')}>
		<div>
			<Label text={label} />
		</div>
		<Select {...props} className="FormDropDown__select" />
	</div>
);

FormDropDown.propTypes = {
	id: PropTypes.string,
	componentId: PropTypes.string,
	className: PropTypes.string,
	label: PropTypes.string.isRequired,
	value: PropTypes.string,
	options: PropTypes.array.isRequired,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	error: PropTypes.bool,
	getOptionValue: PropTypes.func,
	renderOption: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default FormDropDown;
