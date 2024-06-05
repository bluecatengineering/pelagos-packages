import PropTypes from 'prop-types';
import {t} from '@bluecateng/l10n.macro';

import './Spinner.less';

/** A spinner. */
const Spinner = ({className, size = 'medium', role = 'status', 'aria-label': ariaLabel = t`Loading`, ...props}) => (
	<div
		{...props}
		className={'Spinner CssSpinner Spinner--' + size + (className ? ' ' + className : '')}
		role={role}
		aria-label={ariaLabel}
	/>
);

Spinner.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The spinner size. */
	size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large']),
	/** The element role. */
	role: PropTypes.string,
	/** The element's aria label. */
	'aria-label': PropTypes.string,
};

export default Spinner;
