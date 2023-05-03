import PropTypes from 'prop-types';

import './Toggle.less';

/** A toggle button. */
const Toggle = ({className, checked, disabled, onChange, ...props}) => (
	<button
		{...props}
		className={`Toggle${className ? ` ${className}` : ''}`}
		type="button"
		role="switch"
		aria-checked={!!checked}
		disabled={disabled}
		onClick={onChange}
	/>
);

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
