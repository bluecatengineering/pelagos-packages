import buildSimpleSuggestionsParser from '../../src/functions/buildSimpleSuggestionsParser';

jest.unmock('../../src/functions/buildSimpleSuggestionsParser');

describe('buildSimpleSuggestionsParser', () => {
	it('returns expected entries', () => {
		const parser = buildSimpleSuggestionsParser(() => null);
		expect(parser('a, b, a,, c,', ['b', 'd'])).toEqual({entries: ['a', 'c']});
	});

	it('returns expected entries when transform is set', () => {
		const parser = buildSimpleSuggestionsParser(
			() => null,
			(s) => s.toUpperCase()
		);
		expect(parser('a, b, a, c', ['B', 'D'])).toEqual({entries: ['A', 'C']});
	});

	it('does not transform empty entries', () => {
		const transform = jest.fn((s) => `${s}/32`);
		const parser = buildSimpleSuggestionsParser(() => null, transform);
		expect(parser('10.0.0.1, ,10.0.0.2,', [])).toEqual({entries: ['10.0.0.1/32', '10.0.0.2/32']});
		expect(transform.mock.calls).toEqual([['10.0.0.1'], ['10.0.0.2']]);
	});

	it('returns an error when the validation fails', () => {
		const parser = buildSimpleSuggestionsParser(() => 'Test error');
		expect(parser('x', [])).toEqual({error: 'Test error'});
	});
});
