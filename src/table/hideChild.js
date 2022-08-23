import {cloneElement} from 'react';

export default (child, index) => child && cloneElement(child, {tabIndex: -1, key: child.key || index});
