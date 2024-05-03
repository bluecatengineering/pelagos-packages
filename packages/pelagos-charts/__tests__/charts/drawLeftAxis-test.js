import {max} from 'd3-array';
import {axisLeft} from 'd3-axis';
import {select} from 'd3-selection';

import drawLeftAxis from '../../src/charts/drawLeftAxis';

jest.unmock('../../src/charts/drawLeftAxis');

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

describe('drawLeftAxis', () => {
	it('calls expected d3 functions', () => {
		const querySelectorAll = jest.fn().mockReturnValue([{}]);
		const setAttribute = jest.fn();
		const node = {firstChild: {querySelectorAll, setAttribute}};
		const scale = 'scale';
		const axisSelect = {call: jest.fn()};
		const titleSelect = createTitleSelect();
		const axis = createAxis();
		const selectChild = jest.fn().mockReturnValue(axisSelect);
		const selectChildren = jest.fn().mockReturnValue(titleSelect);
		select.mockReturnValueOnce({selectChild, selectChildren});
		axisLeft.mockReturnValueOnce(axis);
		max.mockReturnValueOnce(3.4);
		drawLeftAxis(node, scale, 'Left title', 7.5, ticks, tickFormatter, 262);

		expect(select.mock.calls).toEqual([[node]]);
		expect(selectChild.mock.calls).toEqual([['g']]);
		expect(axisLeft.mock.calls).toEqual([[scale]]);
		expect(axis.tickFormat.mock.calls).toEqual([[tickFormatter]]);
		expect(axis.tickSizeOuter.mock.calls).toEqual([[0]]);
		expect(axis.ticks.mock.calls).toEqual([[7.5]]);
		expect(axis.tickValues.mock.calls).toEqual([[ticks]]);
		expect(axisSelect.call.mock.calls).toEqual([[axis]]);

		expect(querySelectorAll.mock.calls).toEqual([['text']]);
		expect(setAttribute.mock.calls).toEqual([['transform', 'translate(38,0)']]);

		expect(max.mock.calls).toEqual([[[{}], expect.any(Function)]]);
		expect(max.mock.calls[0][1]({getComputedTextLength: () => 3.4})).toBe(3.4);

		expect(selectChildren.mock.calls).toEqual([['text']]);
		expect(titleSelect.data.mock.calls).toEqual([[[1]]]);
		expect(titleSelect.join.mock.calls).toEqual([['text']]);
		expect(titleSelect.attr.mock.calls).toEqual([
			['class', 'title'],
			['x', -131],
			['y', 14],
			['transform', 'rotate(-90)'],
			['aria-label', 'left axis'],
		]);
		expect(titleSelect.text.mock.calls).toEqual([['Left title']]);
	});

	it('calls expected d3 functions when title is not set', () => {
		const querySelectorAll = jest.fn().mockReturnValue([]);
		const setAttribute = jest.fn();
		const node = {firstChild: {querySelectorAll, setAttribute}};
		const scale = 'scale';
		const axisSelect = {call: jest.fn()};
		const titleSelect = createTitleSelect();
		const axis = createAxis();
		const selectChild = jest.fn().mockReturnValue(axisSelect);
		const selectChildren = jest.fn().mockReturnValue(titleSelect);
		select.mockReturnValueOnce({selectChild, selectChildren});
		axisLeft.mockReturnValueOnce(axis);
		drawLeftAxis(node, scale, null, 7.5, ticks, tickFormatter, 262);

		expect(select.mock.calls).toEqual([[node]]);
		expect(selectChild.mock.calls).toEqual([['g']]);
		expect(axisLeft.mock.calls).toEqual([[scale]]);
		expect(axis.tickFormat.mock.calls).toEqual([[tickFormatter]]);
		expect(axis.tickSizeOuter.mock.calls).toEqual([[0]]);
		expect(axis.ticks.mock.calls).toEqual([[7.5]]);
		expect(axis.tickValues.mock.calls).toEqual([[ticks]]);
		expect(axisSelect.call.mock.calls).toEqual([[axis]]);

		expect(querySelectorAll.mock.calls).toEqual([['text']]);
		expect(setAttribute.mock.calls).toEqual([['transform', 'translate(16,0)']]);

		expect(max.mock.calls).toEqual([]);

		expect(selectChildren.mock.calls).toEqual([['text']]);
		expect(titleSelect.data.mock.calls).toEqual([[[]]]);
		expect(titleSelect.join.mock.calls).toEqual([['text']]);
		expect(titleSelect.attr.mock.calls).toEqual([
			['class', 'title'],
			['x', -131],
			['y', 14],
			['transform', 'rotate(-90)'],
			['aria-label', 'left axis'],
		]);
		expect(titleSelect.text.mock.calls).toEqual([[null]]);
	});
});
