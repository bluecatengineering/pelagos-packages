import arrayEquals from '../../src/treeView/arrayEquals';

jest.unmock('../../src/treeView/arrayEquals');

describe('arrayEquals', () => {
	it('returns true when both arrays are the same', () => {
		const array = ['a', 'b'];
		expect(arrayEquals(array, array)).toBe(true);
	});

	it('returns false when either array is null', () => {
		const array = ['a', 'b'];
		expect(arrayEquals(null, array)).toBe(false);
		expect(arrayEquals(array, null)).toBe(false);
	});

	it('returns false when the array lengths are different', () => {
		expect(arrayEquals(['a'], ['a', 'b'])).toBe(false);
	});

	it('returns false when the array elements are different', () => {
		expect(arrayEquals(['a', 'b'], ['a', 'c'])).toBe(false);
	});

	it('returns true when the array elements are equal', () => {
		expect(arrayEquals(['a', 'b'], ['a', 'b'])).toBe(true);
	});
});
