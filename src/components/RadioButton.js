import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

import './RadioButton.less';

/** A radio button. */
const RadioButton = ({id, className, label, checked, error, tabIndex, onChange, ...props}) => {
	const handleKeyDown = useCallback(
		(event) => (event.keyCode === 32 ? (event.preventDefault(), onChange(event)) : null),
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
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The label text. */
	label: PropTypes.string,
	/** Whether the radio button is checked */
	checked: PropTypes.bool,
	/** Whether the button is in error. */
	error: PropTypes.bool,
	/** The tab index. */
	tabIndex: PropTypes.number,
	/** Function invoked when checked status changes. */
	onChange: PropTypes.func,
};

RadioButton.defaultProps = {
	tabIndex: 0,
};

export default RadioButton;
