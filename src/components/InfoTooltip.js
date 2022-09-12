import PropTypes from 'prop-types';

import circleInfoOutline from '../icons/circleInfoOutline';
import useTooltip from '../hooks/useTooltip';

import SvgIcon from './SvgIcon';
import './InfoTooltip.less';

/** A component displaying an informational tooltip. */
const InfoTooltip = ({className, text, placement, ...props}) => (
	<button {...props} className={`InfoTooltip${className ? ` ${className}` : ''}`} ref={useTooltip(text, placement)}>
		<SvgIcon icon={circleInfoOutline} />
	</button>
);

InfoTooltip.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The tooltip text to display. */
	text: PropTypes.string,
	/** The placement of the tooltip relative to the icon. */
	placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
};

InfoTooltip.defaultProps = {
	placement: 'top',
};

export default InfoTooltip;
