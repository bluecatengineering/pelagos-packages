import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

import './CheckBox.less';

const CheckBox = ({id, componentId, className, label, checked, disabled, error, onChange}) => {
	const handleClick = useCallback(event => (disabled ? null : onChange(event)), [disabled, onChange]);

	const handleKeyDown = useCallback(
		event => (disabled || event.keyCode !== 32 ? null : (event.preventDefault(), onChange(event))),
		[disabled, onChange]
	);

	return (
		<span
			id={id}
			data-bcn-id={componentId}
			className={'CheckBox ' + className + (!disabled && error ? ' CheckBox--error' : '')}
			role="checkbox"
			aria-disabled={disabled}
			aria-checked={!!checked}
			tabIndex={disabled ? -1 : 0}
			onClick={handleClick}
			onKeyDown={handleKeyDown}>
			{label}
		</span>
	);
};

CheckBox.propTypes = {
	id: PropTypes.string,
	componentId: PropTypes.string,
	className: PropTypes.string,
	label: PropTypes.string,
	checked: PropTypes.bool,
	disabled: PropTypes.bool,
	error: PropTypes.bool,
	onChange: PropTypes.func,
};

export default CheckBox;
