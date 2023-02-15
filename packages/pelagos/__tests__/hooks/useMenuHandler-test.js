import {useEffect, useLayoutEffect, useRef, useState} from 'react';

import useMenuHandler from '../../src/hooks/useMenuHandler';

jest.unmock('../../src/hooks/useMenuHandler');

const anyFunction = expect.any(Function);

global.document = {};
global.addEventListener = jest.fn();
global.removeEventListener = jest.fn();

describe('useMenuHandler', () => {
	describe('handleButtonKeyDown', () => {
		it('calls click on the target when down is pressed', () => {
			const preventDefault = jest.fn();
			const click = jest.fn();
			useState.mockReturnValueOnce([true]);
			const onKeyDown = useMenuHandler().buttonProps.onKeyDown;
			onKeyDown({keyCode: 40, preventDefault, target: {click}});

			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(click.mock.calls).toEqual([[]]);
		});

		it('ignores event if any modifier is set', () => {
			const preventDefault = jest.fn();
			useState.mockReturnValueOnce([true]);
			const onKeyDown = useMenuHandler().buttonProps.onKeyDown;
			onKeyDown({keyCode: 40, shiftKey: true, preventDefault});
			onKeyDown({keyCode: 40, ctrlKey: true, preventDefault});
			onKeyDown({keyCode: 40, altKey: true, preventDefault});
			onKeyDown({keyCode: 40, metaKey: true, preventDefault});

			expect(preventDefault.mock.calls).toEqual([]);
		});

		it('ignores event if an unknown key is pressed', () => {
			const preventDefault = jest.fn();
			useState.mockReturnValueOnce([true]);
			const onKeyDown = useMenuHandler().buttonProps.onKeyDown;
			onKeyDown({keyCode: 32, preventDefault});

			expect(preventDefault.mock.calls).toEqual([]);
		});
	});

	describe('handleButtonClick', () => {
		it('calls setMenuVisible', () => {
			const setMenuVisible = jest.fn();
			useState.mockReturnValueOnce([false, setMenuVisible]);
			useMenuHandler().buttonProps.onClick();

			expect(setMenuVisible.mock.calls).toEqual([[anyFunction]]);
			expect(setMenuVisible.mock.calls[0][0](false)).toBe(true);
		});
	});

	describe('handleMenuKeyDown', () => {
		it('ignores event if any modifier is set', () => {
			const preventDefault = jest.fn();
			useState.mockReturnValueOnce([true]);
			const onKeyDown = useMenuHandler().menuProps.onKeyDown;
			onKeyDown({keyCode: 13, shiftKey: true, preventDefault});
			onKeyDown({keyCode: 13, ctrlKey: true, preventDefault});
			onKeyDown({keyCode: 13, altKey: true, preventDefault});
			onKeyDown({keyCode: 13, metaKey: true, preventDefault});

			expect(preventDefault.mock.calls).toEqual([]);
		});

		it('calls click on the focused element when enter or space are pressed', () => {
			const setMenuVisible = jest.fn();
			const preventDefault = jest.fn();
			const click = jest.fn();
			const focus = jest.fn();
			useRef.mockReturnValueOnce({current: {focus}}).mockReturnValueOnce({current: {}});
			useState.mockReturnValueOnce([true, setMenuVisible]);
			document.activeElement = {click};
			const onKeyDown = useMenuHandler().menuProps.onKeyDown;
			onKeyDown({keyCode: 13, preventDefault});
			onKeyDown({keyCode: 32, preventDefault});

			expect(preventDefault.mock.calls).toEqual([[], []]);
			expect(setMenuVisible.mock.calls).toEqual([[false], [false]]);
			expect(click.mock.calls).toEqual([[], []]);
			expect(focus.mock.calls).toEqual([[], []]);
		});

		it('calls setMenuVisible with false when escape is pressed', () => {
			const preventDefault = jest.fn();
			const setMenuVisible = jest.fn();
			const focus = jest.fn();
			useRef.mockReturnValueOnce({current: {focus}}).mockReturnValueOnce({current: {}});
			useState.mockReturnValueOnce([true, setMenuVisible]);
			useMenuHandler().menuProps.onKeyDown({keyCode: 27, preventDefault});

			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(setMenuVisible.mock.calls).toEqual([[false]]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls focus on last item when end is pressed', () => {
			const preventDefault = jest.fn();
			const getAttribute = jest.fn();
			const focus = jest.fn();
			useRef.mockReturnValueOnce({}).mockReturnValueOnce({current: {childNodes: [{}, {getAttribute, focus}]}});
			useState.mockReturnValueOnce([true]);
			useMenuHandler().menuProps.onKeyDown({keyCode: 35, preventDefault});

			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['aria-disabled']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls focus on second last item when end is pressed and the last item is disabled', () => {
			const preventDefault = jest.fn();
			const getAttribute = jest.fn().mockReturnValueOnce('true').mockReturnValueOnce();
			const focus = jest.fn();
			useRef
				.mockReturnValueOnce({})
				.mockReturnValueOnce({current: {childNodes: [{}, {getAttribute, focus}, {getAttribute}]}});
			useState.mockReturnValueOnce([true]);
			useMenuHandler().menuProps.onKeyDown({keyCode: 35, preventDefault});

			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['aria-disabled'], ['aria-disabled']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls focus on first item when home is pressed', () => {
			const preventDefault = jest.fn();
			const getAttribute = jest.fn();
			const focus = jest.fn();
			useRef.mockReturnValueOnce({}).mockReturnValueOnce({current: {childNodes: [{getAttribute, focus}, {}]}});
			useState.mockReturnValueOnce([true]);
			useMenuHandler().menuProps.onKeyDown({keyCode: 36, preventDefault});

			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['aria-disabled']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls focus on second item when home is pressed and first item is disabled', () => {
			const preventDefault = jest.fn();
			const getAttribute = jest.fn().mockReturnValueOnce('true').mockReturnValueOnce();
			const focus = jest.fn();
			useRef
				.mockReturnValueOnce({})
				.mockReturnValueOnce({current: {childNodes: [{getAttribute}, {getAttribute, focus}, {}]}});
			useState.mockReturnValueOnce([true]);
			useMenuHandler().menuProps.onKeyDown({keyCode: 36, preventDefault});

			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['aria-disabled'], ['aria-disabled']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls focus on last item when up is pressed and first item is focused', () => {
			const preventDefault = jest.fn();
			const getAttribute = jest.fn();
			const focus = jest.fn();
			const item0 = {};
			useRef.mockReturnValueOnce({}).mockReturnValueOnce({current: {childNodes: [item0, {getAttribute, focus}]}});
			useState.mockReturnValueOnce([true]);
			document.activeElement = item0;
			useMenuHandler().menuProps.onKeyDown({keyCode: 38, preventDefault});

			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['aria-disabled']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls focus on last item when up is pressed, second item is focused, and first item is disabled', () => {
			const preventDefault = jest.fn();
			const getAttribute = jest.fn().mockReturnValueOnce('true').mockReturnValueOnce();
			const focus = jest.fn();
			const item1 = {};
			useRef
				.mockReturnValueOnce({})
				.mockReturnValueOnce({current: {childNodes: [{getAttribute}, item1, {getAttribute, focus}]}});
			useState.mockReturnValueOnce([true]);
			document.activeElement = item1;
			useMenuHandler().menuProps.onKeyDown({keyCode: 38, preventDefault});

			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['aria-disabled'], ['aria-disabled']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls focus on previous item when up is pressed and focused item is not first', () => {
			const preventDefault = jest.fn();
			const getAttribute = jest.fn();
			const focus = jest.fn();
			const item1 = {};
			useRef.mockReturnValueOnce({}).mockReturnValueOnce({current: {childNodes: [{getAttribute, focus}, item1]}});
			useState.mockReturnValueOnce([true]);
			document.activeElement = item1;
			useMenuHandler().menuProps.onKeyDown({keyCode: 38, preventDefault});

			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['aria-disabled']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls focus on second previous item when up is pressed, focused item is not first and the previous item is disabled', () => {
			const preventDefault = jest.fn();
			const getAttribute = jest.fn().mockReturnValueOnce('true').mockReturnValueOnce();
			const focus = jest.fn();
			const item2 = {};
			useRef
				.mockReturnValueOnce({})
				.mockReturnValueOnce({current: {childNodes: [{getAttribute, focus}, {getAttribute}, item2]}});
			useState.mockReturnValueOnce([true]);
			document.activeElement = item2;
			useMenuHandler().menuProps.onKeyDown({keyCode: 38, preventDefault});

			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['aria-disabled'], ['aria-disabled']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls focus on first item when down is pressed and last item is focused', () => {
			const preventDefault = jest.fn();
			const getAttribute = jest.fn();
			const focus = jest.fn();
			const item1 = {};
			useRef.mockReturnValueOnce({}).mockReturnValueOnce({current: {childNodes: [{getAttribute, focus}, item1]}});
			useState.mockReturnValueOnce([true]);
			document.activeElement = item1;
			useMenuHandler().menuProps.onKeyDown({keyCode: 40, preventDefault});

			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['aria-disabled']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls focus on first item when down is pressed and no item is focused', () => {
			const preventDefault = jest.fn();
			const getAttribute = jest.fn();
			const focus = jest.fn();
			useRef.mockReturnValueOnce({}).mockReturnValueOnce({current: {childNodes: [{getAttribute, focus}, {}]}});
			useState.mockReturnValueOnce([true]);
			document.activeElement = {};
			useMenuHandler().menuProps.onKeyDown({keyCode: 40, preventDefault});

			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['aria-disabled']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls focus on first item when down is pressed, second item is focused, and last item is disabled', () => {
			const preventDefault = jest.fn();
			const getAttribute = jest.fn().mockReturnValueOnce('true').mockReturnValueOnce();
			const focus = jest.fn();
			const item1 = {};
			useRef
				.mockReturnValueOnce({})
				.mockReturnValueOnce({current: {childNodes: [{getAttribute, focus}, item1, {getAttribute}]}});
			useState.mockReturnValueOnce([true]);
			document.activeElement = item1;
			useMenuHandler().menuProps.onKeyDown({keyCode: 40, preventDefault});

			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['aria-disabled'], ['aria-disabled']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls focus on next item when down is pressed and focused item is not last', () => {
			const preventDefault = jest.fn();
			const getAttribute = jest.fn();
			const focus = jest.fn();
			const item0 = {};
			useRef.mockReturnValueOnce({}).mockReturnValueOnce({current: {childNodes: [item0, {getAttribute, focus}]}});
			useState.mockReturnValueOnce([true]);
			document.activeElement = item0;
			useMenuHandler().menuProps.onKeyDown({keyCode: 40, preventDefault});

			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['aria-disabled']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls focus on second next item when down is pressed, focused item is not last and the next item is disabled', () => {
			const preventDefault = jest.fn();
			const getAttribute = jest.fn().mockReturnValueOnce('true').mockReturnValueOnce();
			const focus = jest.fn();
			const item0 = {};
			useRef
				.mockReturnValueOnce({})
				.mockReturnValueOnce({current: {childNodes: [item0, {getAttribute}, {getAttribute, focus}]}});
			useState.mockReturnValueOnce([true]);
			document.activeElement = item0;
			useMenuHandler().menuProps.onKeyDown({keyCode: 40, preventDefault});

			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['aria-disabled'], ['aria-disabled']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('ignores the event when an unknown key is pressed', () => {
			const preventDefault = jest.fn();
			useRef.mockReturnValueOnce({}).mockReturnValueOnce({current: {}});
			useState.mockReturnValueOnce([true]);
			useMenuHandler().menuProps.onKeyDown({keyCode: 47, preventDefault});

			expect(preventDefault).not.toHaveBeenCalled();
		});
	});

	describe('handleMenuClick', () => {
		it('calls setMenuVisible when a menu item is found', () => {
			const setMenuVisible = jest.fn();
			const focus = jest.fn();
			const closest = jest.fn().mockReturnValue({});
			useRef.mockReturnValueOnce({current: {focus}}).mockReturnValueOnce({});
			useState.mockReturnValueOnce([true, setMenuVisible]);
			useMenuHandler().menuProps.onClick({target: {closest}});

			expect(closest.mock.calls).toEqual([['li']]);
			expect(setMenuVisible.mock.calls).toEqual([[false]]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('ignores the event when the menu item is not found', () => {
			const preventDefault = jest.fn();
			const closest = jest.fn();
			useState.mockReturnValueOnce([true]);
			useMenuHandler().menuProps.onClick({preventDefault, target: {closest}});

			expect(closest.mock.calls).toEqual([['li']]);
			expect(preventDefault).not.toHaveBeenCalled();
		});
	});

	describe('handleGuardFocus', () => {
		it('calls setMenuVisible', () => {
			const setMenuVisible = jest.fn();
			const focus = jest.fn();
			useRef.mockReturnValueOnce({current: {focus}}).mockReturnValueOnce({});
			useState.mockReturnValueOnce([true, setMenuVisible]);
			useMenuHandler().guardProps.onFocus();

			expect(setMenuVisible.mock.calls).toEqual([[false]]);
			expect(focus.mock.calls).toEqual([[]]);
		});
	});

	describe('layout effect 0', () => {
		it('sets the menu position', () => {
			const getAttribute = jest.fn();
			const focus = jest.fn();
			const menu = {childNodes: [{getAttribute, focus}]};
			const button = {};
			useRef.mockReturnValueOnce({current: button}).mockReturnValueOnce({current: menu});
			useState.mockReturnValueOnce([true]);
			useMenuHandler();
			expect(useLayoutEffect.mock.calls[0]).toEqual([anyFunction, [true, undefined]]);

			useLayoutEffect.mock.calls[0][0]();
			expect(getAttribute.mock.calls).toEqual([['aria-disabled']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('does nothing when menuVisible is false', () => {
			const menu = {};
			useRef.mockReturnValueOnce({}).mockReturnValueOnce({current: menu});
			useState.mockReturnValueOnce([false]);
			useMenuHandler();
			expect(useLayoutEffect.mock.calls[0]).toEqual([anyFunction, [false, undefined]]);

			useLayoutEffect.mock.calls[0][0]();
			expect(menu).toEqual({});
		});
	});

	describe('effect 0', () => {
		it('adds a mousedown listener to window', () => {
			const target = {foo: 'test'};
			const getAttribute = jest
				.fn()
				.mockReturnValueOnce()
				.mockReturnValueOnce('true')
				.mockReturnValueOnce('true')
				.mockReturnValueOnce('true');
			const contains = jest
				.fn()
				.mockReturnValueOnce(true)
				.mockReturnValueOnce(false)
				.mockReturnValueOnce(true)
				.mockReturnValueOnce(false)
				.mockReturnValueOnce(false);
			const setMenuVisible = jest.fn();
			useRef.mockReturnValueOnce({current: {getAttribute, contains}}).mockReturnValueOnce({current: {contains}});
			useState.mockReturnValueOnce([true, setMenuVisible]);
			useMenuHandler();
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, []]);

			const remove = useEffect.mock.calls[0][0]();
			expect(addEventListener.mock.calls).toEqual([['mousedown', anyFunction, true]]);

			const handler = addEventListener.mock.calls[0][1];
			for (let i = 0; i < 4; ++i) {
				handler({target});
			}
			expect(getAttribute.mock.calls).toEqual(Array(4).fill(['aria-expanded']));
			expect(contains.mock.calls).toEqual(Array(5).fill([target]));
			expect(setMenuVisible.mock.calls).toEqual([[false]]);

			remove();
			expect(removeEventListener.mock.calls).toEqual([['mousedown', handler, true]]);
		});
	});
});
