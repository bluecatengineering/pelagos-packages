import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

import RadioButton from './RadioButton';

const RadioGroup = ({id, value, options, renderLabel, onChange, ...props}) => {
	const handleChange = useCallback((event) => onChange(event.target.dataset.value), [onChange]);

	const handleKeyDown = useCallback(
		(event) => {
			const keyCode = event.keyCode;
			if (keyCode === 37 || keyCode === 38) {
				const current = options.indexOf(value);
				const focused = current === 0 ? options.length - 1 : current - 1;
				event.currentTarget.childNodes[focused].focus();
				onChange(options[focused]);
			} else if (keyCode === 39 || keyCode === 40) {
				const current = options.indexOf(value);
				const focused = current === options.length - 1 ? 0 : current + 1;
				event.currentTarget.childNodes[focused].focus();
				onChange(options[focused]);
			}
		},
		[value, options, onChange]
	);

	return (
		<div {...props} id={id} role="radiogroup" onKeyDown={handleKeyDown}>
			{options.map((option) => (
				<RadioButton
					key={option}
					id={`${id}-${option}`}
					label={renderLabel(option)}
					checked={value === option}
					tabIndex={value === option ? 0 : -1}
					data-value={option}
					onChange={handleChange}
				/>
			))}
		</div>
	);
};

RadioGroup.propTypes = {
	id: PropTypes.string.isRequired,
	value: PropTypes.string,
	options: PropTypes.array.isRequired,
	renderLabel: PropTypes.func.isRequired,
	onChange: PropTypes.func,
};

export default RadioGroup;
