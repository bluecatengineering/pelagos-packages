import getColorClass from '../../src/charts/getColorClass';

jest.unmock('../../src/charts/getColorClass');

describe('getColorClass', () => {
	it('returns expected value', () => {
		expect(getColorClass('fill', 3, 2, 0)).toBe('fill-3-2-1');
	});
});
