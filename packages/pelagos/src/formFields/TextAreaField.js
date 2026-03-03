import PropTypes from 'prop-types';

import useRandomId from '../hooks/useRandomId';

import FieldWrapper from './FieldWrapper';
import TextArea from './TextArea';

import './TextAreaField.less';

/** A text area form field. */
const TextAreaField = ({
	id,
	className,
	label,
	value,
	required,
	maxLength,
	showCounter,
	helperText,
	error,
	onChange,
	...props
}) => {
	id = useRandomId(id);
	const helperId = `${id}-helper`;
	return (
		<FieldWrapper
			className={`TextAreaField${className ? ` ${className}` : ''}`}
			htmlFor={id}
			label={label}
			counter={showCounter && maxLength ? `${value.length}/${maxLength}` : null}
			required={required}
			helperId={helperId}
			helperText={helperText}
			error={error}>
			<TextArea
				{...props}
				id={id}
				value={value}
				maxLength={maxLength}
				required={required}
				error={!!error}
				aria-describedby={helperId}
				onChange={onChange}
			/>
		</FieldWrapper>
	);
};

TextAreaField.propTypes = {
	/** The component ID. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The label text. */
	label: PropTypes.string.isRequired,
	/** The field value. */
	value: PropTypes.string,
	/** The placeholder text. */
	placeholder: PropTypes.string,
	/** Whether the field is required. */
	required: PropTypes.bool,
	/** Whether the field can be resized. */
	resize: PropTypes.bool,
	/** The maximum text length. */
	maxLength: PropTypes.number,
	/** Whether to show the character counter, requires `maxLength` to be set. */
	showCounter: PropTypes.bool,
	/** Additional information for the field. */
	helperText: PropTypes.string,
	/** The error text. */
	error: PropTypes.string,
	/** Function invoked when the value changes. */
	onChange: PropTypes.func.isRequired,
};

export default TextAreaField;
