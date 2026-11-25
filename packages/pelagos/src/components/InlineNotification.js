import PropTypes from 'prop-types';
import CheckmarkFilled from '@carbon/icons-react/es/CheckmarkFilled';
import InformationFilled from '@carbon/icons-react/es/InformationFilled';
import WarningFilled from '@carbon/icons-react/es/WarningFilled';
import ErrorFilled from '@carbon/icons-react/es/ErrorFilled';

import './InlineNotification.less';

const icons = {
	success: CheckmarkFilled,
	info: InformationFilled,
	warning: WarningFilled,
	error: ErrorFilled,
};

/** A notification to be used inside other components. */
const InlineNotification = ({className, type, title, text, ...props}) => {
	const Icon = icons[type];
	return (
		<div {...props} className={`InlineNotification InlineNotification--${type}${className ? ` ${className}` : ''}`}>
			<Icon className="InlineNotification__icon" size={20} />
			<div className="InlineNotification__wrapper">
				{title && <span className="InlineNotification__title">{title}</span>}
				<span>{text}</span>
			</div>
		</div>
	);
};

InlineNotification.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The notification type. When used as callout, only `info` and `warning` are valid. */
	type: PropTypes.oneOf(['success', 'info', 'warning', 'error']).isRequired,
	/** The notification title. */
	title: PropTypes.string,
	/** The notification text. */
	text: PropTypes.node.isRequired,
};

export default InlineNotification;
