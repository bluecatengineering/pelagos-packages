import animate from '../../src/functions/animate';

jest.unmock('../../src/functions/animate');

let count = 0;
let current = 0;
const step = 500 / 4;
global.performance = {now: jest.fn(() => current)};
global.requestAnimationFrame = jest.fn((f) => {
	current += step;
	f();
	return ++count;
});
global.cancelAnimationFrame = jest.fn();

describe('animate', () => {
	beforeEach(() => {
		count = 0;
		current = 0;
	});

	it('calls callback in several steps', () => {
		const f = jest.fn();
		const done = jest.fn();

		const a = animate(500, f, done);
		expect(requestAnimationFrame.mock.calls).toHaveLength(4);
		expect(f.mock.calls).toEqual([[0.03125], [0.5], [0.96875], [1]]);
		expect(done).toHaveBeenCalledTimes(1);

		a.cancel();
		expect(cancelAnimationFrame.mock.calls).toEqual([[4]]);
	});

	it('calls does not fail if done is not specified', () => {
		const f = jest.fn();
		animate(500, f);
		expect(requestAnimationFrame.mock.calls).toHaveLength(4);
		expect(f.mock.calls).toEqual([[0.03125], [0.5], [0.96875], [1]]);
	});
});
