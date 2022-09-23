import {cloneElement} from 'react';

import addClassName from './addClassName';

export default (element, className) => cloneElement(element, {className: addClassName(element, className)});
