import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

import './RadioButton.less';

const RadioButton = ({id, className, label, checked, error, tabIndex, onChange, ...props}) => {
	const handleKeyDown = useCallback(
		event => (event.keyCode === 32 ? (event.preventDefault(), onChange(event)) : null),
		[onChange]
	);
	return (
		<span
			{...props}
			id={id}
			className={'RadioButton ' + className + (error ? ' RadioButton--error' : '')}
			role="radio"
			aria-checked={!!checked}
			tabIndex={tabIndex}
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
	tabIndex: PropTypes.number,
	onChange: PropTypes.func,
};

RadioButton.defaultProps = {
	tabIndex: 0,
};

export default RadioButton;
