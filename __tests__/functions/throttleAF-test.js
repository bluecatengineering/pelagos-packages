import throttleAF from '../../src/functions/throttleAF';

jest.unmock('../../src/functions/throttleAF');

describe('throttleAF', () => {
	it('calls requestAnimationFrame when necessary', () => {
		const f = jest.fn();
		jest.spyOn(window, 'requestAnimationFrame').mockReturnValue(1);
		const t = throttleAF(f);

		t();
		t();
		expect(requestAnimationFrame.mock.calls).toEqual([[expect.any(Function)]]);
		expect(f).not.toHaveBeenCalled();
		requestAnimationFrame.mock.calls[0][0]();
		expect(f).toHaveBeenCalledTimes(1);

		requestAnimationFrame.mockClear();
		t();
		expect(requestAnimationFrame.mock.calls).toEqual([[expect.any(Function)]]);
	});

	it('calls cancelAnimationFrame only once on cancel', () => {
		const f = jest.fn();
		jest.spyOn(window, 'requestAnimationFrame').mockReturnValue(1);
		jest.spyOn(window, 'cancelAnimationFrame');
		const t = throttleAF(f);

		t.cancel();
		expect(cancelAnimationFrame).not.toHaveBeenCalled();

		t();
		t.cancel();
		t.cancel();
		expect(cancelAnimationFrame.mock.calls).toEqual([[1]]);
	});
});
