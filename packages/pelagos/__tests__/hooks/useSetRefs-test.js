import useSetRefs from '../../src/hooks/useSetRefs';

jest.unmock('../../src/hooks/useSetRefs');

describe('useSetRefs', () => {
	it('handles both object and function refs', () => {
		const ref1 = {};
		const ref2 = jest.fn();
		const current = {foo: 'test'};
		useSetRefs(ref1, ref2, null)(current);
		expect(ref1.current).toBe(current);
		expect(ref2.mock.calls).toEqual([[current]]);
	});
});
