import getGenericSuggestions from '../../src/functions/getGenericSuggestions';

jest.unmock('../../src/functions/getGenericSuggestions');
jest.unmock('../../src/functions/compareSuggestions');
jest.unmock('../../src/strings');

describe('getGenericSuggestions', () => {
	it('returns expected suggestions', () => {
		const list = [{id: 'a'}];
		const domainLists = [{id: 'a', name: 'Ab'}, {id: 'c', name: 'Cb'}, {id: 'b', name: 'B'}];
		expect(getGenericSuggestions('b', list, domainLists)).toEqual({
			suggestions: [
				{id: 'b', name: 'B', description: '', order: 0},
				{id: 'c', name: 'Cb', description: '', order: 1},
				{id: 'a', name: 'Ab', description: 'member', order: 2},
			],
		});
	});

	it('returns error when no suggestions', () => {
		const list = [{id: 'a'}];
		const sourceList = [];
		const errorMessage = "You've messed up";
		expect(getGenericSuggestions('a', list, sourceList, errorMessage)).toEqual({error: errorMessage});
	});
});
