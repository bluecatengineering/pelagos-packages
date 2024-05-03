import extendDomain from '../../src/charts/extendDomain';

jest.unmock('../../src/charts/extendDomain');

describe('extendDomain', () => {
	it('returns expected result for positive values', () => {
		expect(extendDomain([1, 10])).toEqual([0.9, 11]);
	});

	it('returns expected result for negative values', () => {
		expect(extendDomain([-10, -1])).toEqual([-11, -0.9]);
	});
});
