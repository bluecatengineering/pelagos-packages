import PropTypes from 'prop-types';

import DateInput from '../components/DateInput';
import useRandomId from '../hooks/useRandomId';

import FieldWrapper from './FieldWrapper';

/** A form field wrapper for [DateInput](/docs/components-dateinput--docs). */
const DateInputField = ({id, className, label, required, helperText, error, ...props}) => {
	id = useRandomId(id);
	const helperId = `${id}-helper`;
	return (
		<FieldWrapper
			className={`DateInputField${className ? ` ${className}` : ''}`}
			htmlFor={id}
			label={label}
			required={required}
			helperId={helperId}
			helperText={helperText}
			error={error}>
			<DateInput
				{...props}
				id={id}
				error={!!error}
				aria-describedby={helperId}
				aria-required={required}
				aria-invalid={!!error}
			/>
		</FieldWrapper>
	);
};

DateInputField.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The field label. */
	label: PropTypes.string.isRequired,
	/** The field value. */
	value: PropTypes.string,
	/** The placeholder text. */
	placeholder: PropTypes.string,
	/** Whether the field should be focused on display. */
	autoFocus: PropTypes.bool,
	/** Whether the field is disabled. */
	disabled: PropTypes.bool,
	/** Whether the field is required. */
	required: PropTypes.bool,
	/** Additional information for the field. */
	helperText: PropTypes.string,
	/** The error text. */
	error: PropTypes.string,
	/** Function invoked to format the date selected form the calendar. */
	format: PropTypes.func.isRequired,
	/** Function invoked to parse the value to pass to the calendar, must return null if the value is not valid. */
	parse: PropTypes.func.isRequired,
	/** Function invoked when the value changes. */
	onChange: PropTypes.func.isRequired,
};

export default DateInputField;
