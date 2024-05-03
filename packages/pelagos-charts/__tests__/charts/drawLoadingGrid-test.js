import {select} from 'd3-selection';
import identity from 'lodash-es/identity';

import drawLoadingGrid from '../../src/charts/drawLoadingGrid';
import setGradientParameters from '../../src/charts/setGradientParameters';

jest.unmock('../../src/charts/drawLoadingGrid');

const createSelection = () => ({
	selectAll: jest.fn().mockReturnThis(),
	data: jest.fn().mockReturnThis(),
	join: jest.fn().mockReturnThis(),
	attr: jest.fn().mockReturnThis(),
});

describe('drawLoadingGrid', () => {
	it('calls expected d3 functions', () => {
		const contains = jest.fn().mockReturnValue(true);
		const svg = {lastChild: {childNodes: [null, null, 'node-1', 'node-2'], classList: {contains}}};
		const horizontal = createSelection();
		const vertical = createSelection();
		select.mockReturnValueOnce(horizontal).mockReturnValueOnce(vertical);
		drawLoadingGrid(svg, 400, 300);
		expect(contains.mock.calls).toEqual([['Chart__shimmerLines']]);
		expect(select.mock.calls).toEqual([['node-1'], ['node-2']]);

		expect(horizontal.selectAll.mock.calls).toEqual([['line']]);
		expect(horizontal.data.mock.calls).toEqual([
			[[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400]],
		]);
		expect(horizontal.join.mock.calls).toEqual([['line']]);
		expect(horizontal.attr.mock.calls).toEqual([
			['x1', identity],
			['x2', identity],
			['y1', 0],
			['y2', 300],
		]);

		expect(vertical.selectAll.mock.calls).toEqual([['line']]);
		expect(vertical.data.mock.calls).toEqual([[[0, 60, 120, 180, 240, 300]]]);
		expect(vertical.join.mock.calls).toEqual([['line']]);
		expect(vertical.attr.mock.calls).toEqual([
			['x1', 0],
			['x2', 400],
			['y1', identity],
			['y2', identity],
		]);

		expect(setGradientParameters.mock.calls).toEqual([[svg, 400, 0.5]]);
	});

	it('does not call any d3 functions when contains returns false', () => {
		const contains = jest.fn().mockReturnValue(false);
		const svg = {lastChild: {classList: {contains}}};
		drawLoadingGrid(svg, 400, 300);
		expect(contains.mock.calls).toEqual([['Chart__shimmerLines']]);
		expect(select.mock.calls).toEqual([]);
	});
});
