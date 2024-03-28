import PropTypes from 'prop-types';

import './Toggle.less';

/** A toggle button. */
const Toggle = ({className, checked, disabled, getSideLabel, onChange, ...props}) => (
	<div className="Toggle">
		<button
			{...props}
			className={`Toggle__btn${className ? ` ${className}` : ''}`}
			type="button"
			role="switch"
			aria-checked={!!checked}
			disabled={disabled}
			onClick={onChange}
		/>
		<span className="Toggle__sideLabel">{getSideLabel(checked)}</span>
	</div>
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
	/** Function invoked to get side label when checked status changes. */
	getSideLabel: PropTypes.func,
	/** Function invoked when checked status changes. */
	onChange: PropTypes.func,
};

export default Toggle;
