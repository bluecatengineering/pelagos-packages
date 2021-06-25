import {useState} from 'react';

import useMenuHandler from '../../src/hooks/useMenuHandler';

jest.unmock('../../src/hooks/useMenuHandler');

const getItemText = () => '';

describe('useMenuHandler', () => {
	describe('buttonProps', () => {
		describe('onMouseDown', () => {
			it('calls setExpanded with true when expanded is false', () => {
				const setExpanded = jest.fn();
				const preventDefault = jest.fn();
				const focus = jest.fn();
				const element = {focus};
				const closest = jest.fn().mockReturnValue(element);
				const event = {preventDefault, target: {closest}};
				const {
					buttonProps: {onMouseDown},
				} = useMenuHandler(false, setExpanded, []);

				onMouseDown(event);

				expect(preventDefault).toHaveBeenCalledTimes(1);
				expect(closest.mock.calls).toEqual([['[role="button"]']]);
				expect(focus).toHaveBeenCalledTimes(1);
				expect(setExpanded.mock.calls).toEqual([[expect.any(Function)]]);
				expect(setExpanded.mock.calls[0][0](false)).toBe(true);
			});

			it('calls setExpanded with false when expanded is true', () => {
				const setExpanded = jest.fn();
				const setCurrent = jest.fn();
				const preventDefault = jest.fn();
				const focus = jest.fn();
				const element = {focus};
				const closest = jest.fn().mockReturnValue(element);
				const event = {preventDefault, target: {closest}};
				useState.mockReturnValue([-1, setCurrent]);
				const {
					buttonProps: {onMouseDown},
				} = useMenuHandler(true, setExpanded, []);

				onMouseDown(event);

				expect(event.preventDefault).toHaveBeenCalledTimes(1);
				expect(setExpanded.mock.calls).toEqual([[expect.any(Function)]]);
				expect(setExpanded.mock.calls[0][0](true)).toBe(false);
				expect(setCurrent.mock.calls).toEqual([[-1]]);
			});
		});

		describe('onKeyDown', () => {
			it('ignores event if any modifier is set', () => {
				const preventDefault = jest.fn();
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(true, null, []);

				onKeyDown({keyCode: 13, shiftKey: true, preventDefault});
				onKeyDown({keyCode: 13, ctrlKey: true, preventDefault});
				onKeyDown({keyCode: 13, altKey: true, preventDefault});
				onKeyDown({keyCode: 13, metaKey: true, preventDefault});

				expect(preventDefault).not.toHaveBeenCalled();
			});

			it('ignores the event when enter is pressed and all items are disabled', () => {
				const preventDefault = jest.fn();
				const setExpanded = jest.fn();
				const isItemDisabled = jest.fn().mockReturnValue(true);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(false, setExpanded, [{}], {getItemText, isItemDisabled});

				onKeyDown({keyCode: 13, preventDefault});

				expect(preventDefault).not.toHaveBeenCalled();
			});

			it('calls setExpanded with true when enter is pressed and expanded is false', () => {
				const preventDefault = jest.fn();
				const setExpanded = jest.fn();
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(false, setExpanded, [{}], {getItemText});

				onKeyDown({keyCode: 13, preventDefault});

				expect(setExpanded.mock.calls).toEqual([[true]]);
				expect(preventDefault).toHaveBeenCalledTimes(1);
			});

			it('calls setExpanded with false when enter is pressed and expanded is true, current is -1', () => {
				const preventDefault = jest.fn();
				const setExpanded = jest.fn();
				useState.mockReturnValue([-1]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(true, setExpanded, [{}], {getItemText});

				onKeyDown({keyCode: 13, preventDefault});

				expect(setExpanded.mock.calls).toEqual([[false]]);
				expect(preventDefault).toHaveBeenCalledTimes(1);
			});

			it('calls the item handler when enter is pressed and expanded is true, current is not -1', () => {
				const setCurrent = jest.fn();
				const setExpanded = jest.fn();
				const preventDefault = jest.fn();
				const handler = jest.fn();
				const link = {text: '', handler};
				useState.mockReturnValue([0, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(true, setExpanded, [link]);

				onKeyDown({keyCode: 13, preventDefault});

				expect(handler).toHaveBeenCalledTimes(1);
				expect(preventDefault).toHaveBeenCalledTimes(1);
				expect(setCurrent.mock.calls).toEqual([[-1]]);
				expect(setExpanded.mock.calls).toEqual([[false]]);
			});

			it('does not call the item handler when enter is pressed and expanded is true, current is not -1, isItemDisabled returns true', () => {
				const setCurrent = jest.fn();
				const setExpanded = jest.fn();
				const preventDefault = jest.fn();
				const handler = jest.fn();
				const link = {handler};
				const isItemDisabled = jest.fn((item) => item === link);
				useState.mockReturnValue([0, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(true, setExpanded, [link, {}], {getItemText, isItemDisabled});

				onKeyDown({keyCode: 13, preventDefault});

				expect(handler).not.toHaveBeenCalled();
				expect(preventDefault).toHaveBeenCalledTimes(1);
				expect(setCurrent).not.toHaveBeenCalled();
				expect(setExpanded).not.toHaveBeenCalled();
			});

			it('calls the item handler when space is pressed and expanded is true, current is not -1', () => {
				const setCurrent = jest.fn();
				const setExpanded = jest.fn();
				const preventDefault = jest.fn();
				const handler = jest.fn();
				const link = {text: '', handler};
				useState.mockReturnValue([0, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(true, setExpanded, [link]);

				onKeyDown({keyCode: 32, preventDefault});

				expect(handler).toHaveBeenCalledTimes(1);
				expect(preventDefault).toHaveBeenCalledTimes(1);
				expect(setCurrent.mock.calls).toEqual([[-1]]);
				expect(setExpanded.mock.calls).toEqual([[false]]);
			});

			it('calls setExpanded with false and setCurrent with -1 when escape is pressed', () => {
				const preventDefault = jest.fn();
				const setExpanded = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValue([1, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(false, setExpanded, [{}], {getItemText});

				onKeyDown({keyCode: 27, preventDefault});

				expect(setExpanded.mock.calls).toEqual([[false]]);
				expect(setCurrent.mock.calls).toEqual([[-1]]);
				expect(preventDefault).toHaveBeenCalledTimes(1);
			});

			it('calls setCurrent with links.length - 1 when end is pressed and expanded is true', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValue([1, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(true, null, [{}, {}, {}], {getItemText});

				onKeyDown({keyCode: 35, preventDefault});

				expect(setCurrent.mock.calls).toEqual([[2]]);
				expect(preventDefault).toHaveBeenCalledTimes(1);
			});

			it('calls setCurrent with links.length - 2 when end is pressed, expanded is true and the last item is disabled', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				const last = {};
				const isItemDisabled = jest.fn((item) => item === last);
				useState.mockReturnValue([1, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(true, null, [{}, {}, last], {getItemText, isItemDisabled});

				onKeyDown({keyCode: 35, preventDefault});

				expect(setCurrent.mock.calls).toEqual([[1]]);
				expect(preventDefault).toHaveBeenCalledTimes(1);
			});

			it('does not call setCurrent when end is pressed and expanded is false', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValue([1, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(false, null, [{}], {getItemText});

				onKeyDown({keyCode: 35, preventDefault});

				expect(setCurrent).not.toHaveBeenCalled();
				expect(preventDefault).toHaveBeenCalledTimes(1);
			});

			it('calls setCurrent with 0 when home is pressed and expanded is true', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValue([1, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(true, null, [{}], {getItemText});

				onKeyDown({keyCode: 36, preventDefault});

				expect(setCurrent.mock.calls).toEqual([[0]]);
				expect(preventDefault).toHaveBeenCalledTimes(1);
			});

			it('calls setCurrent with 1 when home is pressed, expanded is true and the first item is disabled', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				const first = {};
				const isItemDisabled = jest.fn((item) => item === first);
				useState.mockReturnValue([1, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(true, null, [first, {}], {getItemText, isItemDisabled});

				onKeyDown({keyCode: 36, preventDefault});

				expect(setCurrent.mock.calls).toEqual([[1]]);
				expect(preventDefault).toHaveBeenCalledTimes(1);
			});

			it('does not call setCurrent when home is pressed and expanded is false', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValue([1, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(false, null, [{}], {getItemText});

				onKeyDown({keyCode: 36, preventDefault});

				expect(setCurrent).not.toHaveBeenCalled();
				expect(preventDefault).toHaveBeenCalledTimes(1);
			});

			it('calls setCurrent with links.length - 1 when up is pressed, expanded is true and current is -1', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValue([-1, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(true, null, [{}, {}, {}], {getItemText});

				onKeyDown({keyCode: 38, preventDefault});

				expect(setCurrent.mock.calls).toEqual([[expect.any(Function)]]);
				expect(setCurrent.mock.calls[0][0](-1)).toBe(2);
				expect(preventDefault).toHaveBeenCalledTimes(1);
			});

			it('calls setCurrent with links.length - 1 when up is pressed, expanded is true and current is 0', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValue([0, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(true, null, [{}, {}, {}], {getItemText});

				onKeyDown({keyCode: 38, preventDefault});

				expect(setCurrent.mock.calls).toEqual([[expect.any(Function)]]);
				expect(setCurrent.mock.calls[0][0](0)).toBe(2);
				expect(preventDefault).toHaveBeenCalledTimes(1);
			});

			it('calls setCurrent with links.length - 1 when up is pressed, expanded is true, current is 1, and first item is disabled', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				const first = {};
				const isItemDisabled = jest.fn((item) => item === first);
				useState.mockReturnValue([1, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(true, null, [first, {}, {}], {getItemText, isItemDisabled});

				onKeyDown({keyCode: 38, preventDefault});

				expect(setCurrent.mock.calls).toEqual([[expect.any(Function)]]);
				expect(setCurrent.mock.calls[0][0](1)).toBe(2);
				expect(preventDefault).toHaveBeenCalledTimes(1);
			});

			it('calls setCurrent with current - 1 when up is pressed, expanded is true and current is greater than 0', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValue([1, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(true, null, [{}, {}, {}], {getItemText});

				onKeyDown({keyCode: 38, preventDefault});

				expect(setCurrent.mock.calls).toEqual([[expect.any(Function)]]);
				expect(setCurrent.mock.calls[0][0](1)).toBe(0);
				expect(preventDefault).toHaveBeenCalledTimes(1);
			});

			it('calls setCurrent with current - 2 when up is pressed, expanded is true, current is greater than 0 and the previous item is disabled', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				const previous = {};
				const isItemDisabled = jest.fn((item) => item === previous);
				useState.mockReturnValue([2, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(true, null, [{}, previous, {}], {getItemText, isItemDisabled});

				onKeyDown({keyCode: 38, preventDefault});

				expect(setCurrent.mock.calls).toEqual([[expect.any(Function)]]);
				expect(setCurrent.mock.calls[0][0](2)).toBe(0);
				expect(preventDefault).toHaveBeenCalledTimes(1);
			});

			it('does not call setCurrent when up is pressed and expanded is false', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValue([1, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(false, null, [{}], {getItemText});

				onKeyDown({keyCode: 38, preventDefault});

				expect(setCurrent).not.toHaveBeenCalled();
				expect(preventDefault).toHaveBeenCalledTimes(1);
			});

			it('calls setCurrent with 0 when down is pressed, expanded is true and current is -1', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValue([-1, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(true, null, [{}, {}, {}], {getItemText});

				onKeyDown({keyCode: 40, preventDefault});

				expect(setCurrent.mock.calls).toEqual([[expect.any(Function)]]);
				expect(setCurrent.mock.calls[0][0](-1)).toBe(0);
				expect(preventDefault).toHaveBeenCalledTimes(1);
			});

			it('calls setCurrent with 0 when down is pressed, expanded is true and current is links.length - 1', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValue([2, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(true, null, [{}, {}, {}], {getItemText});

				onKeyDown({keyCode: 40, preventDefault});

				expect(setCurrent.mock.calls).toEqual([[expect.any(Function)]]);
				expect(setCurrent.mock.calls[0][0](2)).toBe(0);
				expect(preventDefault).toHaveBeenCalledTimes(1);
			});

			it('calls setCurrent with 0 when down is pressed, expanded is true, current is links.length - 2, and last item is disabled', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				const last = {};
				const isItemDisabled = jest.fn((item) => item === last);
				useState.mockReturnValue([1, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(true, null, [{}, {}, last], {getItemText, isItemDisabled});

				onKeyDown({keyCode: 40, preventDefault});

				expect(setCurrent.mock.calls).toEqual([[expect.any(Function)]]);
				expect(setCurrent.mock.calls[0][0](1)).toBe(0);
				expect(preventDefault).toHaveBeenCalledTimes(1);
			});

			it('calls setCurrent with current + 1 when down is pressed, expanded is true and current is less than links.length - 1', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValue([1, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(true, null, [{}, {}, {}], {getItemText});

				onKeyDown({keyCode: 40, preventDefault});

				expect(setCurrent.mock.calls).toEqual([[expect.any(Function)]]);
				expect(setCurrent.mock.calls[0][0](1)).toBe(2);
				expect(preventDefault).toHaveBeenCalledTimes(1);
			});

			it('calls setCurrent with current + 2 when down is pressed, expanded is true, current is less than links.length - 1 and the next item is disabled', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				const next = {};
				const isItemDisabled = jest.fn((item) => item === next);
				useState.mockReturnValue([0, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(true, null, [{}, next, {}], {getItemText, isItemDisabled});

				onKeyDown({keyCode: 40, preventDefault});

				expect(setCurrent.mock.calls).toEqual([[expect.any(Function)]]);
				expect(setCurrent.mock.calls[0][0](0)).toBe(2);
				expect(preventDefault).toHaveBeenCalledTimes(1);
			});

			it('calls setCurrent with 0 and setExpanded with true when down is pressed and expanded is false', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				const setExpanded = jest.fn();
				useState.mockReturnValue([1, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(false, setExpanded, [{}], {getItemText});

				onKeyDown({keyCode: 40, preventDefault});

				expect(setCurrent.mock.calls).toEqual([[0]]);
				expect(setExpanded.mock.calls).toEqual([[true]]);
				expect(preventDefault).toHaveBeenCalledTimes(1);
			});

			it('calls setCurrent with the found item index when a character key is pressed', () => {
				const preventDefault = jest.fn();
				const stopImmediatePropagation = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValue([1, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(true, null, [{text: 'a'}, {text: 'b'}, {text: 'c'}]);

				onKeyDown({keyCode: 67, preventDefault, nativeEvent: {stopImmediatePropagation}});

				expect(setCurrent.mock.calls).toEqual([[2]]);
				expect(preventDefault).toHaveBeenCalledTimes(1);
				expect(stopImmediatePropagation).toHaveBeenCalledTimes(1);
			});

			it('calls setCurrent with the found item index when a character key is pressed and the first match is disabled', () => {
				const preventDefault = jest.fn();
				const stopImmediatePropagation = jest.fn();
				const setCurrent = jest.fn();
				const match = {text: 'c'};
				const isItemDisabled = jest.fn((item) => item === match);
				useState.mockReturnValue([1, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(true, null, [{text: 'a'}, {text: 'b'}, match, {text: 'c'}], {isItemDisabled});

				onKeyDown({keyCode: 67, preventDefault, nativeEvent: {stopImmediatePropagation}});

				expect(setCurrent.mock.calls).toEqual([[3]]);
				expect(preventDefault).toHaveBeenCalledTimes(1);
				expect(stopImmediatePropagation).toHaveBeenCalledTimes(1);
			});

			it('calls setCurrent with the found item index when a character key is pressed and the search wraps around', () => {
				const preventDefault = jest.fn();
				const stopImmediatePropagation = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValue([1, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(true, null, [{text: 'a'}, {text: 'b'}, {text: 'c'}]);

				onKeyDown({keyCode: 65, preventDefault, nativeEvent: {stopImmediatePropagation}});

				expect(setCurrent.mock.calls).toEqual([[0]]);
				expect(preventDefault).toHaveBeenCalledTimes(1);
				expect(stopImmediatePropagation).toHaveBeenCalledTimes(1);
			});

			it('calls setCurrent with the found item index when two character keys are pressed', () => {
				const preventDefault = jest.fn();
				const stopImmediatePropagation = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValue([0, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(true, null, [{text: 'a'}, {text: 'bc'}, {text: 'ba'}]);

				onKeyDown({keyCode: 66, preventDefault, nativeEvent: {stopImmediatePropagation}});
				onKeyDown({keyCode: 65, preventDefault, nativeEvent: {stopImmediatePropagation}});

				expect(setCurrent.mock.calls).toEqual([[1], [2]]);
				expect(preventDefault).toHaveBeenCalledTimes(2);
				expect(stopImmediatePropagation).toHaveBeenCalledTimes(2);
			});

			it('calls setCurrent with the found item index when two character keys are pressed after the timer goes off', () => {
				const preventDefault = jest.fn();
				const stopImmediatePropagation = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValue([1, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(true, null, [{text: 'a'}, {text: 'bc'}, {text: 'ba'}]);

				onKeyDown({keyCode: 66, preventDefault, nativeEvent: {stopImmediatePropagation}});
				jest.runAllTimers();
				onKeyDown({keyCode: 65, preventDefault, nativeEvent: {stopImmediatePropagation}});

				expect(setCurrent.mock.calls).toEqual([[2], [0]]);
				expect(preventDefault).toHaveBeenCalledTimes(2);
				expect(stopImmediatePropagation).toHaveBeenCalledTimes(2);
			});

			it('does not call setCurrent when a character key is pressed and no item is found', () => {
				const preventDefault = jest.fn();
				const stopImmediatePropagation = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValue([1, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(true, null, [{text: 'a'}, {text: 'b'}, {text: 'c'}]);

				onKeyDown({keyCode: 68, preventDefault, nativeEvent: {stopImmediatePropagation}});

				expect(setCurrent).not.toHaveBeenCalled();
				expect(preventDefault).toHaveBeenCalledTimes(1);
				expect(stopImmediatePropagation).toHaveBeenCalledTimes(1);
			});

			it('ignores the event when a character key is pressed and expanded is false', () => {
				const preventDefault = jest.fn();
				const stopImmediatePropagation = jest.fn();
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(false, null, [{}], {getItemText});

				onKeyDown({keyCode: 68, preventDefault, nativeEvent: {stopImmediatePropagation}});

				expect(preventDefault).not.toHaveBeenCalled();
				expect(stopImmediatePropagation).not.toHaveBeenCalled();
			});

			it('ignores the event when an unknown key is pressed', () => {
				const preventDefault = jest.fn();
				const stopImmediatePropagation = jest.fn();
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(true, null, [{}], {getItemText});

				onKeyDown({keyCode: 47, preventDefault, nativeEvent: {stopImmediatePropagation}});
				onKeyDown({keyCode: 91, preventDefault, nativeEvent: {stopImmediatePropagation}});

				expect(preventDefault).not.toHaveBeenCalled();
				expect(stopImmediatePropagation).not.toHaveBeenCalled();
			});
		});

		describe('onBlur', () => {
			it('calls setCurrent with -1 and setExpanded with false', () => {
				const setCurrent = jest.fn();
				const setExpanded = jest.fn();
				useState.mockReturnValue([1, setCurrent]);
				const {
					buttonProps: {onBlur},
				} = useMenuHandler(true, setExpanded, []);

				onBlur();

				expect(setCurrent.mock.calls).toEqual([[-1]]);
				expect(setExpanded.mock.calls).toEqual([[false]]);
			});
		});
	});

	describe('listProps', () => {
		describe('onMouseDown', () => {
			it('calls preventDefault on the event', () => {
				const preventDefault = jest.fn();
				const event = {preventDefault};
				const {
					listProps: {onMouseDown},
				} = useMenuHandler(true, null, []);

				onMouseDown(event);

				expect(preventDefault).toHaveBeenCalledTimes(1);
			});
		});

		describe('onMouseUp', () => {
			it('calls the item handler when a menu item is found', () => {
				const setCurrent = jest.fn();
				const setExpanded = jest.fn();
				const preventDefault = jest.fn();
				const element = {dataset: {index: '0'}};
				const closest = jest.fn().mockReturnValue(element);
				const event = {preventDefault, target: {closest}};
				const handler = jest.fn();
				const link = {text: '', handler};
				useState.mockReturnValue([0, setCurrent]);
				const {
					listProps: {onMouseUp},
				} = useMenuHandler(true, setExpanded, [link]);

				onMouseUp(event);

				expect(closest.mock.calls).toEqual([['[role="menuitem"]']]);
				expect(preventDefault).toHaveBeenCalledTimes(1);
				expect(handler).toHaveBeenCalledTimes(1);
				expect(setCurrent.mock.calls).toEqual([[-1]]);
				expect(setExpanded.mock.calls).toEqual([[false]]);
			});

			it('does not call the item handler when a menu item is found and isItemDisabled returns true', () => {
				const setCurrent = jest.fn();
				const setExpanded = jest.fn();
				const isItemDisabled = jest.fn().mockReturnValue(true);
				const preventDefault = jest.fn();
				const element = {dataset: {index: '0'}};
				const closest = jest.fn().mockReturnValue(element);
				const event = {preventDefault, target: {closest}};
				const handler = jest.fn();
				const link = {text: '', handler};
				useState.mockReturnValue([0, setCurrent]);
				const {
					listProps: {onMouseUp},
				} = useMenuHandler(true, setExpanded, [link], {isItemDisabled});

				onMouseUp(event);

				expect(closest.mock.calls).toEqual([['[role="menuitem"]']]);
				expect(preventDefault).toHaveBeenCalledTimes(1);
				expect(handler).not.toHaveBeenCalled();
				expect(setCurrent).not.toHaveBeenCalled();
				expect(setExpanded).not.toHaveBeenCalled();
			});

			it('ignores the event when the menu item is not found', () => {
				const preventDefault = jest.fn();
				const closest = jest.fn();
				const event = {preventDefault, target: {closest}};
				const handler = jest.fn();
				const link = {text: '', handler};
				const {
					listProps: {onMouseUp},
				} = useMenuHandler(true, null, [link]);

				onMouseUp(event);

				expect(closest.mock.calls).toEqual([['[role="menuitem"]']]);
				expect(preventDefault).not.toHaveBeenCalled();
				expect(handler).not.toHaveBeenCalled();
			});
		});
	});
});
