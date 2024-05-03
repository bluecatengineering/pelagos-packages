import getColorVariant from '../../src/charts/getColorVariant';

jest.unmock('../../src/charts/getColorVariant');

describe('getColorVariant', () => {
	it('returns expected value when groupCount is set', () => {
		expect(getColorVariant(3)).toBe(3);
	});

	it('returns expected value when groupCount is not set and count is 5', () => {
		expect(getColorVariant(null, 5)).toBe(5);
	});

	it('returns expected value when groupCount is not set and count is more than 5', () => {
		expect(getColorVariant(null, 6)).toBe(14);
	});
});
