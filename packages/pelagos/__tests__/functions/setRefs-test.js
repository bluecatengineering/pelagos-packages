import setRefs from '../../src/functions/setRefs';

jest.unmock('../../src/functions/setRefs');

describe('setRefs', () => {
	it('handles both object and function refs', () => {
		const ref1 = {};
		const ref2 = jest.fn();
		const current = {foo: 'test'};
		setRefs(ref1, ref2)(current);
		expect(ref1.current).toBe(current);
		expect(ref2.mock.calls).toEqual([[current]]);
	});
});
