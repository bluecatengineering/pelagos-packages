import {useCallback} from 'react';
import PropTypes from 'prop-types';

import Layer from './Layer';
import './Toggle.less';

/** A toggle button. */
const Toggle = ({className, checked, disabled, onChange, ...props}) => {
	const handleKeyDown = useCallback(
		(event) => (event.keyCode === 32 ? (event.preventDefault(), onChange(event)) : null),
		[onChange]
	);
	return (
		<Layer
			{...props}
			as="span"
			className={'Toggle ' + className}
			role="checkbox"
			aria-checked={!!checked}
			aria-disabled={disabled}
			tabIndex={disabled ? -1 : 0}
			onClick={disabled ? undefined : onChange}
			onKeyDown={disabled ? undefined : handleKeyDown}
		/>
	);
};

Toggle.propTypes = {
	/** The component ID. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** Whether the toggle is checked */
	checked: PropTypes.bool,
	/** Whether the toggle is disabled */
	disabled: PropTypes.bool,
	/** Function invoked when checked status changes. */
	onChange: PropTypes.func,
};

export default Toggle;
