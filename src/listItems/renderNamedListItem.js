import React from 'react';

import ListItem from './ListItem';

// eslint-disable-next-line react/display-name,react/prop-types
export default (item, className) => (
	<ListItem
		key={item.id}
		item={item.name || item.id}
		className={(className ? className : '') + (item.name ? '' : ' ListItem--unresolved')}
	/>
);
