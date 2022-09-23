import throttleAF from '../../src/functions/throttleAF';

jest.unmock('../../src/functions/throttleAF');

global.requestAnimationFrame = jest.fn();
global.cancelAnimationFrame = jest.fn();

describe('throttleAF', () => {
	it('calls requestAnimationFrame when necessary', () => {
		const f = jest.fn();
		requestAnimationFrame.mockReturnValue(1);
		const t = throttleAF(f);

		t(1);
		t(2);
		expect(requestAnimationFrame.mock.calls).toEqual([[expect.any(Function)]]);
		expect(f).not.toHaveBeenCalled();
		requestAnimationFrame.mock.calls[0][0]();
		expect(f.mock.calls).toEqual([[2]]);

		f.mockClear();
		requestAnimationFrame.mockClear();
		t(3);
		expect(requestAnimationFrame.mock.calls).toEqual([[expect.any(Function)]]);
		requestAnimationFrame.mock.calls[0][0]();
		expect(f.mock.calls).toEqual([[3]]);
	});

	it('calls cancelAnimationFrame only once on cancel', () => {
		const f = jest.fn();
		requestAnimationFrame.mockReturnValue(1);
		const t = throttleAF(f);

		t.cancel();
		expect(cancelAnimationFrame).not.toHaveBeenCalled();

		t(1);
		t.cancel();
		t.cancel();
		expect(cancelAnimationFrame.mock.calls).toEqual([[1]]);
	});

	it('calls cancelAnimationFrame only once on flush', () => {
		const f = jest.fn();
		requestAnimationFrame.mockReturnValue(1);
		const t = throttleAF(f);

		t.flush();
		expect(cancelAnimationFrame).not.toHaveBeenCalled();

		t(1);
		t(2);
		t.flush();
		t.flush();
		expect(cancelAnimationFrame.mock.calls).toEqual([[1]]);
		expect(f.mock.calls).toEqual([[2]]);
	});
});
