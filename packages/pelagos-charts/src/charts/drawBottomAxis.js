import {axisBottom} from 'd3-axis';
import {select} from 'd3-selection';

const trimAxisText = (element, maxWidth) =>
	element.querySelectorAll('text').forEach((node) => {
		let text = node.textContent;
		while (node.getComputedTextLength() > maxWidth && text.length > 0) {
			text = text.slice(0, -1);
			node.textContent = `${text}\u2026`;
		}
	});

export default (node, scale, title, tickCount, ticks, tickFormatter, width, height, plotBottom, plotLeft) => {
	const axis = select(node);
	axis
		.selectChild('g')
		.attr('transform', `translate(0,${plotBottom})`)
		.call(axisBottom(scale).tickFormat(tickFormatter).tickSizeOuter(0).ticks(tickCount).tickValues(ticks));
	axis
		.selectChildren('text')
		.data(title ? [1] : [])
		.join('text')
		.attr('class', 'title')
		.attr('x', plotLeft + (width - plotLeft) / 2)
		.attr('y', height - 4)
		.attr('aria-label', `bottom axis`) // TODO translate
		.text(title);
	if (scale.step) {
		trimAxisText(node.firstChild, scale.step() * 0.95);
	}
};
