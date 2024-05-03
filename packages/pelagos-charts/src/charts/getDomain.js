import {extent} from 'd3-array';

import extendDomain from './extendDomain';

export default (domain, scaleType, list) =>
	domain || (scaleType === 'labels' ? list : scaleType === 'linear' ? extendDomain(extent(list)) : extent(list));
