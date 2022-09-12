import PropTypes from 'prop-types';
import {faCircleCheck, faCircleInfo, faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';

import rhombusExclamation from '../icons/rhombusExclamation';

import SvgIcon from './SvgIcon';

import './InlineNotification.less';

const icons = {
	success: faCircleCheck,
	info: faCircleInfo,
	warning: faTriangleExclamation,
	error: rhombusExclamation,
};

/** A notification to be used inside other components. */
const InlineNotification = ({className, type, title, text, ...props}) => (
	<div {...props} className={`InlineNotification InlineNotification--${type}${className ? ` ${className}` : ''}`}>
		<SvgIcon className="InlineNotification__icon" icon={icons[type]} />
		<div className="InlineNotification__wrapper">
			{title && <span className="InlineNotification__title">{title}</span>}
			<span>{text}</span>
		</div>
	</div>
);

InlineNotification.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The notification type. */
	type: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
	/** The notification title. */
	title: PropTypes.string,
	/** The notification text. */
	text: PropTypes.string,
};

export default InlineNotification;
