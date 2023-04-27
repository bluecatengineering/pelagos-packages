import {useEffect} from 'react';
import {createFocusTrap} from 'focus-trap';

import useFocusTrap from '../../src/hooks/useFocusTrap';

jest.unmock('../../src/hooks/useFocusTrap');

describe('useFocusTrap', () => {
	it('activates focus trap', () => {
		const current = {};
		const ref = {current};
		const initialFocus = '#test';
		const onClose = jest.fn();
		const closest = jest.fn().mockReturnValue({});
		const trap = {activate: jest.fn(), deactivate: jest.fn()};
		createFocusTrap.mockReturnValue(trap);
		useFocusTrap(ref, initialFocus, onClose);
		expect(useEffect.mock.calls).toEqual([[expect.any(Function), [ref, initialFocus, onClose]]]);
		expect(useEffect.mock.calls[0][0]()).toBe(trap.deactivate);
		expect(createFocusTrap.mock.calls).toEqual([
			[current, {initialFocus, clickOutsideDeactivates: expect.any(Function), onDeactivate: onClose}],
		]);
		expect(trap.activate.mock.calls).toEqual([[]]);

		const {clickOutsideDeactivates} = createFocusTrap.mock.calls[0][1];
		expect(clickOutsideDeactivates({target: {closest}})).toBe(false);
		expect(closest.mock.calls).toEqual([['[role="listbox"]']]);
	});
});
