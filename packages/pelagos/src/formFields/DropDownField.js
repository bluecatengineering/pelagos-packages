import PropTypes from 'prop-types';

import Select from '../components/Select';
import useRandomId from '../hooks/useRandomId';

import FieldWrapper from './FieldWrapper';

/** A form field wrapper for [Select](/docs/components-select--docs). */
const DropDownField = ({id, className, label, required, helperText, error, ...props}) => {
	id = useRandomId(id);
	const labelId = `${id}-label`;
	const helperId = `${id}-helper`;
	return (
		<FieldWrapper
			id={labelId}
			className={`DropDownField${className ? ` ${className}` : ''}`}
			label={label}
			required={required}
			helperId={helperId}
			helperText={helperText}
			error={error}>
			<Select
				{...props}
				id={id}
				error={!!error}
				className="DropDownField__select"
				aria-labelledby={labelId}
				aria-describedby={helperId}
				aria-required={required}
				aria-invalid={!!error}
			/>
		</FieldWrapper>
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
	/** Whether the field is required. */
	required: PropTypes.bool,
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
