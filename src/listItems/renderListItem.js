import React from 'react';

import ListItem from './ListItem';

// eslint-disable-next-line react/display-name,react/prop-types
export default (item, className) => <ListItem key={item} item={item} className={className} />;
