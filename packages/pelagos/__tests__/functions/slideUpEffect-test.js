import slideUpEffect from '../../src/functions/slideUpEffect';

jest.unmock('../../src/functions/slideUpEffect');

describe('slideUpEffect', () => {
	it('calls animate', () => {
		const animate = jest.fn();
		slideUpEffect({offsetHeight: 30, animate});
		expect(animate.mock.calls).toEqual([[{transform: ['translateY(30px)', 'translateY(0)']}, 250]]);
	});
});
