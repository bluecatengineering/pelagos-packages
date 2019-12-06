import {useEffect} from 'react';
import focusTrap from 'focus-trap';

import useFocusTrap from '../../src/hooks/useFocusTrap';

jest.unmock('../../src/hooks/useFocusTrap');

describe('useFocusTrap', () => {
	it('activates focus trap', () => {
		const current = {};
		const ref = {current};
		const initialFocus = '#test';
		const onClose = jest.fn();
		const trap = {activate: jest.fn(), deactivate: jest.fn()};
		focusTrap.mockReturnValue(trap);
		useFocusTrap(ref, initialFocus, onClose);
		expect(useEffect.mock.calls).toEqual([[expect.any(Function), [ref, initialFocus, onClose]]]);
		expect(useEffect.mock.calls[0][0]()).toBe(trap.deactivate);
		expect(focusTrap.mock.calls).toEqual([
			[current, {initialFocus, clickOutsideDeactivates: true, onDeactivate: onClose}],
		]);
		expect(trap.activate.mock.calls).toEqual([[]]);
	});
});
