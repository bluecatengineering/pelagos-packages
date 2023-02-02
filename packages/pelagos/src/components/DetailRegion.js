import PropTypes from 'prop-types';

import InfoTooltip from './InfoTooltip';
import './DetailRegion.less';

/** A region in the details panel. */
const DetailRegion = ({id, className, label, infoText, infoTextPlacement, children}) => (
	<div className={`DetailRegion${className ? ` ${className}` : ''}`}>
		<div className="DetailRegion__header">
			<h3 id={id} className="DetailRegion__title">
				{label}
			</h3>
			{infoText && <InfoTooltip text={infoText} placement={infoTextPlacement} />}
		</div>
		{children}
	</div>
);

DetailRegion.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The label text. */
	label: PropTypes.string.isRequired,
	/** The text of the info tooltip to display. */
	infoText: PropTypes.string,
	/** The placement of the info tooltip relative to the icon. */
	infoTextPlacement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
	/** The child elements. */
	children: PropTypes.any,
};

export default DetailRegion;
