import {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash-es/debounce';

import Layer from '../components/Layer';
import LabelLine from '../components/LabelLine';
import useRandomId from '../hooks/useRandomId';

import FieldError from './FieldError';
import FieldHelper from './FieldHelper';
import './TextAreaField.less';

/** A text area field. */
const TextAreaField = ({id, className, label, value, required, resize, helperText, error, onChange, ...props}) => {
	id = useRandomId(id);
	const helperId = `${id}-helper`;
	const errorId = `${id}-error`;
	const debounced = useMemo(() => debounce(onChange, 33), [onChange]);
	return (
		<Layer className={'TextAreaField' + (className ? ' ' + className : '')}>
			<LabelLine htmlFor={id} text={label} required={required} error={!!error} />
			<textarea
				{...props}
				id={id}
				className={
					'TextAreaField__area' + (resize ? '' : ' TextAreaField--noresize') + (error ? ' TextAreaField--error' : '')
				}
				value={value}
				aria-describedby={error ? errorId : helperId}
				aria-required={required}
				aria-invalid={!!error}
				onChange={useCallback((event) => debounced(event.target.value), [debounced])}
			/>
			{error ? <FieldError id={errorId} text={error} /> : <FieldHelper id={helperId} text={helperText} />}
		</Layer>
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
	/** Additional information for the field. */
	helperText: PropTypes.string,
	/** The error text. */
	error: PropTypes.string,
	/** Function invoked when the value changes. */
	onChange: PropTypes.func.isRequired,
};

export default TextAreaField;
