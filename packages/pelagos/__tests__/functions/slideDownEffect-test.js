import slideDownEffect from '../../src/functions/slideDownEffect';

jest.unmock('../../src/functions/slideDownEffect');

describe('slideDownEffect', () => {
	it('calls animate', () => {
		const animate = jest.fn();
		slideDownEffect({offsetHeight: 30, animate});
		expect(animate.mock.calls).toEqual([[{transform: ['translateY(-30px)', 'translateY(0)']}, 250]]);
	});
});
