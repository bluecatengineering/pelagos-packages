import {select} from 'd3-selection';
import identity from 'lodash-es/identity';

import setGradientParameters from './setGradientParameters';

export default (svg, width, height) => {
	// may happen due to a race condition between React and the observer
	if (!svg.lastChild.classList.contains('Chart__shimmerLines')) {
		return;
	}

	const skeletonNodes = svg.lastChild.childNodes;
	select(skeletonNodes[2])
		.selectAll('line')
		.data(Array.from({length: 21}, (_, i) => (i * width) / 20))
		.join('line')
		.attr('x1', identity)
		.attr('x2', identity)
		.attr('y1', 0)
		.attr('y2', height);
	select(skeletonNodes[3])
		.selectAll('line')
		.data(Array.from({length: 6}, (_, i) => (i * height) / 5))
		.join('line')
		.attr('x1', 0)
		.attr('x2', width)
		.attr('y1', identity)
		.attr('y2', identity);
	setGradientParameters(svg, width, 0.5);
};
