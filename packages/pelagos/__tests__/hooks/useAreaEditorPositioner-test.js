import {useLayoutEffect} from 'react';
import {createFocusTrap} from 'focus-trap';

import useAreaEditorPositioner from '../../src/hooks/useAreaEditorPositioner';

jest.unmock('../../src/hooks/useAreaEditorPositioner');

const anyFunction = expect.any(Function);

const getElementById = jest.fn();
const addEventListener = jest.fn();
const removeEventListener = jest.fn();
global.innerWidth = 500;
global.innerHeight = 500;
global.document = {getElementById, addEventListener, removeEventListener};

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
		const closest = jest.fn().mockReturnValue({});
		getElementById.mockReturnValueOnce(button);
		createFocusTrap.mockReturnValue({activate, deactivate});

		useAreaEditorPositioner(ref, buttonId, onClose);
		expect(useLayoutEffect.mock.calls).toEqual([[expect.any(Function), [ref, buttonId, onClose]]]);
		const remove = useLayoutEffect.mock.calls[0][0]();
		expect(getElementById.mock.calls).toEqual([[buttonId]]);
		expect(editor.style.top).toBe('100px');
		expect(editor.style.left).toBe('200px');
		expect(setAttribute.mock.calls).toEqual([
			['aria-expanded', 'true'],
			['aria-controls', 'editor'],
		]);
		expect(addEventListener.mock.calls).toEqual([['scroll', anyFunction, {passive: true, capture: true}]]);
		expect(createFocusTrap.mock.calls).toEqual([
			[editor, {setReturnFocus: button, clickOutsideDeactivates: anyFunction, onDeactivate: onClose}],
		]);
		expect(activate.mock.calls).toEqual([[]]);

		button.getBoundingClientRect = () => ({top: 330, bottom: 350, left: 300, right: 400});
		addEventListener.mock.calls[0][1]();
		expect(editor.style.top).toBe('180px');
		expect(editor.style.left).toBe('350px');

		const {clickOutsideDeactivates} = createFocusTrap.mock.calls[0][1];
		expect(clickOutsideDeactivates({target: {closest}})).toBe(false);
		expect(closest.mock.calls).toEqual([['[role="listbox"]']]);

		remove();
		expect(removeAttribute.mock.calls).toEqual([['aria-expanded'], ['aria-controls']]);
		expect(removeEventListener.mock.calls).toEqual(addEventListener.mock.calls);
		expect(deactivate.mock.calls).toEqual([[]]);
	});

	it('places the editor at the page top when the it is too tall', () => {
		const setAttribute = jest.fn();
		const editor = {id: 'editor', style: {}, getBoundingClientRect: () => ({width: 50, height: 500})};
		const button = {setAttribute, getBoundingClientRect: () => ({top: 80, bottom: 100, left: 200})};
		const ref = {current: editor};
		const buttonId = 'buttonId';
		getElementById.mockReturnValueOnce(button);

		useAreaEditorPositioner(ref, buttonId, null);
		expect(useLayoutEffect.mock.calls).toEqual([[expect.any(Function), [ref, buttonId, null]]]);
		useLayoutEffect.mock.calls[0][0]();
		expect(getElementById.mock.calls).toEqual([[buttonId]]);
		expect(editor.style.top).toBe('0px');
		expect(editor.style.left).toBe('200px');
	});
});
