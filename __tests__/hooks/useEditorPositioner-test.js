import {useEffect} from 'react';

import useEditorPositioner from '../../src/hooks/useEditorPositioner';

jest.unmock('../../src/hooks/useEditorPositioner');

describe('useEditorPositioner', () => {
	it('places the component below the specified button', () => {
		const editor = {style: {}, display: 'hidden'};
		const rect = {top: 100, left: 200, right: 300};
		const button = {getBoundingClientRect: jest.fn().mockReturnValue(rect)};
		const ref = {current: editor};
		const buttonId = 'buttonId';
		jest.spyOn(document, 'getElementById').mockReturnValueOnce(button);

		useEditorPositioner(ref, buttonId, null);
		expect(useEffect.mock.calls).toEqual([[expect.any(Function), [ref, buttonId, null]]]);
		useEffect.mock.calls[0][0]();
		expect(document.getElementById.mock.calls).toEqual([['buttonId']]);
		expect(editor.style.display).toBe('');
		expect(editor.style.top).toBe('132px');
		expect(editor.style.left).toBe('200px');
	});

	it('places the component below the specified button in a track', () => {
		const editor = {style: {}, display: 'hidden'};
		const button = {getBoundingClientRect: jest.fn().mockReturnValue({top: 100, left: 200, right: 300})};
		const tracks = {getBoundingClientRect: jest.fn().mockReturnValue({left: 100, right: 200})};
		const ref = {current: editor};
		const buttonId = 'buttonId';
		const trackId = 'trackId';
		jest
			.spyOn(document, 'getElementById')
			.mockReturnValueOnce(button)
			.mockReturnValueOnce(tracks);
		window.innerWidth = 500;

		useEditorPositioner(ref, buttonId, trackId);
		expect(useEffect.mock.calls).toEqual([[expect.any(Function), [ref, buttonId, trackId]]]);
		useEffect.mock.calls[0][0]();
		expect(document.getElementById.mock.calls).toEqual([['buttonId'], ['trackId']]);
		expect(editor.style.display).toBe('');
		expect(editor.style.top).toBe('132px');
		expect(editor.style.left).toBe('200px');
	});

	it('places the component below the specified button that is partially out of bounds', () => {
		const editor = {style: {}, display: 'hidden'};
		const button = {getBoundingClientRect: jest.fn().mockReturnValue({top: 100, left: 200, right: 300})};
		const tracks = {getBoundingClientRect: jest.fn().mockReturnValue({left: 100, right: 200})};
		const ref = {current: editor};
		const buttonId = 'buttonId';
		const trackId = 'trackId';
		jest
			.spyOn(document, 'getElementById')
			.mockReturnValueOnce(button)
			.mockReturnValueOnce(tracks);
		window.innerWidth = 300;

		useEditorPositioner(ref, buttonId, trackId);
		expect(useEffect.mock.calls).toEqual([[expect.any(Function), [ref, buttonId, trackId]]]);
		useEffect.mock.calls[0][0]();
		expect(document.getElementById.mock.calls).toEqual([['buttonId'], ['trackId']]);
		expect(editor.style.display).toBe('');
		expect(editor.style.top).toBe('132px');
		expect(editor.style.right).toBe('100px');
	});
});
