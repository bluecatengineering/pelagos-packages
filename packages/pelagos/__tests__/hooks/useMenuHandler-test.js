import {useLayoutEffect, useRef, useState} from 'react';

import useMenuHandler from '../../src/hooks/useMenuHandler';
import createPopUpTrap from '../../src/functions/createPopUpTrap';

jest.unmock('../../src/hooks/useMenuHandler');

const anyFunction = expect.any(Function);

global.document = {addEventListener: jest.fn(), removeEventListener: jest.fn()};
global.window = {addEventListener: jest.fn(), removeEventListener: jest.fn()};

describe('useMenuHandler', () => {
	describe('handleButtonKeyDown', () => {
		it('calls click on the target when down is pressed', () => {
			const preventDefault = jest.fn();
			const click = jest.fn();
			useState.mockReturnValueOnce([true]);
			const onKeyDown = useMenuHandler().buttonProps.onKeyDown;
			onKeyDown({key: 'ArrowDown', preventDefault, target: {click}});

			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(click.mock.calls).toEqual([[]]);
		});

		it('ignores event if any modifier is set', () => {
			const preventDefault = jest.fn();
			useState.mockReturnValueOnce([true]);
			const onKeyDown = useMenuHandler().buttonProps.onKeyDown;
			onKeyDown({key: 'ArrowDown', shiftKey: true, preventDefault});
			onKeyDown({key: 'ArrowDown', ctrlKey: true, preventDefault});
			onKeyDown({key: 'ArrowDown', altKey: true, preventDefault});
			onKeyDown({key: 'ArrowDown', metaKey: true, preventDefault});

			expect(preventDefault.mock.calls).toEqual([]);
		});

		it('ignores event if an unknown key is pressed', () => {
			const preventDefault = jest.fn();
			useState.mockReturnValueOnce([true]);
			const onKeyDown = useMenuHandler().buttonProps.onKeyDown;
			onKeyDown({key: ' ', preventDefault});

			expect(preventDefault.mock.calls).toEqual([]);
		});
	});

	describe('handleButtonClick', () => {
		it('calls setMenuVisible', () => {
			const setMenuVisible = jest.fn();
			useState.mockReturnValueOnce([false, setMenuVisible]);
			useMenuHandler().buttonProps.onClick();

			expect(setMenuVisible.mock.calls).toEqual([[true]]);
		});
	});

	describe('handleMenuKeyDown', () => {
		it('ignores event if any modifier is set', () => {
			const preventDefault = jest.fn();
			const onKeyDown = useMenuHandler().menuProps.onKeyDown;
			onKeyDown({key: 'Enter', shiftKey: true, preventDefault});
			onKeyDown({key: 'Enter', ctrlKey: true, preventDefault});
			onKeyDown({key: 'Enter', altKey: true, preventDefault});
			onKeyDown({key: 'Enter', metaKey: true, preventDefault});

			expect(preventDefault.mock.calls).toEqual([]);
		});

		it('ignores event if any modifier except shift is set when key is Tab', () => {
			const preventDefault = jest.fn();
			const onKeyDown = useMenuHandler().menuProps.onKeyDown;
			onKeyDown({key: 'Tab', ctrlKey: true, preventDefault});
			onKeyDown({key: 'Tab', altKey: true, preventDefault});
			onKeyDown({key: 'Tab', metaKey: true, preventDefault});

			expect(preventDefault.mock.calls).toEqual([]);
		});

		it('calls setExpanded when Tab is pressed', () => {
			const setExpanded = jest.fn();
			const preventDefault = jest.fn();
			useRef.mockReturnValueOnce({}).mockReturnValueOnce({current: {}});
			useState.mockReturnValueOnce([true, setExpanded]);
			const onKeyDown = useMenuHandler().menuProps.onKeyDown;
			onKeyDown({key: 'Tab', preventDefault});
			onKeyDown({key: 'Tab', shiftKey: true, preventDefault});

			expect(preventDefault.mock.calls).toEqual([[], []]);
			expect(setExpanded.mock.calls).toEqual([[false], [false]]);
		});

		it('calls click on the focused element when enter or space are pressed', () => {
			const setExpanded = jest.fn();
			const preventDefault = jest.fn();
			const getAttribute = jest.fn();
			const click = jest.fn();
			useRef.mockReturnValueOnce({}).mockReturnValueOnce({current: {}});
			useState.mockReturnValueOnce([true, setExpanded]);
			document.activeElement = {getAttribute, click};
			const onKeyDown = useMenuHandler().menuProps.onKeyDown;
			onKeyDown({key: 'Enter', preventDefault});
			onKeyDown({key: ' ', preventDefault});

			expect(preventDefault.mock.calls).toEqual([[], []]);
			expect(getAttribute.mock.calls).toEqual([['aria-disabled'], ['aria-disabled']]);
			expect(setExpanded.mock.calls).toEqual([[false], [false]]);
			expect(click.mock.calls).toEqual([[], []]);
		});

		it('does not call click on the focused element when enter is pressed and the element is disabled', () => {
			const preventDefault = jest.fn();
			const getAttribute = jest.fn().mockReturnValueOnce('true');
			const click = jest.fn();
			useRef.mockReturnValueOnce({}).mockReturnValueOnce({current: {}});
			document.activeElement = {getAttribute, click};
			const onKeyDown = useMenuHandler().menuProps.onKeyDown;
			onKeyDown({key: 'Enter', preventDefault});

			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['aria-disabled']]);
			expect(click.mock.calls).toEqual([]);
		});

		it('calls focus on last item when end is pressed', () => {
			const preventDefault = jest.fn();
			const getAttribute = jest.fn().mockReturnValueOnce('menuitem');
			const focus = jest.fn();
			useRef.mockReturnValueOnce({}).mockReturnValueOnce({current: {childNodes: [{}, {getAttribute, focus}]}});
			useState.mockReturnValueOnce([true]);
			useMenuHandler().menuProps.onKeyDown({key: 'End', preventDefault});

			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['role']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls focus on first item when home is pressed', () => {
			const preventDefault = jest.fn();
			const getAttribute = jest.fn().mockReturnValueOnce('menuitem');
			const focus = jest.fn();
			useRef.mockReturnValueOnce({}).mockReturnValueOnce({current: {childNodes: [{getAttribute, focus}, {}]}});
			useState.mockReturnValueOnce([true]);
			useMenuHandler().menuProps.onKeyDown({key: 'Home', preventDefault});

			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['role']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls focus on last item when up is pressed and first item is focused', () => {
			const preventDefault = jest.fn();
			const getAttribute = jest.fn().mockReturnValueOnce('menuitem');
			const focus = jest.fn();
			const item0 = {};
			useRef.mockReturnValueOnce({}).mockReturnValueOnce({current: {childNodes: [item0, {getAttribute, focus}]}});
			useState.mockReturnValueOnce([true]);
			document.activeElement = item0;
			useMenuHandler().menuProps.onKeyDown({key: 'ArrowUp', preventDefault});

			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['role']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls focus on previous item when up is pressed and focused item is not first', () => {
			const preventDefault = jest.fn();
			const getAttribute = jest.fn().mockReturnValueOnce('menuitem');
			const focus = jest.fn();
			const item1 = {};
			useRef.mockReturnValueOnce({}).mockReturnValueOnce({current: {childNodes: [{getAttribute, focus}, item1]}});
			useState.mockReturnValueOnce([true]);
			document.activeElement = item1;
			useMenuHandler().menuProps.onKeyDown({key: 'ArrowUp', preventDefault});

			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['role']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls focus on second previous item when up is pressed, focused item is not first and the previous item is a separator', () => {
			const preventDefault = jest.fn();
			const getAttribute = jest.fn().mockReturnValueOnce('separator').mockReturnValueOnce('menuitem');
			const focus = jest.fn();
			const item2 = {};
			useRef
				.mockReturnValueOnce({})
				.mockReturnValueOnce({current: {childNodes: [{getAttribute, focus}, {getAttribute}, item2]}});
			useState.mockReturnValueOnce([true]);
			document.activeElement = item2;
			useMenuHandler().menuProps.onKeyDown({key: 'ArrowUp', preventDefault});

			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['role'], ['role']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls focus on first item when down is pressed and last item is focused', () => {
			const preventDefault = jest.fn();
			const getAttribute = jest.fn().mockReturnValueOnce('menuitem');
			const focus = jest.fn();
			const item1 = {};
			useRef.mockReturnValueOnce({}).mockReturnValueOnce({current: {childNodes: [{getAttribute, focus}, item1]}});
			useState.mockReturnValueOnce([true]);
			document.activeElement = item1;
			useMenuHandler().menuProps.onKeyDown({key: 'ArrowDown', preventDefault});

			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['role']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls focus on first item when down is pressed and no item is focused', () => {
			const preventDefault = jest.fn();
			const getAttribute = jest.fn().mockReturnValueOnce('menuitem');
			const focus = jest.fn();
			useRef.mockReturnValueOnce({}).mockReturnValueOnce({current: {childNodes: [{getAttribute, focus}, {}]}});
			useState.mockReturnValueOnce([true]);
			document.activeElement = {};
			useMenuHandler().menuProps.onKeyDown({key: 'ArrowDown', preventDefault});

			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['role']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls focus on next item when down is pressed and focused item is not last', () => {
			const preventDefault = jest.fn();
			const getAttribute = jest.fn().mockReturnValueOnce('menuitem');
			const focus = jest.fn();
			const item0 = {};
			useRef.mockReturnValueOnce({}).mockReturnValueOnce({current: {childNodes: [item0, {getAttribute, focus}]}});
			useState.mockReturnValueOnce([true]);
			document.activeElement = item0;
			useMenuHandler().menuProps.onKeyDown({key: 'ArrowDown', preventDefault});

			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['role']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('ignores the event when an unknown key is pressed', () => {
			const preventDefault = jest.fn();
			useRef.mockReturnValueOnce({}).mockReturnValueOnce({current: {}});
			useState.mockReturnValueOnce([true]);
			useMenuHandler().menuProps.onKeyDown({key: 'Other', preventDefault});

			expect(preventDefault).not.toHaveBeenCalled();
		});
	});

	describe('handleMenuClick', () => {
		it('calls setExpanded when a menu item is found', () => {
			const setExpanded = jest.fn();
			const closest = jest.fn().mockReturnValue({});
			useRef.mockReturnValueOnce({}).mockReturnValueOnce({});
			useState.mockReturnValueOnce([true, setExpanded]);
			useMenuHandler().menuProps.onClick({target: {closest}});

			expect(closest.mock.calls).toEqual([['li']]);
			expect(setExpanded.mock.calls).toEqual([[false]]);
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

	describe('layout effect 0', () => {
		it('sets the menu position', () => {
			const getAttribute = jest.fn().mockReturnValueOnce('menuitem');
			const firstChild = {getAttribute};
			const menu = {childNodes: [firstChild]};
			const button = {};
			const setExpanded = jest.fn();
			const setPopUpPosition = jest.fn();
			const activate = jest.fn();
			const deactivate = jest.fn();
			const trap = {activate, deactivate};
			useRef.mockReturnValueOnce({current: button}).mockReturnValueOnce({current: menu});
			useState.mockReturnValueOnce([true, setExpanded]);
			createPopUpTrap.mockReturnValue(trap);
			useMenuHandler(setPopUpPosition);
			expect(useLayoutEffect.mock.calls[0]).toEqual([anyFunction, [true, setPopUpPosition]]);

			const remove = useLayoutEffect.mock.calls[0][0]();
			expect(getAttribute.mock.calls).toEqual([['role']]);
			expect(document.addEventListener.mock.calls).toEqual([['scroll', anyFunction, {passive: true, capture: true}]]);
			expect(window.addEventListener.mock.calls).toEqual([['resize', anyFunction, {passive: true, capture: true}]]);
			expect(createPopUpTrap.mock.calls).toEqual([
				[menu, button, {initialFocus: firstChild, onDeactivate: anyFunction}],
			]);
			expect(activate.mock.calls).toEqual([[]]);

			const {onDeactivate} = createPopUpTrap.mock.calls[0][2];

			onDeactivate();
			expect(setExpanded.mock.calls).toEqual([[false]]);

			const onScroll = document.addEventListener.mock.calls[0][1];
			onScroll();

			expect(setPopUpPosition.mock.calls).toEqual([
				[button, menu],
				[button, menu],
			]);

			const onResize = window.addEventListener.mock.calls[0][1];
			onResize();

			expect(setPopUpPosition.mock.calls).toEqual([
				[button, menu],
				[button, menu],
				[button, menu],
			]);

			remove();
			expect(document.removeEventListener.mock.calls).toEqual(document.addEventListener.mock.calls);
			expect(window.removeEventListener.mock.calls).toEqual(window.addEventListener.mock.calls);
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
});
