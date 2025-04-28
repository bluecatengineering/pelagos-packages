import useStringFinder from '../../src/hooks/useStringFinder';

jest.unmock('../../src/hooks/useStringFinder');

const list = ['A', 'BC', 'BA'];
const getUpperCaseText = jest.fn((index) => list[index]);

describe('useStringFinder', () => {
	it('returns the index of the item found', () => {
		const find = useStringFinder();
		expect(find('B', 1, 3, getUpperCaseText)).toBe(2);
		expect(getUpperCaseText.mock.calls).toEqual([[2]]);
	});

	it('returns the index of the item found if the search wraps around', () => {
		const find = useStringFinder();
		expect(find('A', 1, 3, getUpperCaseText)).toBe(0);
		expect(getUpperCaseText.mock.calls).toEqual([[2], [0]]);
	});

	it('returns the index of the item found if two character keys are pressed', () => {
		const find = useStringFinder();
		expect(find('B', 0, 3, getUpperCaseText)).toBe(1);
		expect(find('A', 0, 3, getUpperCaseText)).toBe(2);
		expect(getUpperCaseText.mock.calls).toEqual([[1], [1], [2]]);
	});

	it('returns the index of the item found if two character keys are pressed after the timer goes off', () => {
		const find = useStringFinder();
		expect(find('B', 1, 3, getUpperCaseText)).toBe(2);
		jest.runAllTimers();
		expect(find('A', 1, 3, getUpperCaseText)).toBe(0);
		expect(getUpperCaseText.mock.calls).toEqual([[2], [2], [0]]);
	});

	it('returns -1 if the item is not found', () => {
		const find = useStringFinder();
		expect(find('C', 1, 3, getUpperCaseText)).toBe(-1);
		expect(getUpperCaseText.mock.calls).toEqual([[2], [0]]);
	});
});
