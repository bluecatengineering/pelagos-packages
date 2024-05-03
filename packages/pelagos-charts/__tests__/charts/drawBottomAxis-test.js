import {axisBottom} from 'd3-axis';
import {select} from 'd3-selection';

import drawBottomAxis from '../../src/charts/drawBottomAxis';

jest.unmock('../../src/charts/drawBottomAxis');

const createTitleSelect = () => ({
	data: jest.fn().mockReturnThis(),
	join: jest.fn().mockReturnThis(),
	attr: jest.fn().mockReturnThis(),
	text: jest.fn(),
});

const createAxis = () => ({
	tickFormat: jest.fn().mockReturnThis(),
	tickSizeOuter: jest.fn().mockReturnThis(),
	ticks: jest.fn().mockReturnThis(),
	tickValues: jest.fn().mockReturnThis(),
});

const ticks = [0, 2, 4];
const tickFormatter = 'tick-formatter';

describe('drawBottomAxis', () => {
	it('calls expected d3 functions', () => {
		const getComputedTextLength = jest.fn().mockReturnValueOnce(99).mockReturnValueOnce(95);
		const textNode = {textContent: 'foo', getComputedTextLength};
		const querySelectorAll = jest.fn().mockReturnValue([textNode]);
		const node = {firstChild: {querySelectorAll}};
		const step = jest.fn().mockReturnValue(100);
		const scale = {step};
		const axisSelect = {attr: jest.fn().mockReturnThis(), call: jest.fn()};
		const titleSelect = createTitleSelect();
		const axis = createAxis();
		const selectChild = jest.fn().mockReturnValue(axisSelect);
		const selectChildren = jest.fn().mockReturnValue(titleSelect);
		select.mockReturnValueOnce({selectChild, selectChildren});
		axisBottom.mockReturnValueOnce(axis);
		drawBottomAxis(node, scale, 'Bottom title', 5, ticks, tickFormatter, 400, 300, 262, 38);

		expect(select.mock.calls).toEqual([[node]]);
		expect(selectChild.mock.calls).toEqual([['g']]);
		expect(axisBottom.mock.calls).toEqual([[scale]]);
		expect(axis.tickFormat.mock.calls).toEqual([[tickFormatter]]);
		expect(axis.tickSizeOuter.mock.calls).toEqual([[0]]);
		expect(axis.ticks.mock.calls).toEqual([[5]]);
		expect(axis.tickValues.mock.calls).toEqual([[ticks]]);
		expect(axisSelect.attr.mock.calls).toEqual([['transform', 'translate(0,262)']]);
		expect(axisSelect.call.mock.calls).toEqual([[axis]]);

		expect(querySelectorAll.mock.calls).toEqual([['text']]);
		expect(getComputedTextLength.mock.calls).toEqual([[], []]);
		expect(textNode.textContent).toBe('fo\u2026');

		expect(selectChildren.mock.calls).toEqual([['text']]);
		expect(titleSelect.data.mock.calls).toEqual([[[1]]]);
		expect(titleSelect.join.mock.calls).toEqual([['text']]);
		expect(titleSelect.attr.mock.calls).toEqual([
			['class', 'title'],
			['x', 219],
			['y', 296],
			['aria-label', 'bottom axis'],
		]);
		expect(titleSelect.text.mock.calls).toEqual([['Bottom title']]);
	});

	it('calls expected d3 functions when title is not set', () => {
		const querySelectorAll = jest.fn();
		const node = {firstChild: {querySelectorAll}};
		const scale = 'scale';
		const axisSelect = {attr: jest.fn().mockReturnThis(), call: jest.fn()};
		const titleSelect = createTitleSelect();
		const axis = createAxis();
		const selectChild = jest.fn().mockReturnValue(axisSelect);
		const selectChildren = jest.fn().mockReturnValue(titleSelect);
		select.mockReturnValueOnce({selectChild, selectChildren});
		axisBottom.mockReturnValueOnce(axis);
		drawBottomAxis(node, scale, null, 5, ticks, tickFormatter, 400, 300, 262, 38);

		expect(select.mock.calls).toEqual([[node]]);
		expect(selectChild.mock.calls).toEqual([['g']]);
		expect(axisBottom.mock.calls).toEqual([[scale]]);
		expect(axis.tickFormat.mock.calls).toEqual([[tickFormatter]]);
		expect(axis.tickSizeOuter.mock.calls).toEqual([[0]]);
		expect(axis.ticks.mock.calls).toEqual([[5]]);
		expect(axis.tickValues.mock.calls).toEqual([[ticks]]);
		expect(axisSelect.attr.mock.calls).toEqual([['transform', 'translate(0,262)']]);
		expect(axisSelect.call.mock.calls).toEqual([[axis]]);

		expect(querySelectorAll.mock.calls).toEqual([]);

		expect(selectChildren.mock.calls).toEqual([['text']]);
		expect(titleSelect.data.mock.calls).toEqual([[[]]]);
		expect(titleSelect.join.mock.calls).toEqual([['text']]);
		expect(titleSelect.attr.mock.calls).toEqual([
			['class', 'title'],
			['x', 219],
			['y', 296],
			['aria-label', 'bottom axis'],
		]);
		expect(titleSelect.text.mock.calls).toEqual([[null]]);
	});
});
