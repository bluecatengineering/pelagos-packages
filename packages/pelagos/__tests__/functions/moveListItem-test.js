import moveListItem from '../../src/functions/moveListItem';

jest.unmock('../../src/functions/moveListItem');

describe('moveListItem', () => {
	it('returns expected result', () => {
		expect(moveListItem(['a', 'b', 'c'], 0, 2)).toEqual(['b', 'c', 'a']);
	});
});
