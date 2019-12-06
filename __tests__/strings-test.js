import strings from '../src/strings';

jest.unmock('../src/strings');

describe('strings', () => {
	it('returns string if found', () => {
		expect(strings('DISMISS')).toBe('Dismiss');
	});

	it('returns key if not found', () => {
		expect(strings('XXX')).toBe('XXX');
	});
});
