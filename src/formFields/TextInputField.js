import {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash-es/debounce';

import LabelLine from '../components/LabelLine';

import FieldError from './FieldError';
import './TextInputField.less';

/** A text input field. */
const TextInputField = ({id, className, label, value, optional, error, onChange, ...props}) => {
	id = id || 'e' + ('' + Math.random()).substr(2);
	const debounced = useMemo(() => debounce(onChange, 150), [onChange]);
	return (
		<div className={'TextInputField' + (className ? ' ' + className : '')}>
			<LabelLine htmlFor={id} text={label} optional={optional && !value} />
			<input
				{...props}
				id={id}
				className={'TextInputField__input' + (error ? ' TextInputField--error' : '')}
				value={value}
				onChange={useCallback((event) => debounced(event.target.value), [debounced])}
			/>
			<FieldError text={error} />
		</div>
	);
};

TextInputField.propTypes = {
	/** The component ID. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The label text. */
	label: PropTypes.string.isRequired,
	/** The input type. */
	type: PropTypes.string,
	/** The input name. */
	name: PropTypes.string,
	/** The auto-complete option. */
	autoComplete: PropTypes.string,
	/** The field value. */
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	/** The placeholder text. */
	placeholder: PropTypes.string,
	/** The maximum text length. */
	maxLength: PropTypes.number,
	/** Whether the field focused on display. */
	autoFocus: PropTypes.bool,
	/** Whether the field is disabled. */
	disabled: PropTypes.bool,
	/** Whether the field is optional. */
	optional: PropTypes.bool,
	/** The error text. */
	error: PropTypes.string,
	/** Function invoked when the value changes. */
	onChange: PropTypes.func.isRequired,
};

TextInputField.defaultProps = {
	type: 'text',
};

export default TextInputField;
