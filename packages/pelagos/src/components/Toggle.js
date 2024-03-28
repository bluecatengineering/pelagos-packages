import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';

import './Toggle.less';

/** A toggle button. */
const Toggle = ({className, checked, disabled, labelOn = t`On`, labelOff = t`Off`, onChange, ...props}) => (
	<button
		{...props}
		className={`Toggle${className ? ` ${className}` : ''}`}
		type="button"
		role="switch"
		aria-checked={!!checked}
		disabled={disabled}
		onClick={onChange}>
		<span className="Toggle__switch" />
		<span className="Toggle__actionText" aria-hidden="true">
			{checked ? labelOn : labelOff}
		</span>
	</button>
);

Toggle.propTypes = {
	/** The component ID. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The label for the "on" position. */
	labelOn: PropTypes.string,
	/** The label for the "off" position. */
	labelOff: PropTypes.string,
	/** Whether the toggle is checked */
	checked: PropTypes.bool,
	/** Whether the toggle is disabled */
	disabled: PropTypes.bool,
	/** Function invoked when checked status changes. */
	onChange: PropTypes.func,
};

export default Toggle;
