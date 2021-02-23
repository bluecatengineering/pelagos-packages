import {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash-es/debounce';

import LabelLine from '../components/LabelLine';

import FieldError from './FieldError';
import './TextAreaField.less';

/** A text area field. */
const TextAreaField = ({id, className, label, value, optional, resize, error, onChange, ...props}) => {
	id = id || 'e' + ('' + Math.random()).substr(2);
	const debounced = useMemo(() => debounce(onChange, 33), [onChange]);
	return (
		<div className={'TextAreaField' + (className ? ' ' + className : '')}>
			<LabelLine htmlFor={id} text={label} optional={optional && !value} />
			<textarea
				{...props}
				id={id}
				className={
					'TextAreaField__area' + (resize ? '' : ' TextAreaField--noresize') + (error ? ' TextAreaField--error' : '')
				}
				value={value}
				onChange={useCallback((event) => debounced(event.target.value), [debounced])}
			/>
			<FieldError text={error} />
		</div>
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
	/** Whether the field is optional. */
	optional: PropTypes.bool,
	/** Whether the field can be resized. */
	resize: PropTypes.bool,
	/** The maximum text length. */
	maxLength: PropTypes.number,
	/** The error text. */
	error: PropTypes.string,
	/** Function invoked when the value changes. */
	onChange: PropTypes.func.isRequired,
};

export default TextAreaField;
