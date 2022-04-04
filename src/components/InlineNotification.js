import PropTypes from 'prop-types';
import {faCheckCircle, faExclamationTriangle, faInfoCircle} from '@fortawesome/free-solid-svg-icons';

import exclamationRhombus from '../icons/exclamationRhombus';

import SvgIcon from './SvgIcon';

import './InlineNotification.less';

const icons = {
	success: faCheckCircle,
	info: faInfoCircle,
	warning: faExclamationTriangle,
	error: exclamationRhombus,
};

const InlineNotification = ({type, title, text}) => (
	<div className={`InlineNotification InlineNotification--${type}`}>
		<SvgIcon className="InlineNotification__icon" icon={icons[type]} />
		<div className="InlineNotification__wrapper">
			{title && <span className="InlineNotification__title">{title}</span>}
			<span>{text}</span>
		</div>
	</div>
);

InlineNotification.propTypes = {
	type: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
	title: PropTypes.string,
	text: PropTypes.string,
};

export default InlineNotification;
