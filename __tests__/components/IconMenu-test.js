import {useLayoutEffect, useRef, useState} from 'react';
import {shallow} from 'enzyme';

import IconMenu from '../../src/components/IconMenu';
import IconMenuItem from '../../src/components/IconMenuItem';
import useRandomId from '../../src/hooks/useRandomId';
import setRefs from '../../src/functions/setRefs';

jest.unmock('../../src/components/IconMenu');

const anyFunction = expect.any(Function);

global.document = {};

useRandomId.mockReturnValue('test');

describe('IconMenu', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<IconMenu icon={{foo: 'test'}}>
					<IconMenuItem text="one" />
				</IconMenu>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(
				<IconMenu className="TestClass" icon={{foo: 'test'}}>
					<IconMenuItem text="one" />
				</IconMenu>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when disabled is set', () => {
			const wrapper = shallow(
				<IconMenu icon={{foo: 'test'}} disabled>
					<IconMenuItem text="one" />
				</IconMenu>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when all items are disabled', () => {
			const wrapper = shallow(
				<IconMenu icon={{foo: 'test'}}>
					<IconMenuItem text="one" disabled />
				</IconMenu>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when current is set', () => {
			useState.mockReturnValueOnce([1]);
			const wrapper = shallow(
				<IconMenu icon={{foo: 'test'}}>
					<IconMenuItem text="one" />
					<IconMenuItem text="two" />
				</IconMenu>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		describe('handleButtonClick', () => {
			it('calls setCurrent with index of first enabled item when current is -1', () => {
				const setCurrent = jest.fn();
				useState.mockReturnValueOnce([-1, setCurrent]);
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" disabled />
						<IconMenuItem text="two" />
					</IconMenu>
				);
				wrapper.find('#test').simulate('click');

				expect(setCurrent.mock.calls).toEqual([[anyFunction]]);
				expect(setCurrent.mock.calls[0][0](-1)).toBe(1);
			});

			it('calls setCurrent with -1 when current is not -1', () => {
				const setCurrent = jest.fn();
				useState.mockReturnValueOnce([1, setCurrent]);
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
					</IconMenu>
				);
				wrapper.find('#test').simulate('click');

				expect(setCurrent.mock.calls).toEqual([[anyFunction]]);
				expect(setCurrent.mock.calls[0][0](1)).toBe(-1);
			});
		});

		describe('handleButtonKeyDown', () => {
			it('ignores event if any current is -1', () => {
				const preventDefault = jest.fn();
				useState.mockReturnValueOnce([-1]);
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
					</IconMenu>
				);
				wrapper.find('#test').simulate('keydown', {keyCode: 13, preventDefault});

				expect(preventDefault).not.toHaveBeenCalled();
			});

			it('ignores event if any modifier is set', () => {
				const preventDefault = jest.fn();
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
					</IconMenu>
				);
				const button = wrapper.find('#test');
				button.simulate('keydown', {keyCode: 13, shiftKey: true, preventDefault});
				button.simulate('keydown', {keyCode: 13, ctrlKey: true, preventDefault});
				button.simulate('keydown', {keyCode: 13, altKey: true, preventDefault});
				button.simulate('keydown', {keyCode: 13, metaKey: true, preventDefault});

				expect(preventDefault).not.toHaveBeenCalled();
			});

			it('calls click on the current item when enter or space are pressed', () => {
				const setCurrent = jest.fn();
				const preventDefault = jest.fn();
				const click = jest.fn();
				const item = {click};
				useState.mockReturnValueOnce([0, setCurrent]);
				useRef.mockReturnValueOnce({}).mockReturnValueOnce({current: {childNodes: [item]}});
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
					</IconMenu>
				);
				const button = wrapper.find('#test');
				button.simulate('keydown', {keyCode: 13, preventDefault});
				button.simulate('keydown', {keyCode: 32, preventDefault});

				expect(preventDefault.mock.calls).toEqual([[], []]);
				expect(setCurrent.mock.calls).toEqual([[anyFunction], [anyFunction]]);

				expect(setCurrent.mock.calls[0][0](0)).toBe(-1);
				expect(click.mock.calls).toEqual([[]]);
			});

			it('calls setCurrent with -1 when escape is pressed', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValueOnce([1, setCurrent]);
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
					</IconMenu>
				);

				wrapper.find('#test').simulate('keydown', {keyCode: 27, preventDefault});

				expect(preventDefault.mock.calls).toEqual([[]]);
				expect(setCurrent.mock.calls).toEqual([[-1]]);
			});

			it('calls setCurrent with children.length - 1 when end is pressed', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValueOnce([1, setCurrent]);
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
						<IconMenuItem text="two" />
					</IconMenu>
				);

				wrapper.find('#test').simulate('keydown', {keyCode: 35, preventDefault});

				expect(preventDefault.mock.calls).toEqual([[]]);
				expect(setCurrent.mock.calls).toEqual([[1]]);
			});

			it('calls setCurrent with children.length - 2 when end is pressed and the last item is disabled', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValueOnce([1, setCurrent]);
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
						<IconMenuItem text="two" />
						<IconMenuItem text="three" disabled />
					</IconMenu>
				);

				wrapper.find('#test').simulate('keydown', {keyCode: 35, preventDefault});

				expect(preventDefault.mock.calls).toEqual([[]]);
				expect(setCurrent.mock.calls).toEqual([[1]]);
			});

			it('calls setCurrent with 0 when home is pressed', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValueOnce([1, setCurrent]);
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
						<IconMenuItem text="two" />
					</IconMenu>
				);

				wrapper.find('#test').simulate('keydown', {keyCode: 36, preventDefault});

				expect(preventDefault.mock.calls).toEqual([[]]);
				expect(setCurrent.mock.calls).toEqual([[0]]);
			});

			it('calls setCurrent with 1 when home is pressed and the first item is disabled', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValueOnce([1, setCurrent]);
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" disabled />
						<IconMenuItem text="two" />
						<IconMenuItem text="three" />
					</IconMenu>
				);

				wrapper.find('#test').simulate('keydown', {keyCode: 36, preventDefault});

				expect(preventDefault.mock.calls).toEqual([[]]);
				expect(setCurrent.mock.calls).toEqual([[1]]);
			});

			it('calls setCurrent with children.length - 1 when up is pressed and current is 0', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValueOnce([0, setCurrent]);
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
						<IconMenuItem text="two" />
					</IconMenu>
				);

				wrapper.find('#test').simulate('keydown', {keyCode: 38, preventDefault});

				expect(preventDefault.mock.calls).toEqual([[]]);
				expect(setCurrent.mock.calls).toEqual([[anyFunction]]);
				expect(setCurrent.mock.calls[0][0](0)).toBe(1);
			});

			it('calls setCurrent with children.length - 1 when up is pressed, current is 1, and first item is disabled', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValueOnce([1, setCurrent]);
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" disabled />
						<IconMenuItem text="two" />
						<IconMenuItem text="three" />
					</IconMenu>
				);

				wrapper.find('#test').simulate('keydown', {keyCode: 38, preventDefault});

				expect(preventDefault.mock.calls).toEqual([[]]);
				expect(setCurrent.mock.calls).toEqual([[expect.any(Function)]]);
				expect(setCurrent.mock.calls[0][0](1)).toBe(2);
			});

			it('calls setCurrent with current - 1 when up is pressed and current is greater than 0', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValueOnce([1, setCurrent]);
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
						<IconMenuItem text="two" />
					</IconMenu>
				);

				wrapper.find('#test').simulate('keydown', {keyCode: 38, preventDefault});

				expect(preventDefault.mock.calls).toEqual([[]]);
				expect(setCurrent.mock.calls).toEqual([[anyFunction]]);
				expect(setCurrent.mock.calls[0][0](1)).toBe(0);
			});

			it('calls setCurrent with current - 2 when up is pressed, current is greater than 0 and the previous item is disabled', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValueOnce([2, setCurrent]);
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
						<IconMenuItem text="two" disabled />
						<IconMenuItem text="three" />
					</IconMenu>
				);

				wrapper.find('#test').simulate('keydown', {keyCode: 38, preventDefault});

				expect(preventDefault.mock.calls).toEqual([[]]);
				expect(setCurrent.mock.calls).toEqual([[expect.any(Function)]]);
				expect(setCurrent.mock.calls[0][0](2)).toBe(0);
			});

			it('calls setCurrent with 0 when down is pressed and current is children.length - 1', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValueOnce([1, setCurrent]);
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
						<IconMenuItem text="two" />
					</IconMenu>
				);

				wrapper.find('#test').simulate('keydown', {keyCode: 40, preventDefault});

				expect(preventDefault.mock.calls).toEqual([[]]);
				expect(setCurrent.mock.calls).toEqual([[anyFunction]]);
				expect(setCurrent.mock.calls[0][0](1)).toBe(0);
			});

			it('calls setCurrent with 0 when down is pressed, current is children.length - 2, and last item is disabled', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValueOnce([1, setCurrent]);
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
						<IconMenuItem text="two" />
						<IconMenuItem text="three" disabled />
					</IconMenu>
				);

				wrapper.find('#test').simulate('keydown', {keyCode: 40, preventDefault});

				expect(preventDefault.mock.calls).toEqual([[]]);
				expect(setCurrent.mock.calls).toEqual([[expect.any(Function)]]);
				expect(setCurrent.mock.calls[0][0](1)).toBe(0);
			});

			it('calls setCurrent with current + 1 when down is pressed and current is less than children.length - 1', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValueOnce([0, setCurrent]);
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
						<IconMenuItem text="two" />
					</IconMenu>
				);

				wrapper.find('#test').simulate('keydown', {keyCode: 40, preventDefault});

				expect(preventDefault.mock.calls).toEqual([[]]);
				expect(setCurrent.mock.calls).toEqual([[anyFunction]]);
				expect(setCurrent.mock.calls[0][0](0)).toBe(1);
			});

			it('calls setCurrent with current + 2 when down is pressed, current is less than children.length - 1 and the next item is disabled', () => {
				const preventDefault = jest.fn();
				const setCurrent = jest.fn();
				useState.mockReturnValueOnce([0, setCurrent]);
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
						<IconMenuItem text="two" disabled />
						<IconMenuItem text="three" />
					</IconMenu>
				);

				wrapper.find('#test').simulate('keydown', {keyCode: 40, preventDefault});

				expect(preventDefault.mock.calls).toEqual([[]]);
				expect(setCurrent.mock.calls).toEqual([[expect.any(Function)]]);
				expect(setCurrent.mock.calls[0][0](0)).toBe(2);
			});

			it('ignores the event when an unknown key is pressed', () => {
				const preventDefault = jest.fn();
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
						<IconMenuItem text="two" />
					</IconMenu>
				);

				wrapper.find('#test').simulate('keydown', {keyCode: 47, preventDefault});

				expect(preventDefault).not.toHaveBeenCalled();
			});
		});

		describe('handleButtonBlur', () => {
			it('calls setCurrent with -1', () => {
				const setCurrent = jest.fn();
				useState.mockReturnValueOnce([0, setCurrent]);
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
					</IconMenu>
				);
				wrapper.find('#test').simulate('blur');

				expect(setCurrent.mock.calls).toEqual([[-1]]);
			});
		});

		describe('handleMenuMouseDown', () => {
			it('calls preventDefault on the event', () => {
				const preventDefault = jest.fn();
				useState.mockReturnValueOnce([0]);
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
					</IconMenu>
				);
				wrapper.find('#test-menu').simulate('mousedown', {preventDefault});

				expect(preventDefault.mock.calls).toEqual([[]]);
			});
		});

		describe('handleMenuMouseUp', () => {
			it('calls click on the item when a menu item is found', () => {
				const setCurrent = jest.fn();
				const preventDefault = jest.fn();
				const click = jest.fn();
				const element = {dataset: {index: '0'}, click};
				const closest = jest.fn().mockReturnValue(element);
				useState.mockReturnValueOnce([0, setCurrent]);
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
					</IconMenu>
				);

				wrapper.find('#test-menu').simulate('mouseup', {preventDefault, target: {closest}});

				expect(closest.mock.calls).toEqual([['li']]);
				expect(preventDefault.mock.calls).toEqual([[]]);
				expect(click.mock.calls).toEqual([[]]);
				expect(setCurrent.mock.calls).toEqual([[-1]]);
			});

			it('does not call click on the item when disabled is set', () => {
				const setCurrent = jest.fn();
				const preventDefault = jest.fn();
				const click = jest.fn();
				const element = {dataset: {index: '0'}, click};
				const closest = jest.fn().mockReturnValue(element);
				useState.mockReturnValueOnce([0, setCurrent]);
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" disabled />
					</IconMenu>
				);

				wrapper.find('#test-menu').simulate('mouseup', {preventDefault, target: {closest}});

				expect(closest.mock.calls).toEqual([['li']]);
				expect(preventDefault.mock.calls).toEqual([[]]);
				expect(click).not.toHaveBeenCalled();
				expect(setCurrent).not.toHaveBeenCalled();
			});

			it('ignores the event when the menu item is not found', () => {
				const preventDefault = jest.fn();
				const closest = jest.fn();
				useState.mockReturnValueOnce([0]);
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
					</IconMenu>
				);

				wrapper.find('#test-menu').simulate('mouseup', {preventDefault, target: {closest}});

				expect(closest.mock.calls).toEqual([['li']]);
				expect(preventDefault).not.toHaveBeenCalled();
			});
		});

		describe('layout effect 0', () => {
			it('sets the menu position', () => {
				const menu = {style: {}, dataset: {}};
				const button = {
					parentNode: {dataset: {layer: '2'}},
					getBoundingClientRect: jest.fn().mockReturnValue({bottom: 100, left: 200}),
				};
				useRef.mockReturnValueOnce({current: button}).mockReturnValueOnce({current: menu});
				useState.mockReturnValueOnce([1]);
				shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
					</IconMenu>
				);
				expect(useLayoutEffect.mock.calls[0]).toEqual([anyFunction, [true, undefined]]);

				useLayoutEffect.mock.calls[0][0]();
				expect(menu.style).toEqual({top: '100px', left: '200px'});
				expect(menu.dataset).toEqual({layer: '2'});
			});

			it('sets the menu position when flipped is true', () => {
				const menu = {offsetWidth: 100, style: {}, dataset: {}};
				const button = {
					parentNode: {dataset: {layer: '2'}},
					getBoundingClientRect: jest.fn().mockReturnValue({bottom: 100, right: 200}),
				};
				useRef.mockReturnValueOnce({current: button}).mockReturnValueOnce({current: menu});
				useState.mockReturnValueOnce([1]);
				shallow(
					<IconMenu icon={{}} flipped>
						<IconMenuItem text="one" />
					</IconMenu>
				);
				expect(useLayoutEffect.mock.calls[0]).toEqual([anyFunction, [true, true]]);

				useLayoutEffect.mock.calls[0][0]();
				expect(menu.style).toEqual({top: '100px', left: '100px'});
				expect(menu.dataset).toEqual({layer: '2'});
			});

			it('does nothing when current is -1', () => {
				const menu = {};
				useRef.mockReturnValueOnce({}).mockReturnValueOnce({current: menu});
				useState.mockReturnValueOnce([-1]);
				shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
					</IconMenu>
				);
				expect(useLayoutEffect.mock.calls[0]).toEqual([anyFunction, [false, undefined]]);

				useLayoutEffect.mock.calls[0][0]();
				expect(menu).toEqual({});
			});
		});

		it('calls setRefs when ref is set', () => {
			const ref = {foo: 'test'};
			IconMenu({children: []}, ref); // ref doesn't seem to be passed any other way
			expect(setRefs.mock.calls).toEqual([[ref, expect.any(Object)]]);
		});
	});
});
