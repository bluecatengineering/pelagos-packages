import setGradientParameters from '../../src/charts/setGradientParameters';

jest.unmock('../../src/charts/setGradientParameters');

describe('setGradientParameters', () => {
	it('calls setAttribute', () => {
		const gradient = {setAttribute: jest.fn()};
		const querySelector = jest.fn().mockReturnValueOnce(gradient);
		const svg = {querySelector};
		setGradientParameters(svg, 400, 0.5);
		expect(querySelector.mock.calls).toEqual([['linearGradient']]);
		expect(gradient.setAttribute.mock.calls).toEqual([
			['x2', 800],
			['gradientTransform', 'translate(-200 0)'],
		]);
	});
});
