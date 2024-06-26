import PropTypes from 'prop-types';

import './RadioButton.less';

/** A radio button. */
const RadioButton = ({className, label, error, tabIndex = 0, ...props}) => (
	<label className={`RadioButton${className ? ` ${className}` : ''}`}>
		<input {...props} className={error ? 'error' : ''} type="radio" tabIndex={tabIndex} aria-invalid={error} />
		{label}
	</label>
);

RadioButton.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The label text. */
	label: PropTypes.node,
	/** Whether the radio button is checked */
	checked: PropTypes.bool,
	/** Whether the button is in error. */
	error: PropTypes.bool,
	/** The tab index. */
	tabIndex: PropTypes.number,
	/** Function invoked when checked status changes. */
	onChange: PropTypes.func,
};

export default RadioButton;
