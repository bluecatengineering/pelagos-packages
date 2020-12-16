import PropTypes from 'prop-types';

import './ListItem.less';

/** A list item. */
const ListItem = ({className, item}) => (
	<span data-testid="name" className={'ListItem' + (className ? ' ' + className : '')} title={item}>
		{item}
	</span>
);

ListItem.propTypes = {
	/** The component class name(s). */
	className: PropTypes.string,
	/** The item. */
	item: PropTypes.string.isRequired,
};

export default ListItem;
