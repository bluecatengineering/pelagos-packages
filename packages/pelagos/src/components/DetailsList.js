import PropTypes from 'prop-types';

import useRandomId from '../hooks/useRandomId';

import DetailRegion from './DetailRegion';
import './DetailsList.less';

/** A list for the details panel. */
const DetailsList = ({id, className, level, label, infoText, infoTextPlacement, children}) => {
	id = useRandomId(id);
	const labelId = `${id}-label`;
	return (
		<DetailRegion
			id={labelId}
			className={className}
			level={level}
			label={label}
			infoText={infoText}
			infoTextPlacement={infoTextPlacement}>
			<ul id={id} className="DetailsList__grid" aria-labelledby={labelId}>
				{children}
			</ul>
		</DetailRegion>
	);
};

DetailsList.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The header level. */
	level: PropTypes.oneOf(['h3', 'h4', 'h5', 'h6']),
	/** The label text. */
	label: PropTypes.string.isRequired,
	/** The text of the info tooltip to display. */
	infoText: PropTypes.string,
	/** The placement of the info tooltip relative to the icon. */
	infoTextPlacement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
	/** The child elements. */
	children: PropTypes.node,
};

export default DetailsList;
