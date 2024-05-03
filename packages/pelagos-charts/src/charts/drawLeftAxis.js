import {max} from 'd3-array';
import {axisLeft} from 'd3-axis';
import {select} from 'd3-selection';

const {ceil} = Math;

export default (node, scale, title, tickCount, ticks, tickFormatter, plotBottom) => {
	const leftAxis = select(node);
	leftAxis
		.selectChild('g')
		.call(axisLeft(scale).tickFormat(tickFormatter).tickSizeOuter(0).ticks(tickCount).tickValues(ticks));

	const leftAxisNode = node.firstChild;
	const textNodes = leftAxisNode.querySelectorAll('text');
	const plotLeft =
		16 + (title ? 18 : 0) + (textNodes.length ? ceil(max(textNodes, (text) => text.getComputedTextLength())) : 0);
	leftAxisNode.setAttribute('transform', `translate(${plotLeft},0)`);

	leftAxis
		.selectChildren('text')
		.data(title ? [1] : [])
		.join('text')
		.attr('class', 'title')
		.attr('x', -plotBottom / 2)
		.attr('y', 14)
		.attr('transform', 'rotate(-90)')
		.attr('aria-label', `left axis`) // TODO translate
		.text(title);

	return plotLeft;
};
