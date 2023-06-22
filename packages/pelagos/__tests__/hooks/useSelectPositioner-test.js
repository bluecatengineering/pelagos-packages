import {useLayoutEffect} from 'react';

import useSelectPositioner from '../../src/hooks/useSelectPositioner';

jest.unmock('../../src/hooks/useSelectPositioner');

const anyFunction = expect.any(Function);

const addEventListener = jest.fn();
const removeEventListener = jest.fn();
global.document = {addEventListener, removeEventListener};
global.innerHeight = 500;

describe('useSelectPositioner', () => {
	it('sets the pop-up location relative the button', () => {
		const button = {
			getBoundingClientRect: () => ({bottom: 100, left: 200, width: 400}),
		};
		const popUp = {style: {}, getBoundingClientRect: () => ({height: 200})};
		const buttonRef = {current: button};
		const popUpRef = {current: popUp};
		useSelectPositioner(true, buttonRef, popUpRef);
		expect(useLayoutEffect.mock.calls[0]).toEqual([anyFunction, [buttonRef, popUpRef, true]]);
		const remove = useLayoutEffect.mock.calls[0][0]();
		expect(popUp.style).toEqual({top: '100px', left: '200px', width: '400px'});
		expect(addEventListener.mock.calls).toEqual([['scroll', anyFunction, {passive: true, capture: true}]]);

		button.getBoundingClientRect = () => ({top: 330, bottom: 350, left: 200, width: 400});
		addEventListener.mock.calls[0][1]();
		expect(popUp.style).toEqual({top: '130px', left: '200px', width: '400px'});

		remove();
		expect(removeEventListener.mock.calls).toEqual(addEventListener.mock.calls);
	});

	it('does not set the pop-up location when open is false', () => {
		useSelectPositioner(false, {}, {});
		expect(useLayoutEffect.mock.calls[0]).toEqual([anyFunction, [{}, {}, false]]);
		expect(() => useLayoutEffect.mock.calls[0][0]()).not.toThrow();
	});
});
