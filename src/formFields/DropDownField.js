import PropTypes from 'prop-types';

import Label from '../components/Label';
import Select from '../components/Select';

import FieldError from './FieldError';
import './DropDownField.less';

/** A dropdown field. */
const DropDownField = ({id, className, label, error, ...props}) => {
	id = id || 'e' + ('' + Math.random()).substr(2);
	const labelId = `${id}-label`;
	return (
		<div className={'DropDownField' + (className ? ' ' + className : '')}>
			<div className="DropDownField__label">
				<Label id={labelId} text={label} />
			</div>
			<Select {...props} id={id} error={!!error} className="DropDownField__select" aria-labelledby={labelId} />
			<FieldError text={error} />
		</div>
	);
};

DropDownField.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The field label. */
	label: PropTypes.string.isRequired,
	/** The selected value. */
	value: PropTypes.string,
	/** The options for the dropdown. */
	options: PropTypes.array.isRequired,
	/** The placeholder text when no option is selected. */
	placeholder: PropTypes.string,
	/** Whether the field is disabled. */
	disabled: PropTypes.bool,
	/** The error text. */
	error: PropTypes.string,
	/** Function invoked to get the option's value. */
	getOptionValue: PropTypes.func,
	/** Function invoked to render the options. */
	renderOption: PropTypes.func.isRequired,
	/** Function invoked when the option is changed. */
	onChange: PropTypes.func.isRequired,
};

export default DropDownField;
