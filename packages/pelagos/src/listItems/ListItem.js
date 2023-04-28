import PropTypes from 'prop-types';

import './ListItem.less';

/** A list item. */
const ListItem = ({className, item, unresolved}) => (
	<span
		data-testid="name"
		className={`ListItem${unresolved ? ' ListItem--unresolved' : ''}${className ? ` ${className}` : ''}`}
		title={item}>
		{item}
	</span>
);

ListItem.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The item. */
	item: PropTypes.string.isRequired,
	/** Whether the item is unresolved. */
	unresolved: PropTypes.bool,
};

export default ListItem;
