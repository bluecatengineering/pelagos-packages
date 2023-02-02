import PropTypes from 'prop-types';

import useRandomId from '../hooks/useRandomId';

import DetailRegion from './DetailRegion';
import './DetailsList.less';

/** A list for the details panel. */
const DetailsList = ({id, className, label, list, renderItem}) => {
	id = useRandomId(id);
	const labelId = `${id}-label`;
	return (
		<DetailRegion id={labelId} className={className} label={label}>
			<ul id={id} className="DetailsList__grid" aria-labelledby={labelId}>
				{list.map((item, index) => (
					<li key={index}>{renderItem(item, 'DetailsList__item', index)}</li>
				))}
			</ul>
		</DetailRegion>
	);
};

DetailsList.propTypes = {
	/** The component id. */
	id: PropTypes.string,
	/** The component class name(s). */
	className: PropTypes.string,
	/** The label text. */
	label: PropTypes.string.isRequired,
	/** The list to display. */
	list: PropTypes.array.isRequired,
	/** Function to render each list item. */
	renderItem: PropTypes.func.isRequired,
};

export default DetailsList;
