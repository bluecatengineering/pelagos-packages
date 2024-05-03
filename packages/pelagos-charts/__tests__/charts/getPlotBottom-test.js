import getPlotBottom from '../../src/charts/getPlotBottom';

jest.unmock('../../src/charts/getPlotBottom');

describe('getPlotBottom', () => {
	it('returns expected value', () => {
		expect(getPlotBottom(300)).toBe(278);
	});

	it('returns expected value when title is set', () => {
		expect(getPlotBottom(300, 'x')).toBe(260);
	});
});
