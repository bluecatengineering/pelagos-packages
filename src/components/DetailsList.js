import PropTypes from 'prop-types';

import Label from './Label';
import './DetailsList.less';

/** A list for the details panel. */
const DetailsList = ({id, className, label, list, renderItem}) => (
	<div className={`DetailsList ${className}`}>
		<Label text={label} />
		<div id={id} className="DetailsList__grid">
			{list.map((item, index) => renderItem(item, 'DetailsList__item', index))}
		</div>
	</div>
);

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
