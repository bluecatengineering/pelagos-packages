import smoothScroll from '../../src/functions/smoothScroll';
import animate from '../../src/functions/animate';

jest.unmock('../../src/functions/smoothScroll');

global.CustomEvent = jest.fn();

describe('smoothScroll', () => {
	it('scrolls the element in several steps', () => {
		const dispatchEvent = jest.fn();
		const element = {dispatchEvent};
		smoothScroll(element, 0, 10, 500);
		expect(animate.mock.calls).toEqual([[500, expect.any(Function), expect.any(Function)]]);

		const callback = animate.mock.calls[0][1];
		callback(0);
		expect(element.scrollTop).toBe(0);
		callback(0.5);
		expect(element.scrollTop).toBe(5);
		callback(1);
		expect(element.scrollTop).toBe(10);

		const done = animate.mock.calls[0][2];
		done();
		expect(CustomEvent.mock.calls).toEqual([['scroll']]);
		expect(dispatchEvent.mock.calls).toEqual([[CustomEvent.mock.instances[0]]]);
	});

	it('calls done if specified', () => {
		const done = jest.fn();
		smoothScroll({dispatchEvent: jest.fn()}, 0, 10, 500, done);
		animate.mock.calls[0][2]();
		expect(done.mock.calls).toEqual([[]]);
	});
});
