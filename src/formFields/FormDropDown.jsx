import React from 'react';
import PropTypes from 'prop-types';

import Label from '../components/Label';
import Select from '../components/Select';
import './FormDropDown.less';

const FormDropDown = ({
	componentId,
	className,
	label,
	value,
	options,
	placeholder,
	disabled,
	error,
	getOptionValue,
	renderOption,
	onChange,
}) => (
	<div className={'FormDropDown' + (className ? ' ' + className : '')}>
		<div>
			<Label text={label} />
		</div>
		<Select
			componentId={componentId}
			className="FormDropDown__select"
			value={value}
			options={options}
			placeholder={placeholder}
			disabled={disabled}
			error={error}
			getOptionValue={getOptionValue}
			renderOption={renderOption}
			onChange={onChange}
		/>
	</div>
);

FormDropDown.propTypes = {
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
