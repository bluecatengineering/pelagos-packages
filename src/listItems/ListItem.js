import React from 'react';
import PropTypes from 'prop-types';

import './ListItem.less';

const ListItem = ({item, className}) => (
	<span data-bcn-id="name" className={'ListItem' + (className ? ' ' + className : '')} title={item}>
		{item}
	</span>
);

ListItem.propTypes = {
	item: PropTypes.string.isRequired,
	className: PropTypes.string,
};

export default ListItem;