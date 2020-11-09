import {useCallback} from 'react';
import PropTypes from 'prop-types';

import LabelLine from '../components/LabelLine';

import FieldError from './FieldError';
import './TextAreaField.less';

const TextAreaField = ({id, className, label, value, optional, resize, error, onChange, ...props}) => {
	id = id || 'e' + ('' + Math.random()).substr(2);
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
				onChange={useCallback((event) => onChange(event.target.value), [onChange])}
			/>
			<FieldError text={error} />
		</div>
	);
};

TextAreaField.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	label: PropTypes.string.isRequired,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	optional: PropTypes.bool,
	resize: PropTypes.bool,
	maxLength: PropTypes.number,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

export default TextAreaField;
