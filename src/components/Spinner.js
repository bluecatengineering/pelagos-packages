import PropTypes from 'prop-types';
import {t} from '@bluecat/l10n.macro';

import './Spinner.less';

/** A spinner. */
const Spinner = ({className, size, ...props}) => (
	<div {...props} className={'Spinner CssSpinner Spinner--' + size + (className ? ' ' + className : '')} />
);

Spinner.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The spinner size. */
	size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large']),
};

Spinner.defaultProps = {
	size: 'medium',
	role: 'status',
	'aria-label': t`Loading`,
};

export default Spinner;
