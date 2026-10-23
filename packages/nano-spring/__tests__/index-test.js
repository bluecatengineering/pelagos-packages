import spring from '../src';

jest.unmock('../src');

describe('spring', () => {
	let current;
	let nextId;
	let pending;

	// runs the next scheduled frame after advancing the clock by ms
	const frame = (ms) => {
		current += ms;
		const [id, f] = pending.entries().next().value;
		pending.delete(id);
		f(current);
	};

	// runs frames until the animation ends, returns the number of frames
	const run = (ms, max = 5000) => {
		let count = 0;
		while (pending.size && count < max) {
			frame(ms);
			++count;
		}
		return count;
	};

	beforeEach(() => {
		current = 0;
		nextId = 0;
		pending = new Map();
		global.requestAnimationFrame = jest.fn((f) => (pending.set(++nextId, f), nextId));
		global.cancelAnimationFrame = jest.fn((id) => pending.delete(id));
	});

	it('calls step function several times', () => {
		const step = jest.fn();
		const done = jest.fn();
		spring(250, 25, step, done);

		run(16);

		const values = step.mock.calls.map(([p]) => p);
		expect(values[0]).toBe(0);
		expect(values[1]).toBeCloseTo(0.064, 10);
		expect(values[2]).toBeCloseTo(0.162304, 10);
		expect(values[values.length - 1]).toBe(1);
		expect(done.mock.calls).toEqual([[]]);
		expect(pending.size).toBe(0);
	});

	it('does not fail if done is not specified', () => {
		const step = jest.fn();
		spring(250, 25, step);

		run(16);

		expect(step).toHaveBeenLastCalledWith(1);
	});

	it('stops calling step and done if cancelled', () => {
		const step = jest.fn();
		const done = jest.fn();
		const cancel = spring(250, 25, step, done);

		frame(16);
		frame(16);
		frame(16);
		expect(step).toHaveBeenCalledTimes(3);

		cancel();
		expect(cancelAnimationFrame).toHaveBeenCalledWith(nextId);
		expect(pending.size).toBe(0);
		expect(step).toHaveBeenCalledTimes(3);
		expect(done).not.toHaveBeenCalled();
	});

	it('does not overshoot if the spring is overdamped', () => {
		const step = jest.fn();
		spring(250, 50, step);

		run(16);

		const values = step.mock.calls.map(([p]) => p);
		expect(Math.max(...values)).toBe(1);
		expect(values).toEqual([...values].sort((a, b) => a - b));
	});

	it('overshoots if the spring is underdamped', () => {
		const step = jest.fn();
		spring(250, 10, step);

		run(16);

		expect(Math.max(...step.mock.calls.map(([p]) => p))).toBeGreaterThan(1.1);
	});

	it.each([
		[100, 2],
		[250, 5],
		[400, 10],
		[250, 25],
	])('does not finish while still moving (stiffness %d, damping %d)', (stiffness, damping) => {
		const step = jest.fn();
		spring(stiffness, damping, step);

		run(16);

		const values = step.mock.calls.map(([p]) => p);
		const n = values.length;
		const velocity = Math.abs(values[n - 2] - values[n - 3]) / 0.016;
		expect(velocity).toBeLessThan(0.05);
	});

	it('limits the time step after a long gap between frames', () => {
		const step = jest.fn();
		const done = jest.fn();
		spring(250, 25, step, done);

		frame(16);
		expect(step.mock.calls[0][0]).toBe(0);
		frame(2000);
		expect(step.mock.calls[1][0]).toBeCloseTo(250 / 900, 10);

		run(16);

		const values = step.mock.calls.map(([p]) => p);
		expect(Math.max(...values)).toBeLessThan(1.5);
		expect(values[values.length - 1]).toBe(1);
		expect(done).toHaveBeenCalledTimes(1);
	});
});
