import {useState} from 'react';

import useMenuHandler from '../../src/hooks/useMenuHandler';

jest.unmock('../../src/hooks/useMenuHandler');

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
				} = useMenuHandler(false, setExpanded);

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
				} = useMenuHandler(true, setExpanded);

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
				} = useMenuHandler();

				onKeyDown({keyCode: 13, shiftKey: true, preventDefault});
				onKeyDown({keyCode: 13, ctrlKey: true, preventDefault});
				onKeyDown({keyCode: 13, altKey: true, preventDefault});
				onKeyDown({keyCode: 13, metaKey: true, preventDefault});

				expect(preventDefault).not.toHaveBeenCalled();
			});

			it('prevents event default on enter, space and escape', () => {
				const preventDefault = jest.fn();
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler();

				onKeyDown({keyCode: 13, preventDefault});
				onKeyDown({keyCode: 32, preventDefault});
				onKeyDown({keyCode: 27, preventDefault});

				expect(preventDefault).toHaveBeenCalledTimes(3);
			});

			it('calls setCurrent with links.length - 1 when end is pressed and expanded is true', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValue([1, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(true, null, [{}, {}, {}]);

				onKeyDown({keyCode: 35, preventDefault});

				expect(setCurrent.mock.calls).toEqual([[2]]);
				expect(preventDefault).toHaveBeenCalledTimes(1);
			});

			it('does not call setCurrent when end is pressed and expanded is false', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValue([1, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(false);

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
				} = useMenuHandler(true);

				onKeyDown({keyCode: 36, preventDefault});

				expect(setCurrent.mock.calls).toEqual([[0]]);
				expect(preventDefault).toHaveBeenCalledTimes(1);
			});

			it('does not call setCurrent when home is pressed and expanded is false', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValue([1, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(false);

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
				} = useMenuHandler(true, null, [{}, {}, {}]);

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
				} = useMenuHandler(true, null, [{}, {}, {}]);

				onKeyDown({keyCode: 38, preventDefault});

				expect(setCurrent.mock.calls).toEqual([[expect.any(Function)]]);
				expect(setCurrent.mock.calls[0][0](0)).toBe(2);
				expect(preventDefault).toHaveBeenCalledTimes(1);
			});

			it('calls setCurrent with current + 1 when up is pressed, expanded is true and current is greater than 0', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValue([1, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(true, null, [{}, {}, {}]);

				onKeyDown({keyCode: 38, preventDefault});

				expect(setCurrent.mock.calls).toEqual([[expect.any(Function)]]);
				expect(setCurrent.mock.calls[0][0](1)).toBe(0);
				expect(preventDefault).toHaveBeenCalledTimes(1);
			});

			it('does not call setCurrent when up is pressed and expanded is false', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValue([1, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(false);

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
				} = useMenuHandler(true, null, [{}, {}, {}]);

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
				} = useMenuHandler(true, null, [{}, {}, {}]);

				onKeyDown({keyCode: 40, preventDefault});

				expect(setCurrent.mock.calls).toEqual([[expect.any(Function)]]);
				expect(setCurrent.mock.calls[0][0](2)).toBe(0);
				expect(preventDefault).toHaveBeenCalledTimes(1);
			});

			it('calls setCurrent with current - 1 when down is pressed, expanded is true and current is less than links.length - 1', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValue([1, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(true, null, [{}, {}, {}]);

				onKeyDown({keyCode: 40, preventDefault});

				expect(setCurrent.mock.calls).toEqual([[expect.any(Function)]]);
				expect(setCurrent.mock.calls[0][0](1)).toBe(2);
				expect(preventDefault).toHaveBeenCalledTimes(1);
			});

			it('calls setCurrent with 0 and setExpanded with true when down is pressed and expanded is false', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				const setExpanded = jest.fn();
				useState.mockReturnValue([1, setCurrent]);
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(false, setExpanded);

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
				} = useMenuHandler(false);

				onKeyDown({keyCode: 68, preventDefault, nativeEvent: {stopImmediatePropagation}});

				expect(preventDefault).not.toHaveBeenCalled();
				expect(stopImmediatePropagation).not.toHaveBeenCalled();
			});

			it('ignores the event when an unknown key is pressed', () => {
				const preventDefault = jest.fn();
				const stopImmediatePropagation = jest.fn();
				const {
					buttonProps: {onKeyDown},
				} = useMenuHandler(true);

				onKeyDown({keyCode: 47, preventDefault, nativeEvent: {stopImmediatePropagation}});
				onKeyDown({keyCode: 91, preventDefault, nativeEvent: {stopImmediatePropagation}});

				expect(preventDefault).not.toHaveBeenCalled();
				expect(stopImmediatePropagation).not.toHaveBeenCalled();
			});
		});

		describe('onKeyUp', () => {
			it('ignores event if any modifier is set', () => {
				const preventDefault = jest.fn();
				const {
					buttonProps: {onKeyUp},
				} = useMenuHandler();

				onKeyUp({keyCode: 13, shiftKey: true, preventDefault});
				onKeyUp({keyCode: 13, ctrlKey: true, preventDefault});
				onKeyUp({keyCode: 13, altKey: true, preventDefault});
				onKeyUp({keyCode: 13, metaKey: true, preventDefault});

				expect(preventDefault).not.toHaveBeenCalled();
			});

			it('calls setExpanded with true when enter is pressed and expanded is false', () => {
				const preventDefault = jest.fn();
				const setExpanded = jest.fn();
				const {
					buttonProps: {onKeyUp},
				} = useMenuHandler(false, setExpanded);

				onKeyUp({keyCode: 13, preventDefault});

				expect(setExpanded.mock.calls).toEqual([[true]]);
				expect(preventDefault).toHaveBeenCalledTimes(1);
			});

			it('calls setExpanded with false when enter is pressed and expanded is true, current is -1', () => {
				const preventDefault = jest.fn();
				const setExpanded = jest.fn();
				useState.mockReturnValue([-1]);
				const {
					buttonProps: {onKeyUp},
				} = useMenuHandler(true, setExpanded);

				onKeyUp({keyCode: 13, preventDefault});

				expect(setExpanded.mock.calls).toEqual([[false]]);
				expect(preventDefault).toHaveBeenCalledTimes(1);
			});

			it('calls the item handler when enter is pressed and expanded is true, current is not -1', () => {
				const setExpanded = jest.fn();
				const preventDefault = jest.fn();
				const handler = jest.fn();
				const link = {handler};
				useState.mockReturnValue([0]);
				const {
					buttonProps: {onKeyUp},
				} = useMenuHandler(true, setExpanded, [link]);

				onKeyUp({keyCode: 13, preventDefault});

				expect(handler).toHaveBeenCalledTimes(1);
				expect(preventDefault).toHaveBeenCalledTimes(1);
				expect(setExpanded.mock.calls).toEqual([[false]]);
			});

			it('calls the item handler when space is pressed and expanded is true, current is not -1', () => {
				const setExpanded = jest.fn();
				const preventDefault = jest.fn();
				const handler = jest.fn();
				const link = {handler};
				useState.mockReturnValue([0]);
				const {
					buttonProps: {onKeyUp},
				} = useMenuHandler(true, setExpanded, [link]);

				onKeyUp({keyCode: 32, preventDefault});

				expect(handler).toHaveBeenCalledTimes(1);
				expect(preventDefault).toHaveBeenCalledTimes(1);
				expect(setExpanded.mock.calls).toEqual([[false]]);
			});

			it('calls the item handler when space is pressed, expanded is true, current is not -1, and keepExpanded is true', () => {
				const setExpanded = jest.fn();
				const preventDefault = jest.fn();
				const handler = jest.fn();
				const link = {handler};
				useState.mockReturnValue([0]);
				const {
					buttonProps: {onKeyUp},
				} = useMenuHandler(true, setExpanded, [link], true);

				onKeyUp({keyCode: 32, preventDefault});

				expect(handler).toHaveBeenCalledTimes(1);
				expect(preventDefault).toHaveBeenCalledTimes(1);
				expect(setExpanded).not.toHaveBeenCalled();
			});

			it('calls setExpanded with false and setCurrent with -1 when escape is pressed', () => {
				const preventDefault = jest.fn();
				const setExpanded = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValue([1, setCurrent]);
				const {
					buttonProps: {onKeyUp},
				} = useMenuHandler(false, setExpanded);

				onKeyUp({keyCode: 27, preventDefault});

				expect(setExpanded.mock.calls).toEqual([[false]]);
				expect(setCurrent.mock.calls).toEqual([[-1]]);
				expect(preventDefault).toHaveBeenCalledTimes(1);
			});
		});

		describe('onBlur', () => {
			it('calls setCurrent with -1 and setExpanded with false when keepExpanded is false', () => {
				const setCurrent = jest.fn();
				const setExpanded = jest.fn();
				useState.mockReturnValue([1, setCurrent]);
				const {
					buttonProps: {onBlur},
				} = useMenuHandler(true, setExpanded);

				onBlur();

				expect(setCurrent.mock.calls).toEqual([[-1]]);
				expect(setExpanded.mock.calls).toEqual([[false]]);
			});

			it('calls setCurrent with -1 but not setExpanded when keepExpanded is true', () => {
				const setCurrent = jest.fn();
				const setExpanded = jest.fn();
				useState.mockReturnValue([1, setCurrent]);
				const {
					buttonProps: {onBlur},
				} = useMenuHandler(true, setExpanded, [], true);

				onBlur();

				expect(setCurrent.mock.calls).toEqual([[-1]]);
				expect(setExpanded).not.toHaveBeenCalled();
			});
		});
	});

	describe('listProps', () => {
		describe('onMouseOver', () => {
			it('calls setCurrent when a menu item is found', () => {
				const preventDefault = jest.fn();
				const element = {dataset: {index: '0'}};
				const closest = jest.fn().mockReturnValue(element);
				const event = {preventDefault, target: {closest}};
				const setCurrent = jest.fn();
				useState.mockReturnValue([1, setCurrent]);
				const {
					listProps: {onMouseOver},
				} = useMenuHandler();

				onMouseOver(event);

				expect(setCurrent.mock.calls).toEqual([[0]]);
			});

			it('ignores the event when the menu item is not found', () => {
				const preventDefault = jest.fn();
				const closest = jest.fn();
				const event = {preventDefault, target: {closest}};
				const setCurrent = jest.fn();
				useState.mockReturnValue([1, setCurrent]);
				const {
					listProps: {onMouseOver},
				} = useMenuHandler();

				onMouseOver(event);

				expect(setCurrent).not.toHaveBeenCalled();
			});
		});

		describe('onMouseDown', () => {
			it('calls preventDefault on the event', () => {
				const preventDefault = jest.fn();
				const event = {preventDefault};
				const {
					listProps: {onMouseDown},
				} = useMenuHandler();

				onMouseDown(event);

				expect(preventDefault).toHaveBeenCalledTimes(1);
			});
		});

		describe('onMouseUp', () => {
			it('calls the item handler when a menu item is found', () => {
				const setExpanded = jest.fn();
				const preventDefault = jest.fn();
				const element = {dataset: {index: '0'}};
				const closest = jest.fn().mockReturnValue(element);
				const event = {preventDefault, target: {closest}};
				const handler = jest.fn();
				const link = {handler};
				const {
					listProps: {onMouseUp},
				} = useMenuHandler(true, setExpanded, [link]);

				onMouseUp(event);

				expect(closest.mock.calls).toEqual([['[role="menuitem"]']]);
				expect(preventDefault).toHaveBeenCalledTimes(1);
				expect(handler).toHaveBeenCalledTimes(1);
				expect(setExpanded.mock.calls).toEqual([[false]]);
			});

			it('calls the item handler when a menu item is found and keepExpanded is true', () => {
				const setExpanded = jest.fn();
				const preventDefault = jest.fn();
				const element = {dataset: {index: '0'}};
				const closest = jest.fn().mockReturnValue(element);
				const event = {preventDefault, target: {closest}};
				const handler = jest.fn();
				const link = {handler};
				const {
					listProps: {onMouseUp},
				} = useMenuHandler(true, setExpanded, [link], true);

				onMouseUp(event);

				expect(closest.mock.calls).toEqual([['[role="menuitem"]']]);
				expect(preventDefault).toHaveBeenCalledTimes(1);
				expect(handler).toHaveBeenCalledTimes(1);
				expect(setExpanded).not.toHaveBeenCalled();
			});

			it('ignores the event when the menu item is not found', () => {
				const preventDefault = jest.fn();
				const closest = jest.fn();
				const event = {preventDefault, target: {closest}};
				const handler = jest.fn();
				const link = {handler};
				const {
					listProps: {onMouseUp},
				} = useMenuHandler(true, null, [link]);

				onMouseUp(event);

				expect(closest.mock.calls).toEqual([['[role="menuitem"]']]);
				expect(preventDefault).not.toHaveBeenCalled();
				expect(handler).not.toHaveBeenCalled();
			});
		});

		describe('onMouseOut', () => {
			it('calls setCurrent with -1', () => {
				const setCurrent = jest.fn();
				useState.mockReturnValue([1, setCurrent]);
				const {
					listProps: {onMouseOut},
				} = useMenuHandler(false);

				onMouseOut();

				expect(setCurrent.mock.calls).toEqual([[-1]]);
			});
		});
	});
});
