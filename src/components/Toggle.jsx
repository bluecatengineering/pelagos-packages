import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

import './Toggle.less';

const Toggle = ({componentId, className, ariaLabel, checked, disabled, onChange}) => {
	const handleKeyDown = useCallback(
		event => (event.keyCode === 32 ? (event.preventDefault(), onChange(event)) : null),
		[onChange]
	);
	return (
		<span
			data-bcn-id={componentId}
			className={'Toggle ' + className}
			role="checkbox"
			aria-label={ariaLabel}
			aria-checked={!!checked}
			aria-disabled={disabled}
			tabIndex={disabled ? -1 : 0}
			onClick={onChange}
			onKeyDown={handleKeyDown}
		/>
	);
};

Toggle.propTypes = {
	componentId: PropTypes.string,
	className: PropTypes.string,
	ariaLabel: PropTypes.string,
	checked: PropTypes.bool,
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
};

export default Toggle;
