import {select} from 'd3-selection';

export default ({childNodes}, leftTicks, leftScale, bottomTicks, bottomScale, width, plotLeft, plotBottom) => {
	select(childNodes[0])
		.attr('x', plotLeft)
		.attr('y', 0)
		.attr('width', width - plotLeft)
		.attr('height', plotBottom);

	select(childNodes[1])
		.selectAll('line')
		.data(leftTicks)
		.join('line')
		.attr('transform', (d) => `translate(0,${leftScale(d)})`)
		.attr('x1', plotLeft)
		.attr('x2', width);

	select(childNodes[2])
		.selectAll('line')
		.data(bottomTicks)
		.join('line')
		.attr('transform', (d) => `translate(${bottomScale(d)},0)`)
		.attr('y1', 0)
		.attr('y2', plotBottom);
};
