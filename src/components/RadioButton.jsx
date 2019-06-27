import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

import './RadioButton.less';

const RadioButton = ({id, className, label, checked, error, onChange}) => {
	const handleKeyDown = useCallback(
		event => (event.keyCode === 32 ? (event.preventDefault(), onChange(event)) : null),
		[onChange]
	);
	return (
		<span
			id={id}
			className={'RadioButton ' + className + (error ? ' RadioButton--error' : '')}
			role="radio"
			aria-checked={!!checked}
			tabIndex="0"
			onClick={onChange}
			onKeyDown={handleKeyDown}>
			{label}
		</span>
	);
};

RadioButton.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	label: PropTypes.string,
	checked: PropTypes.bool,
	error: PropTypes.bool,
	onChange: PropTypes.func,
};

export default RadioButton;
