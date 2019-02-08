import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

import './RadioButton.less';

const RadioButton = ({componentId, className, label, checked, error, onChange}) => {
	const handleKeyDown = useCallback(
		event => (event.keyCode === 32 ? (event.preventDefault(), onChange(event)) : null),
		[onChange]
	);
	return (
		<span
			data-bcn-id={componentId}
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
	componentId: PropTypes.string,
	className: PropTypes.string,
	label: PropTypes.string,
	checked: PropTypes.bool,
	error: PropTypes.bool,
	onChange: PropTypes.func,
};

export default RadioButton;
