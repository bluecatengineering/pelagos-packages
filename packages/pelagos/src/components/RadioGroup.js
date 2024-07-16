import {useCallback} from 'react';
import PropTypes from 'prop-types';

import useRandomId from '../hooks/useRandomId';

import RadioButton from './RadioButton';

import './RadioGroup.less';

/** A group of radio buttons. */
const RadioGroup = ({id, className, value, options, renderLabel, onChange, ...props}) => {
	id = useRandomId(id);
	const handleChange = useCallback((event) => onChange(event.target.value), [onChange]);

	const handleKeyDown = useCallback(
		(event) => {
			const keyCode = event.keyCode;
			if (keyCode === 37 || keyCode === 38) {
				const current = options.indexOf(value);
				const focused = current === 0 ? options.length - 1 : current - 1;
				event.currentTarget.childNodes[focused].focus();
				onChange(options[focused]);
				event.preventDefault();
			} else if (keyCode === 39 || keyCode === 40) {
				const current = options.indexOf(value);
				const focused = current === options.length - 1 ? 0 : current + 1;
				event.currentTarget.childNodes[focused].focus();
				onChange(options[focused]);
				event.preventDefault();
			}
		},
		[value, options, onChange]
	);

	return (
		<div
			{...props}
			id={id}
			className={`RadioGroup${className ? ` ${className}` : ''}`}
			role="radiogroup"
			onKeyDown={handleKeyDown}>
			{options.map((option) => (
				<RadioButton
					key={option}
					id={`${id}-${option}`}
					label={renderLabel(option)}
					checked={value === option}
					tabIndex={value === option ? 0 : -1}
					value={option}
					onChange={handleChange}
				/>
			))}
		</div>
	);
};

RadioGroup.propTypes = {
	/** The component ID. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The value of the selected option. */
	value: PropTypes.string,
	/** The list of options. */
	options: PropTypes.arrayOf(PropTypes.string).isRequired,
	/** Function invoked to render each option. */
	renderLabel: PropTypes.func.isRequired,
	/** Function invoked when the selected option changes. */
	onChange: PropTypes.func,
};

export default RadioGroup;
