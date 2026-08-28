import {useLayoutEffect} from 'react';

import useSelectPositioner from '../../src/hooks/useSelectPositioner';
import addResizeObserver from '../../src/functions/addResizeObserver';

jest.unmock('../../src/hooks/useSelectPositioner');

const anyFunction = expect.any(Function);

global.document = {addEventListener: jest.fn(), removeEventListener: jest.fn()};
global.window = {addEventListener: jest.fn(), removeEventListener: jest.fn()};
global.innerWidth = 600;
global.innerHeight = 500;

describe('useSelectPositioner', () => {
	it('sets the pop-up location relative the button', () => {
		const button = {
			getBoundingClientRect: () => ({bottom: 100, left: 200, right: 600, width: 400}),
		};
		const popUp = {style: {}, getBoundingClientRect: () => ({width: 300, height: 200})};
		const buttonRef = {current: button};
		const popUpRef = {current: popUp};
		const disconnect = jest.fn();
		addResizeObserver.mockReturnValueOnce(disconnect);
		useSelectPositioner(true, buttonRef, popUpRef);
		expect(useLayoutEffect.mock.calls[0]).toEqual([anyFunction, [buttonRef, popUpRef, true, true]]);
		const remove = useLayoutEffect.mock.calls[0][0]();
		expect(popUp.style).toEqual({top: '100px', left: '200px', width: '400px'});
		expect(document.addEventListener.mock.calls).toEqual([['scroll', anyFunction, {passive: true, capture: true}]]);
		expect(window.addEventListener.mock.calls).toEqual([['resize', anyFunction, {passive: true, capture: true}]]);
		expect(addResizeObserver.mock.calls).toEqual([[popUp, anyFunction]]);

		button.getBoundingClientRect = () => ({top: 330, bottom: 350, left: 400, right: 800, width: 400});
		document.addEventListener.mock.calls[0][1]();
		expect(popUp.style).toEqual({top: '130px', left: '500px', width: '400px'});

		button.getBoundingClientRect = () => ({top: 230, bottom: 250, left: 200, right: 600, width: 400});
		window.addEventListener.mock.calls[0][1]();
		expect(popUp.style).toEqual({top: '250px', left: '200px', width: '400px'});

		button.getBoundingClientRect = () => ({top: 80, bottom: 100, left: 100, right: 500, width: 400});
		popUp.getBoundingClientRect = () => ({width: 580, height: 480});
		window.addEventListener.mock.calls[0][1]();
		expect(popUp.style).toEqual({top: '0px', left: '0px', width: '400px'});

		button.getBoundingClientRect = () => ({top: 130, bottom: 150, left: 200, right: 600, width: 400});
		popUp.getBoundingClientRect = () => ({width: 300, height: 100});
		addResizeObserver.mock.calls[0][1]();
		expect(popUp.style).toEqual({top: '150px', left: '200px', width: '400px'});

		remove();
		expect(document.removeEventListener.mock.calls).toEqual(document.addEventListener.mock.calls);
		expect(window.removeEventListener.mock.calls).toEqual(window.addEventListener.mock.calls);
		expect(disconnect.mock.calls).toEqual([[]]);
	});

	it('does not set the pop-up width when changePopUpWidth is false', () => {
		const button = {
			getBoundingClientRect: () => ({bottom: 100, left: 200, right: 600, width: 400}),
		};
		const popUp = {style: {width: '100px'}, getBoundingClientRect: () => ({width: 300, height: 200})};
		const buttonRef = {current: button};
		const popUpRef = {current: popUp};
		useSelectPositioner(true, buttonRef, popUpRef, {changePopUpWidth: false});
		expect(useLayoutEffect.mock.calls[0]).toEqual([anyFunction, [buttonRef, popUpRef, true, false]]);
		useLayoutEffect.mock.calls[0][0]();
		expect(popUp.style).toEqual({top: '100px', left: '200px', width: '100px'});
	});

	it('does not set the pop-up location when open is false', () => {
		useSelectPositioner(false, {}, {});
		expect(useLayoutEffect.mock.calls[0]).toEqual([anyFunction, [{}, {}, false, true]]);
		expect(() => useLayoutEffect.mock.calls[0][0]()).not.toThrow();
	});
});
