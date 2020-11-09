import {useCallback} from 'react';
import PropTypes from 'prop-types';

import './CheckBox.less';

/* A checkbox. */
const CheckBox = ({id, className, label, checked, disabled, error, onChange}) => {
	const handleClick = useCallback((event) => (disabled ? null : onChange(event)), [disabled, onChange]);

	const handleKeyDown = useCallback(
		(event) => (disabled || event.keyCode !== 32 ? null : (event.preventDefault(), onChange(event))),
		[disabled, onChange]
	);

	return (
		<span
			id={id}
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
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The check box label. */
	label: PropTypes.string,
	/** Whether the box is checked. */
	checked: PropTypes.bool,
	/** Whether the box is disabled. */
	disabled: PropTypes.bool,
	/** Whether the box is in error. */
	error: PropTypes.bool,
	/** Function invoked when the checked status is changed. */
	onChange: PropTypes.func,
};

export default CheckBox;
