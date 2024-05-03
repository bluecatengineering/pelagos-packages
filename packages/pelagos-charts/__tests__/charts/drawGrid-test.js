import {select} from 'd3-selection';

import drawGrid from '../../src/charts/drawGrid';

jest.unmock('../../src/charts/drawGrid');

describe('drawGrid', () => {
	it('calls expected d3 functions', () => {
		const title = {attr: jest.fn().mockReturnThis()};
		const hGrid = {
			selectAll: jest.fn().mockReturnThis(),
			data: jest.fn().mockReturnThis(),
			join: jest.fn().mockReturnThis(),
			attr: jest.fn().mockReturnThis(),
		};
		const vGrid = {
			selectAll: jest.fn().mockReturnThis(),
			data: jest.fn().mockReturnThis(),
			join: jest.fn().mockReturnThis(),
			attr: jest.fn().mockReturnThis(),
		};
		const leftTicks = [0, 2, 4];
		const leftScale = jest.fn().mockReturnValue('left-scale');
		const bottomTicks = ['foo', 'bar'];
		const bottomScale = jest.fn().mockReturnValue('bottom-scale');
		select.mockReturnValueOnce(title).mockReturnValueOnce(hGrid).mockReturnValueOnce(vGrid);
		drawGrid({childNodes: ['a', 'b', 'c']}, leftTicks, leftScale, bottomTicks, bottomScale, 400, 38, 262);

		expect(select.mock.calls).toEqual([['a'], ['b'], ['c']]);

		expect(title.attr.mock.calls).toEqual([
			['x', 38],
			['y', 0],
			['width', 362],
			['height', 262],
		]);

		expect(hGrid.selectAll.mock.calls).toEqual([['line']]);
		expect(hGrid.data.mock.calls).toEqual([[leftTicks]]);
		expect(hGrid.join.mock.calls).toEqual([['line']]);
		expect(hGrid.attr.mock.calls).toEqual([
			['transform', expect.any(Function)],
			['x1', 38],
			['x2', 400],
		]);
		expect(hGrid.attr.mock.calls[0][1]('hgrid-transform')).toBe('translate(0,left-scale)');
		expect(leftScale.mock.calls).toEqual([['hgrid-transform']]);

		expect(vGrid.selectAll.mock.calls).toEqual([['line']]);
		expect(vGrid.data.mock.calls).toEqual([[bottomTicks]]);
		expect(vGrid.join.mock.calls).toEqual([['line']]);
		expect(vGrid.attr.mock.calls).toEqual([
			['transform', expect.any(Function)],
			['y1', 0],
			['y2', 262],
		]);
		expect(vGrid.attr.mock.calls[0][1]('vgrid-transform')).toBe('translate(bottom-scale,0)');
		expect(bottomScale.mock.calls).toEqual([['vgrid-transform']]);
	});
});
