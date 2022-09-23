import {useState, useEffect} from 'react';

import useToggle from '../../src/hooks/useToggle';

jest.unmock('../../src/hooks/useToggle');

describe('useToggle', () => {
	it('returns a function to toggle the state', () => {
		const setValue = jest.fn();
		useState.mockReturnValue([true, setValue]);
		const [value, toggle] = useToggle(true);

		expect(useState.mock.calls).toEqual([[true]]);
		expect(value).toBe(true);

		toggle();
		expect(setValue.mock.calls).toEqual([[expect.any(Function)]]);
		expect(setValue.mock.calls[0][0](true)).toBe(false);
	});

	it('does not toggle if open', () => {
		const setValue = jest.fn();
		useState.mockReturnValue([true, setValue]);
		useToggle(true, ['error 1', 'error 2']);

		expect(useEffect.mock.calls).toEqual([[expect.any(Function), ['error 1', 'error 2']]]);
		useEffect.mock.calls[0][0]();

		expect(setValue).not.toHaveBeenCalled();
	});

	it('does not toggle if closed and there are no errors', () => {
		const setValue = jest.fn();
		useState.mockReturnValue([false, setValue]);
		useToggle(false, [null, null]);

		expect(useEffect.mock.calls).toEqual([[expect.any(Function), [null, null]]]);
		useEffect.mock.calls[0][0]();

		expect(setValue).not.toHaveBeenCalled();
	});

	it('toggles if closed and there are errors', () => {
		const setValue = jest.fn();
		useState.mockReturnValue([false, setValue]);
		useToggle(false, ['error 1', 'error 2']);

		expect(useEffect.mock.calls).toEqual([[expect.any(Function), ['error 1', 'error 2']]]);
		useEffect.mock.calls[0][0]();

		expect(setValue.mock.calls).toEqual([[true]]);
	});
});
