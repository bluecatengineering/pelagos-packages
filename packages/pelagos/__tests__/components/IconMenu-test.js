import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {shallow} from 'enzyme';

import IconMenu from '../../src/components/IconMenu';
import IconMenuItem from '../../src/components/IconMenuItem';
import useRandomId from '../../src/hooks/useRandomId';
import setRefs from '../../src/functions/setRefs';

jest.unmock('../../src/components/IconMenu');

const anyFunction = expect.any(Function);

global.document = {};
global.addEventListener = jest.fn();
global.removeEventListener = jest.fn();

useRandomId.mockReturnValue('random-id');

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

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(
				<IconMenu id="test" className="TestClass" icon={{foo: 'test'}} arrow>
					<IconMenuItem text="one" />
				</IconMenu>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useRandomId.mock.calls).toEqual([['test']]);
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

		it('renders expected elements when menuVisible is true', () => {
			useState.mockReturnValueOnce([true]);
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
			it('calls setMenuVisible', () => {
				const setMenuVisible = jest.fn();
				useState.mockReturnValueOnce([false, setMenuVisible]);
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" disabled />
						<IconMenuItem text="two" />
					</IconMenu>
				);
				wrapper.find('#random-id').simulate('click');

				expect(setMenuVisible.mock.calls).toEqual([[anyFunction]]);
				expect(setMenuVisible.mock.calls[0][0](false)).toBe(true);
			});
		});

		describe('handleMenuKeyDown', () => {
			it('ignores event if any modifier is set', () => {
				const preventDefault = jest.fn();
				useState.mockReturnValueOnce([true]);
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
					</IconMenu>
				);
				const button = wrapper.find('#random-id-menu');
				button.simulate('keydown', {keyCode: 13, shiftKey: true, preventDefault});
				button.simulate('keydown', {keyCode: 13, ctrlKey: true, preventDefault});
				button.simulate('keydown', {keyCode: 13, altKey: true, preventDefault});
				button.simulate('keydown', {keyCode: 13, metaKey: true, preventDefault});

				expect(preventDefault).not.toHaveBeenCalled();
			});

			it('calls click on the focused element when enter or space are pressed', () => {
				const setMenuVisible = jest.fn();
				const preventDefault = jest.fn();
				const click = jest.fn();
				const focus = jest.fn();
				useRef.mockReturnValueOnce({current: {focus}}).mockReturnValueOnce({current: {}});
				useState.mockReturnValueOnce([true, setMenuVisible]);
				document.activeElement = {click};
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
					</IconMenu>
				);
				const button = wrapper.find('#random-id-menu');
				button.simulate('keydown', {keyCode: 13, preventDefault});
				button.simulate('keydown', {keyCode: 32, preventDefault});

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
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
					</IconMenu>
				);

				wrapper.find('#random-id-menu').simulate('keydown', {keyCode: 27, preventDefault});

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
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
						<IconMenuItem text="two" />
					</IconMenu>
				);

				wrapper.find('#random-id-menu').simulate('keydown', {keyCode: 35, preventDefault});

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
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
						<IconMenuItem text="two" />
						<IconMenuItem text="three" disabled />
					</IconMenu>
				);

				wrapper.find('#random-id-menu').simulate('keydown', {keyCode: 35, preventDefault});

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
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
						<IconMenuItem text="two" />
					</IconMenu>
				);

				wrapper.find('#random-id-menu').simulate('keydown', {keyCode: 36, preventDefault});

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
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" disabled />
						<IconMenuItem text="two" />
						<IconMenuItem text="three" />
					</IconMenu>
				);

				wrapper.find('#random-id-menu').simulate('keydown', {keyCode: 36, preventDefault});

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
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
						<IconMenuItem text="two" />
					</IconMenu>
				);

				wrapper.find('#random-id-menu').simulate('keydown', {keyCode: 38, preventDefault});

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
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" disabled />
						<IconMenuItem text="two" />
						<IconMenuItem text="three" />
					</IconMenu>
				);

				wrapper.find('#random-id-menu').simulate('keydown', {keyCode: 38, preventDefault});

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
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
						<IconMenuItem text="two" />
					</IconMenu>
				);

				wrapper.find('#random-id-menu').simulate('keydown', {keyCode: 38, preventDefault});

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
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
						<IconMenuItem text="two" disabled />
						<IconMenuItem text="three" />
					</IconMenu>
				);

				wrapper.find('#random-id-menu').simulate('keydown', {keyCode: 38, preventDefault});

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
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
						<IconMenuItem text="two" />
					</IconMenu>
				);

				wrapper.find('#random-id-menu').simulate('keydown', {keyCode: 40, preventDefault});

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
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
						<IconMenuItem text="two" />
					</IconMenu>
				);

				wrapper.find('#random-id-menu').simulate('keydown', {keyCode: 40, preventDefault});

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
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
						<IconMenuItem text="two" />
						<IconMenuItem text="three" disabled />
					</IconMenu>
				);

				wrapper.find('#random-id-menu').simulate('keydown', {keyCode: 40, preventDefault});

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
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
						<IconMenuItem text="two" />
					</IconMenu>
				);

				wrapper.find('#random-id-menu').simulate('keydown', {keyCode: 40, preventDefault});

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
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
						<IconMenuItem text="two" disabled />
						<IconMenuItem text="three" />
					</IconMenu>
				);

				wrapper.find('#random-id-menu').simulate('keydown', {keyCode: 40, preventDefault});

				expect(preventDefault.mock.calls).toEqual([[]]);
				expect(getAttribute.mock.calls).toEqual([['aria-disabled'], ['aria-disabled']]);
				expect(focus.mock.calls).toEqual([[]]);
			});

			it('ignores the event when an unknown key is pressed', () => {
				const preventDefault = jest.fn();
				useRef.mockReturnValueOnce({}).mockReturnValueOnce({current: {}});
				useState.mockReturnValueOnce([true]);
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
						<IconMenuItem text="two" />
					</IconMenu>
				);

				wrapper.find('#random-id-menu').simulate('keydown', {keyCode: 47, preventDefault});

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
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
					</IconMenu>
				);

				wrapper.find('#random-id-menu').simulate('click', {target: {closest}});

				expect(closest.mock.calls).toEqual([['li']]);
				expect(setMenuVisible.mock.calls).toEqual([[false]]);
				expect(focus.mock.calls).toEqual([[]]);
			});

			it('ignores the event when the menu item is not found', () => {
				const preventDefault = jest.fn();
				const closest = jest.fn();
				useState.mockReturnValueOnce([true]);
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
					</IconMenu>
				);

				wrapper.find('#random-id-menu').simulate('click', {preventDefault, target: {closest}});

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
				const wrapper = shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
					</IconMenu>
				);
				wrapper.find('#random-id-menu + div').simulate('focus');

				expect(setMenuVisible.mock.calls).toEqual([[false]]);
				expect(focus.mock.calls).toEqual([[]]);
			});
		});

		describe('layout effect 0', () => {
			it('sets the menu position', () => {
				const getAttribute = jest.fn();
				const focus = jest.fn();
				const wrapper = {style: {}, dataset: {}};
				const menu = {parentNode: wrapper, childNodes: [{getAttribute, focus}]};
				const button = {
					parentNode: {dataset: {layer: '2'}},
					getBoundingClientRect: jest.fn().mockReturnValue({bottom: 100, left: 200}),
				};
				useRef.mockReturnValueOnce({current: button}).mockReturnValueOnce({current: menu});
				useState.mockReturnValueOnce([true]);
				shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
					</IconMenu>
				);
				expect(useLayoutEffect.mock.calls[0]).toEqual([anyFunction, [true, undefined]]);

				useLayoutEffect.mock.calls[0][0]();
				expect(wrapper.style).toEqual({top: '100px', left: '200px'});
				expect(wrapper.dataset).toEqual({layer: '2'});
				expect(getAttribute.mock.calls).toEqual([['aria-disabled']]);
				expect(focus.mock.calls).toEqual([[]]);
			});

			it('sets the menu position when flipped is true', () => {
				const getAttribute = jest.fn();
				const focus = jest.fn();
				const wrapper = {offsetWidth: 100, style: {}, dataset: {}};
				const menu = {parentNode: wrapper, childNodes: [{getAttribute, focus}]};
				const button = {
					parentNode: {dataset: {layer: '2'}},
					getBoundingClientRect: jest.fn().mockReturnValue({bottom: 100, right: 200}),
				};
				useRef.mockReturnValueOnce({current: button}).mockReturnValueOnce({current: menu});
				useState.mockReturnValueOnce([true]);
				shallow(
					<IconMenu icon={{}} flipped>
						<IconMenuItem text="one" />
					</IconMenu>
				);
				expect(useLayoutEffect.mock.calls[0]).toEqual([anyFunction, [true, true]]);

				useLayoutEffect.mock.calls[0][0]();
				expect(wrapper.style).toEqual({top: '100px', left: '101px'});
				expect(wrapper.dataset).toEqual({layer: '2'});
				expect(getAttribute.mock.calls).toEqual([['aria-disabled']]);
				expect(focus.mock.calls).toEqual([[]]);
			});

			it('does nothing when menuVisible is false', () => {
				const menu = {};
				useRef.mockReturnValueOnce({}).mockReturnValueOnce({current: menu});
				useState.mockReturnValueOnce([false]);
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
				shallow(
					<IconMenu icon={{}}>
						<IconMenuItem text="one" />
					</IconMenu>
				);
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

		it('calls setRefs when ref is set', () => {
			const ref = {foo: 'test'};
			IconMenu({children: []}, ref); // ref doesn't seem to be passed any other way
			expect(setRefs.mock.calls).toEqual([[ref, expect.any(Object)]]);
		});
	});
});
