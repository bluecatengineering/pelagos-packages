import spring from '../src';

const now = jest.fn();
global.requestAnimationFrame = jest.fn();
global.cancelAnimationFrame = jest.fn();
global.performance = {now};

jest.unmock('../src');

describe('spring', () => {
	let count = 0;
	let current = 0;
	const step = 54; // produces shortest animation for test parameters
	now.mockImplementation(() => current);
	requestAnimationFrame.mockImplementation((f) => ((current += step), f(), ++count));

	beforeEach(() => {
		count = 0;
		current = 0;
	});

	it('calls step function several times', () => {
		const step = jest.fn();
		const done = jest.fn();
		const cancel = spring(250, 25, step, done);
		expect(step.mock.calls).toEqual([
			[0.729],
			[0.671409],
			[0.931108689],
			[0.890435563569],
			[0.984543631628049],
			[0.9628735003505341],
			[0.9975232645421249],
			[0.9872013872238591],
			[1],
		]);
		expect(done.mock.calls).toEqual([[]]);

		cancel();
		expect(cancelAnimationFrame.mock.calls).toEqual([[9]]);
	});

	it('does not fail if done is not specified', () => {
		const step = jest.fn();
		spring(250, 25, step);
		expect(step.mock.calls).toEqual([
			[0.729],
			[0.671409],
			[0.931108689],
			[0.890435563569],
			[0.984543631628049],
			[0.9628735003505341],
			[0.9975232645421249],
			[0.9872013872238591],
			[1],
		]);
	});
});
