import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

import './Toggle.less';

const Toggle = ({componentId, className, checked, disabled, onChange, ...props}) => {
	const handleKeyDown = useCallback(
		event => (event.keyCode === 32 ? (event.preventDefault(), onChange(event)) : null),
		[onChange]
	);
	return (
		<span
			{...props}
			data-bcn-id={componentId}
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
	id: PropTypes.string,
	componentId: PropTypes.string,
	className: PropTypes.string,
	checked: PropTypes.bool,
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
};

export default Toggle;
