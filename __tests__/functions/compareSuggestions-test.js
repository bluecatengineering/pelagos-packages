import compareSuggestions from '../../src/functions/compareSuggestions';

jest.unmock('../../src/functions/compareSuggestions');

describe('compareSuggestions', () => {
	it('returns expected result when order is different', () => {
		expect(compareSuggestions({order: 2}, {order: 1})).toBe(1);
	});

	it('returns expected result when order is equal', () => {
		expect(compareSuggestions({order: 2, name: 'a'}, {order: 2, name: 'b'})).toBe(-1);
	});
});
