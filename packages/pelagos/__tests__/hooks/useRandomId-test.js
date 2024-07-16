import useRandomId from '../../src/hooks/useRandomId';

jest.unmock('../../src/hooks/useRandomId');

describe('useRandomId', () => {
	it('returns the provided id', () => {
		expect(useRandomId('test')).toBe('test');
	});

	it('returns a random id if not provided', () => {
		const now = jest.spyOn(performance, 'now').mockReturnValue(12.34);
		const random = jest.spyOn(Math, 'random').mockReturnValue(0.1);
		expect(useRandomId()).toBe('ec.c8n1fu8n1f.3lllllllllm');
		expect(now.mock.calls).toEqual([[]]);
		expect(random.mock.calls).toEqual([[]]);
	});
});
