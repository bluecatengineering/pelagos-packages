import useRandomId from '../../src/hooks/useRandomId';

jest.unmock('../../src/hooks/useRandomId');

describe('useRandomId', () => {
	it('returns the provided id', () => {
		expect(useRandomId('test')).toBe('test');
	});

	it('returns a random id if not provided', () => {
		const random = jest.spyOn(Math, 'random').mockReturnValue(0.1);
		expect(useRandomId()).toBe('e1');
		expect(random.mock.calls).toEqual([[]]);
	});
});
