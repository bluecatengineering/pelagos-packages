import {useLayoutEffect} from 'react';
import {createFocusTrap} from 'focus-trap';

import useAreaEditorPositioner from '../../src/hooks/useAreaEditorPositioner';

jest.unmock('../../src/hooks/useAreaEditorPositioner');

const anyFunction = expect.any(Function);

global.innerWidth = 500;
global.innerHeight = 500;
global.document = {getElementById: jest.fn(), addEventListener: jest.fn(), removeEventListener: jest.fn()};
global.window = {addEventListener: jest.fn(), removeEventListener: jest.fn()};

describe('useAreaEditorPositioner', () => {
	it('sets the editor location relative the button', () => {
		const onClose = jest.fn();
		const setAttribute = jest.fn();
		const removeAttribute = jest.fn();
		const editor = {id: 'editor', style: {}, getBoundingClientRect: () => ({width: 50, height: 150})};
		const button = {setAttribute, removeAttribute, getBoundingClientRect: () => ({bottom: 100, left: 200})};
		const ref = {current: editor};
		const buttonId = 'buttonId';
		const activate = jest.fn();
		const deactivate = jest.fn();
		document.getElementById.mockReturnValueOnce(button);
		createFocusTrap.mockReturnValue({activate, deactivate});

		useAreaEditorPositioner(ref, buttonId, onClose);
		expect(useLayoutEffect.mock.calls).toEqual([[expect.any(Function), [ref, buttonId, onClose]]]);
		const remove = useLayoutEffect.mock.calls[0][0]();
		expect(document.getElementById.mock.calls).toEqual([[buttonId]]);
		expect(editor.style.top).toBe('100px');
		expect(editor.style.left).toBe('200px');
		expect(setAttribute.mock.calls).toEqual([
			['aria-expanded', 'true'],
			['aria-controls', 'editor'],
		]);
		expect(document.addEventListener.mock.calls).toEqual([['scroll', anyFunction, {passive: true, capture: true}]]);
		expect(createFocusTrap.mock.calls).toEqual([
			[editor, {setReturnFocus: button, allowOutsideClick: anyFunction, onPostDeactivate: onClose}],
		]);
		expect(activate.mock.calls).toEqual([[]]);

		button.getBoundingClientRect = () => ({top: 330, bottom: 350, left: 300, right: 400});
		document.addEventListener.mock.calls[0][1]();
		expect(editor.style.top).toBe('180px');
		expect(editor.style.left).toBe('350px');

		button.getBoundingClientRect = () => ({top: 230, bottom: 250, left: 200, right: 300});
		window.addEventListener.mock.calls[0][1]();
		expect(editor.style.top).toBe('250px');
		expect(editor.style.left).toBe('200px');

		const {allowOutsideClick} = createFocusTrap.mock.calls[0][1];
		expect(allowOutsideClick({type: 'other'})).toBe(false);
		expect(deactivate.mock.calls).toEqual([]);
		expect(allowOutsideClick({type: 'click'})).toBe(false);
		expect(deactivate.mock.calls).toEqual([[]]);

		remove();
		expect(removeAttribute.mock.calls).toEqual([['aria-expanded'], ['aria-controls']]);
		expect(document.removeEventListener.mock.calls).toEqual(document.addEventListener.mock.calls);
		expect(window.removeEventListener.mock.calls).toEqual(window.addEventListener.mock.calls);
		expect(deactivate.mock.calls).toEqual([[], []]);
	});

	it('places the editor at the page top when the it is too tall', () => {
		const setAttribute = jest.fn();
		const editor = {id: 'editor', style: {}, getBoundingClientRect: () => ({width: 50, height: 500})};
		const button = {setAttribute, getBoundingClientRect: () => ({top: 80, bottom: 100, left: 200})};
		const ref = {current: editor};
		const buttonId = 'buttonId';
		document.getElementById.mockReturnValueOnce(button);

		useAreaEditorPositioner(ref, buttonId, null);
		expect(useLayoutEffect.mock.calls).toEqual([[expect.any(Function), [ref, buttonId, null]]]);
		useLayoutEffect.mock.calls[0][0]();
		expect(document.getElementById.mock.calls).toEqual([[buttonId]]);
		expect(editor.style.top).toBe('0px');
		expect(editor.style.left).toBe('200px');
	});
});
