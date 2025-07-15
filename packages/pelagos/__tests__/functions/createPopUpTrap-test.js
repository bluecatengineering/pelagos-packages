import {createFocusTrap} from 'focus-trap';

import createPopUpTrap from '../../src/functions/createPopUpTrap';

jest.unmock('../../src/functions/createPopUpTrap');

const anyFunction = expect.any(Function);

const deactivate = jest.fn();
const trap = {deactivate};
createFocusTrap.mockReturnValue(trap);

describe('createPopUpTrap', () => {
	it('calls createFocusTrap', () => {
		const contains = jest.fn().mockReturnValueOnce(true).mockReturnValueOnce(false).mockReturnValueOnce(true);
		const popUp = {id: 'pop-up'};
		const button = {id: 'button', contains};
		expect(createPopUpTrap(popUp, button, {initialFocus: 'test-element', onDeactivate: 'test-deactivate'})).toBe(trap);
		expect(createFocusTrap.mock.calls).toEqual([
			[
				popUp,
				{
					initialFocus: 'test-element',
					setReturnFocus: anyFunction,
					allowOutsideClick: anyFunction,
					onDeactivate: 'test-deactivate',
				},
			],
		]);

		const {setReturnFocus, allowOutsideClick} = createFocusTrap.mock.calls[0][1];

		expect(allowOutsideClick({type: 'click', target: 'test-target'})).toBe(false);
		expect(setReturnFocus()).toBe(button);
		expect(allowOutsideClick({type: 'click', target: 'test-target'})).toBe(true);
		expect(setReturnFocus()).toBe(false);
		expect(allowOutsideClick({type: 'other', target: 'test-target'})).toBe(false);
		expect(deactivate.mock.calls).toEqual([[], []]);
		expect(contains.mock.calls).toEqual([['test-target'], ['test-target'], ['test-target']]);
	});
});
