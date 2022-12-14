import PropTypes from 'prop-types';

import Label from '../components/Label';
import Select from '../components/Select';
import useRandomId from '../hooks/useRandomId';

import FieldError from './FieldError';
import FieldHelper from './FieldHelper';
import './DropDownField.less';

/** A dropdown field. */
const DropDownField = ({id, className, label, helperText, error, ...props}) => {
	id = useRandomId(id);
	const labelId = `${id}-label`;
	const helperId = `${id}-helper`;
	const errorId = `${id}-error`;
	return (
		<div className={'DropDownField' + (className ? ' ' + className : '')}>
			<div className="DropDownField__label">
				<Label id={labelId} text={label} />
			</div>
			<Select
				{...props}
				id={id}
				error={!!error}
				className="DropDownField__select"
				aria-labelledby={labelId}
				aria-describedby={error ? errorId : helperId}
			/>
			{error ? <FieldError id={errorId} text={error} /> : <FieldHelper id={helperId} text={helperText} />}
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
	value: PropTypes.any,
	/** The options for the dropdown. */
	options: PropTypes.array.isRequired,
	/** The placeholder text when no option is selected. */
	placeholder: PropTypes.string,
	/** Whether the field is disabled. */
	disabled: PropTypes.bool,
	/** Additional information for the field. */
	helperText: PropTypes.string,
	/** The error text. */
	error: PropTypes.string,
	/** Function invoked to get the key of each option. */
	getOptionKey: PropTypes.func,
	/** Function invoked to render the options. */
	renderOption: PropTypes.func.isRequired,
	/** Function invoked when the option is changed. */
	onChange: PropTypes.func.isRequired,
};

export default DropDownField;
