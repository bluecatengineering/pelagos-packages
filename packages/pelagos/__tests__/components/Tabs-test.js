import {useEffect, useRef, useState} from 'react';
import {shallow} from 'enzyme';

import Tabs from '../../src/components/Tabs';

jest.unmock('../../src/components/Tabs');

const anyFunction = expect.any(Function);

const items = [
	{name: 'foo', key: '1'},
	{name: 'bar', key: '2'},
	{name: 'baz', key: '3'},
];

const getTabKey = jest.fn(({key}) => key);

const getElementById = jest.fn();
global.document = {getElementById};
global.getComputedStyle = jest.fn().mockReturnValue({paddingLeft: '0', paddingRight: '10'});

describe('Tabs', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const renderTab = jest.fn(({name}) => name);
			const wrapper = shallow(
				<Tabs
					id="test"
					items={items}
					currentTab="1"
					getTabKey={getTabKey}
					renderTab={renderTab}
					onTabClick={jest.fn()}
					onTabClose={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(getTabKey.mock.calls).toEqual([[items[0]], [items[0]], [items[0]], [items[1]], [items[2]]]);
			expect(renderTab.mock.calls).toEqual([
				[items[0], true, true],
				[items[1], false, false],
				[items[2], false, false],
			]);
		});
	});

	describe('behaviour', () => {
		it('scrolls to the current tab on resize', () => {
			const getAttribute = jest.fn().mockReturnValue('2');
			const tabs = {
				getAttribute,
				getBoundingClientRect: jest.fn().mockReturnValue({left: 10}),
			};
			const track = {firstChild: tabs};
			const current = {getBoundingClientRect: jest.fn().mockReturnValue({left: 40, right: 60})};
			const tr = {left: 20, right: 50, width: 30};
			getElementById.mockReturnValue(current);
			const wrapper = shallow(
				<Tabs
					id="test"
					items={items}
					currentTab="1"
					getTabKey={jest.fn()}
					renderTab={jest.fn()}
					onTabClick={jest.fn()}
					onTabClose={jest.fn()}
				/>
			);
			wrapper.find('ScrollBox').prop('onResize')(track, tr, true);

			expect(getAttribute.mock.calls).toEqual([['aria-activedescendant']]);
			expect(getElementById.mock.calls).toEqual([['2']]);
			expect(track.scrollLeft).toBe(20);
		});

		it('does not scroll tabs on resize when current tab is inside range', () => {
			const getAttribute = jest.fn().mockReturnValue('2');
			const tabs = {
				getAttribute,
				getBoundingClientRect: jest.fn().mockReturnValue({left: 10}),
			};
			const track = {firstChild: tabs};
			const current = {getBoundingClientRect: jest.fn().mockReturnValue({left: 30, right: 40})};
			const tr = {left: 20, right: 50, width: 30};
			getElementById.mockReturnValue(current);
			const wrapper = shallow(
				<Tabs
					id="test"
					items={items}
					currentTab="1"
					getTabKey={jest.fn()}
					renderTab={jest.fn()}
					onTabClick={jest.fn()}
					onTabClose={jest.fn()}
				/>
			);
			wrapper.find('ScrollBox').prop('onResize')(track, tr, true);

			expect(getAttribute.mock.calls).toEqual([['aria-activedescendant']]);
			expect(getElementById.mock.calls).toEqual([['2']]);
			expect(track.scrollLeft).toBeUndefined();
		});

		it('does not scroll tabs on resize when overflow is false', () => {
			const track = {};
			const tr = {left: 20, right: 50, width: 30};
			const wrapper = shallow(
				<Tabs
					id="test"
					items={items}
					currentTab="1"
					getTabKey={jest.fn()}
					renderTab={jest.fn()}
					onTabClick={jest.fn()}
					onTabClose={jest.fn()}
				/>
			);
			wrapper.find('ScrollBox').prop('onResize')(track, tr, false);

			expect(track.scrollLeft).toBeUndefined();
		});

		it('scrolls to the current tab on focus', () => {
			const getAttribute = jest.fn().mockReturnValue('2');
			const track = {getBoundingClientRect: jest.fn().mockReturnValue({left: 20, right: 50, width: 30})};
			const tabs = {
				parentNode: track,
				scrollWidth: 50,
				getAttribute,
				getBoundingClientRect: jest.fn().mockReturnValue({left: -20}),
			};
			const current = {getBoundingClientRect: jest.fn().mockReturnValue({left: -10})};
			track.firstChild = tabs;
			useRef.mockReturnValueOnce({current: tabs});
			getElementById.mockReturnValue(current);
			const wrapper = shallow(
				<Tabs
					id="test"
					items={items}
					currentTab="1"
					getTabKey={jest.fn()}
					renderTab={jest.fn()}
					onTabClick={jest.fn()}
					onTabClose={jest.fn()}
				/>
			);

			wrapper.find('[role="tablist"]').simulate('focus');

			expect(getAttribute.mock.calls).toEqual([['aria-activedescendant']]);
			expect(getElementById.mock.calls).toEqual([['2']]);
			expect(track.scrollLeft).toBe(10);
		});

		it('does not scroll tabs on focus when track width is equal or greater than tabs scrollWidth', () => {
			const track = {getBoundingClientRect: jest.fn().mockReturnValue({width: 30})};
			const tabs = {
				parentNode: track,
				scrollWidth: 30,
			};
			useRef.mockReturnValueOnce({current: tabs});
			const wrapper = shallow(
				<Tabs
					id="test"
					items={items}
					currentTab="1"
					getTabKey={jest.fn()}
					renderTab={jest.fn()}
					onTabClick={jest.fn()}
					onTabClose={jest.fn()}
				/>
			);

			wrapper.find('[role="tablist"]').simulate('focus');

			expect(track.scrollLeft).toBeUndefined();
		});

		it('calls onTabClose when a tab close button is clicked', () => {
			const onTabClose = jest.fn();
			const element = {dataset: {key: '1'}};
			const closest = jest.fn().mockReturnValueOnce(element);
			const focus = jest.fn();
			const event = {target: {closest}, currentTarget: {focus}, preventDefault: jest.fn()};
			const wrapper = shallow(
				<Tabs
					id="test"
					items={items}
					currentTab="1"
					getTabKey={jest.fn()}
					renderTab={jest.fn()}
					onTabClick={jest.fn()}
					onTabClose={onTabClose}
				/>
			);

			wrapper.find('[role="tablist"]').simulate('click', event);
			expect(closest.mock.calls).toEqual([['button']]);
			expect(event.preventDefault.mock.calls).toEqual([[]]);
			expect(focus.mock.calls).toEqual([[]]);
			expect(onTabClose.mock.calls).toEqual([['1']]);
		});

		it('calls onTabClick when a tab is clicked', () => {
			const onTabClick = jest.fn();
			const getAttribute = jest.fn().mockReturnValue('false');
			const element = {getAttribute, dataset: {key: '1'}};
			const closest = jest.fn().mockReturnValueOnce(null).mockReturnValueOnce(null).mockReturnValueOnce(element);
			const event = {target: {closest}, preventDefault: jest.fn()};
			const wrapper = shallow(
				<Tabs
					id="test"
					items={items}
					currentTab="1"
					getTabKey={jest.fn()}
					renderTab={jest.fn()}
					onTabClick={onTabClick}
					onTabClose={jest.fn()}
				/>
			);

			wrapper.find('[role="tablist"]').simulate('click', event);
			expect(closest.mock.calls).toEqual([['button'], ['[role="button"]'], ['[role="tab"]']]);
			expect(event.preventDefault.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['aria-selected']]);
			expect(onTabClick.mock.calls).toEqual([['1']]);
		});

		it('does not call onTabClick when the current tab is clicked', () => {
			const onTabClick = jest.fn();
			const getAttribute = jest.fn().mockReturnValue('true');
			const element = {getAttribute, dataset: {key: '1'}};
			const closest = jest.fn().mockReturnValueOnce(null).mockReturnValueOnce(null).mockReturnValueOnce(element);
			const event = {target: {closest}, preventDefault: jest.fn()};
			const wrapper = shallow(
				<Tabs
					id="test"
					items={items}
					currentTab="1"
					getTabKey={jest.fn()}
					renderTab={jest.fn()}
					onTabClick={onTabClick}
					onTabClose={jest.fn()}
				/>
			);

			wrapper.find('[role="tablist"]').simulate('click', event);
			expect(closest.mock.calls).toEqual([['button'], ['[role="button"]'], ['[role="tab"]']]);
			expect(event.preventDefault.mock.calls).toEqual([[]]);
			expect(getAttribute.mock.calls).toEqual([['aria-selected']]);
			expect(onTabClick).not.toHaveBeenCalled();
		});

		it('ignores the click event when neither the button nor the tab are found', () => {
			const closest = jest.fn();
			const event = {target: {closest}, preventDefault: jest.fn()};
			const wrapper = shallow(
				<Tabs
					id="test"
					items={items}
					currentTab="1"
					getTabKey={jest.fn()}
					renderTab={jest.fn()}
					onTabClick={jest.fn()}
					onTabClose={jest.fn()}
				/>
			);

			wrapper.find('[role="tablist"]').simulate('click', event);

			expect(closest.mock.calls).toEqual([['button'], ['[role="button"]'], ['[role="tab"]']]);
			expect(event.preventDefault).not.toHaveBeenCalled();
		});

		it('calls setFocused when a mouse button is pressed pressed', () => {
			const setFocused = jest.fn();
			const element = {dataset: {key: '2'}};
			const closest = jest.fn().mockReturnValue(element);
			const event = {target: {closest}, preventDefault: jest.fn()};
			useRef
				.mockReturnValueOnce({})
				.mockReturnValueOnce({current: items})
				.mockReturnValueOnce({current: '1'})
				.mockReturnValueOnce({current: true});
			useState.mockReturnValueOnce([0, setFocused]);
			document.activeElement = null;
			const wrapper = shallow(
				<Tabs
					id="test"
					items={items}
					currentTab="1"
					getTabKey={getTabKey}
					renderTab={jest.fn()}
					onTabClick={jest.fn()}
					onTabClose={jest.fn()}
				/>
			);

			wrapper.find('[role="tablist"]').simulate('mousedown', event);

			expect(closest.mock.calls).toEqual([['[role="tab"]']]);
			expect(event.preventDefault.mock.calls).toEqual([[]]);
			expect(setFocused.mock.calls).toEqual([[1]]);
		});

		it('calls setFocused and blur when a mouse button is pressed pressed and activeElement is not currentTarget', () => {
			const setFocused = jest.fn();
			const blur = jest.fn();
			const element = {dataset: {key: '2'}};
			const closest = jest.fn().mockReturnValue(element);
			const event = {target: {closest}, preventDefault: jest.fn()};
			useRef
				.mockReturnValueOnce({})
				.mockReturnValueOnce({current: items})
				.mockReturnValueOnce({current: '1'})
				.mockReturnValueOnce({current: true});
			useState.mockReturnValueOnce([0, setFocused]);
			document.activeElement = {blur};
			const wrapper = shallow(
				<Tabs
					id="test"
					items={items}
					currentTab="1"
					getTabKey={getTabKey}
					renderTab={jest.fn()}
					onTabClick={jest.fn()}
					onTabClose={jest.fn()}
				/>
			);

			wrapper.find('[role="tablist"]').simulate('mousedown', event);

			expect(closest.mock.calls).toEqual([['[role="tab"]']]);
			expect(event.preventDefault.mock.calls).toEqual([[]]);
			expect(setFocused.mock.calls).toEqual([[1]]);
			expect(blur.mock.calls).toEqual([[]]);
		});

		it('ignores the mouse down event when the tab is not found', () => {
			const closest = jest.fn();
			const event = {target: {closest}, preventDefault: jest.fn()};
			const wrapper = shallow(
				<Tabs
					id="test"
					items={items}
					currentTab="1"
					getTabKey={jest.fn()}
					renderTab={jest.fn()}
					onTabClick={jest.fn()}
					onTabClose={jest.fn()}
				/>
			);

			wrapper.find('[role="tablist"]').simulate('mousedown', event);

			expect(closest.mock.calls).toEqual([['[role="tab"]']]);
			expect(event.preventDefault).not.toHaveBeenCalled();
		});

		it('calls onTabClose when a tab is clicked with the middle button', () => {
			const onTabClose = jest.fn();
			const element = {dataset: {canClose: 'true', key: '1'}};
			const closest = jest.fn().mockReturnValueOnce(element);
			const event = {button: 1, target: {closest}};
			const wrapper = shallow(
				<Tabs
					id="test"
					items={items}
					currentTab="1"
					getTabKey={jest.fn()}
					renderTab={jest.fn()}
					onTabClick={jest.fn()}
					onTabClose={onTabClose}
				/>
			);

			wrapper.find('[role="tablist"]').simulate('mouseup', event);
			expect(closest.mock.calls).toEqual([['[role="tab"]']]);
			expect(onTabClose.mock.calls).toEqual([['1']]);
		});

		it('does not call onTabClose when a tab that can not be closed is clicked with the middle button', () => {
			const onTabClose = jest.fn();
			const element = {dataset: {key: '1'}};
			const closest = jest.fn().mockReturnValueOnce(element);
			const event = {button: 1, target: {closest}};
			const wrapper = shallow(
				<Tabs
					id="test"
					items={items}
					currentTab="1"
					getTabKey={jest.fn()}
					renderTab={jest.fn()}
					onTabClick={jest.fn()}
					onTabClose={onTabClose}
				/>
			);

			wrapper.find('[role="tablist"]').simulate('mouseup', event);
			expect(closest.mock.calls).toEqual([['[role="tab"]']]);
			expect(onTabClose).not.toHaveBeenCalled();
		});

		it('ignores the mouse up event when the button is not 1', () => {
			const closest = jest.fn();
			const event = {button: 0, target: {closest}};
			const wrapper = shallow(
				<Tabs
					id="test"
					items={items}
					currentTab="1"
					getTabKey={jest.fn()}
					renderTab={jest.fn()}
					onTabClick={jest.fn()}
					onTabClose={jest.fn()}
				/>
			);

			wrapper.find('[role="tablist"]').simulate('mouseup', event);

			expect(closest).not.toHaveBeenCalled();
		});

		it('clicks on the target when enter or space are pressed', () => {
			const getAttribute = jest.fn();
			const click = jest.fn();
			const target = {getAttribute, click};
			const preventDefault = jest.fn();
			const wrapper = shallow(
				<Tabs
					id="test"
					items={items}
					currentTab="1"
					getTabKey={jest.fn()}
					renderTab={jest.fn()}
					onTabClick={jest.fn()}
					onTabClose={jest.fn()}
				/>
			);
			const list = wrapper.find('[role="tablist"]');

			list.simulate('keydown', {keyCode: 13, target, preventDefault});
			list.simulate('keydown', {keyCode: 32, target, preventDefault});

			expect(preventDefault.mock.calls).toEqual([[], []]);
			expect(click.mock.calls).toEqual([[], []]);
		});

		it('clicks on the current tab when enter is pressed and the target role is tablist', () => {
			const getAttribute = jest.fn().mockReturnValueOnce('tablist').mockReturnValueOnce('1');
			const click = jest.fn();
			const target = {getAttribute};
			const preventDefault = jest.fn();
			getElementById.mockReturnValue({click});
			const wrapper = shallow(
				<Tabs
					id="test"
					items={items}
					currentTab="1"
					getTabKey={jest.fn()}
					renderTab={jest.fn()}
					onTabClick={jest.fn()}
					onTabClose={jest.fn()}
				/>
			);
			const list = wrapper.find('[role="tablist"]');

			list.simulate('keydown', {keyCode: 13, target, preventDefault});

			expect(getAttribute.mock.calls).toEqual([['role'], ['aria-activedescendant']]);
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(getElementById.mock.calls).toEqual([['1']]);
			expect(click.mock.calls).toEqual([[]]);
		});

		it('focuses the last tab when end is pressed', () => {
			const setFocused = jest.fn();
			const event = {keyCode: 35};
			useRef
				.mockReturnValueOnce({})
				.mockReturnValueOnce({current: items})
				.mockReturnValueOnce({current: '1'})
				.mockReturnValueOnce({current: true});
			useState.mockReturnValueOnce([0, setFocused]);
			const wrapper = shallow(
				<Tabs
					id="test"
					items={items}
					currentTab="1"
					getTabKey={jest.fn()}
					renderTab={jest.fn()}
					onTabClick={jest.fn()}
					onTabClose={jest.fn()}
				/>
			);

			wrapper.find('[role="tablist"]').simulate('keydown', event);

			expect(setFocused.mock.calls).toEqual([[2]]);
		});

		it('focuses the first tab when home is pressed', () => {
			const setFocused = jest.fn();
			const event = {keyCode: 36};
			useRef
				.mockReturnValueOnce({})
				.mockReturnValueOnce({current: items})
				.mockReturnValueOnce({current: '1'})
				.mockReturnValueOnce({current: true});
			useState.mockReturnValueOnce([1, setFocused]);
			const wrapper = shallow(
				<Tabs
					id="test"
					items={items}
					currentTab="1"
					getTabKey={jest.fn()}
					renderTab={jest.fn()}
					onTabClick={jest.fn()}
					onTabClose={jest.fn()}
				/>
			);

			wrapper.find('[role="tablist"]').simulate('keydown', event);

			expect(setFocused.mock.calls).toEqual([[0]]);
		});

		it('focuses the previous tab when left is pressed', () => {
			const setFocused = jest.fn();
			const event = {keyCode: 37};
			useRef
				.mockReturnValueOnce({})
				.mockReturnValueOnce({current: items})
				.mockReturnValueOnce({current: '1'})
				.mockReturnValueOnce({current: true});
			useState.mockReturnValueOnce([1, setFocused]);
			const wrapper = shallow(
				<Tabs
					id="test"
					items={items}
					currentTab="1"
					getTabKey={jest.fn()}
					renderTab={jest.fn()}
					onTabClick={jest.fn()}
					onTabClose={jest.fn()}
				/>
			);

			wrapper.find('[role="tablist"]').simulate('keydown', event);

			expect(setFocused.mock.calls).toEqual([[anyFunction]]);
			expect(setFocused.mock.calls[0][0](1)).toBe(0);
		});

		it('focuses the last tab when left is pressed and the first tab is focused', () => {
			const setFocused = jest.fn();
			const event = {keyCode: 37};
			useRef
				.mockReturnValueOnce({})
				.mockReturnValueOnce({current: items})
				.mockReturnValueOnce({current: '1'})
				.mockReturnValueOnce({current: true});
			useState.mockReturnValueOnce([0, setFocused]);
			const wrapper = shallow(
				<Tabs
					id="test"
					items={items}
					currentTab="1"
					getTabKey={jest.fn()}
					renderTab={jest.fn()}
					onTabClick={jest.fn()}
					onTabClose={jest.fn()}
				/>
			);

			wrapper.find('[role="tablist"]').simulate('keydown', event);

			expect(setFocused.mock.calls).toEqual([[anyFunction]]);
			expect(setFocused.mock.calls[0][0](0)).toBe(2);
		});

		it('focuses the next tab when right is pressed', () => {
			const setFocused = jest.fn();
			const event = {keyCode: 39};
			useRef
				.mockReturnValueOnce({})
				.mockReturnValueOnce({current: items})
				.mockReturnValueOnce({current: '1'})
				.mockReturnValueOnce({current: true});
			useState.mockReturnValueOnce([0, setFocused]);
			const wrapper = shallow(
				<Tabs
					id="test"
					items={items}
					currentTab="1"
					getTabKey={jest.fn()}
					renderTab={jest.fn()}
					onTabClick={jest.fn()}
					onTabClose={jest.fn()}
				/>
			);

			wrapper.find('[role="tablist"]').simulate('keydown', event);

			expect(setFocused.mock.calls).toEqual([[anyFunction]]);
			expect(setFocused.mock.calls[0][0](0)).toBe(1);
		});

		it('focuses the first tab when right is pressed and the last tab is focused', () => {
			const setFocused = jest.fn();
			const event = {keyCode: 39};
			useRef
				.mockReturnValueOnce({})
				.mockReturnValueOnce({current: items})
				.mockReturnValueOnce({current: '1'})
				.mockReturnValueOnce({current: true});
			useState.mockReturnValueOnce([2, setFocused]);
			const wrapper = shallow(
				<Tabs
					id="test"
					items={items}
					currentTab="1"
					getTabKey={jest.fn()}
					renderTab={jest.fn()}
					onTabClick={jest.fn()}
					onTabClose={jest.fn()}
				/>
			);

			wrapper.find('[role="tablist"]').simulate('keydown', event);

			expect(setFocused.mock.calls).toEqual([[anyFunction]]);
			expect(setFocused.mock.calls[0][0](2)).toBe(0);
		});

		it('ignores the event when a key is pressed and any modifier is set', () => {
			const preventDefault = jest.fn();
			const wrapper = shallow(
				<Tabs
					id="test"
					items={items}
					currentTab="1"
					getTabKey={jest.fn()}
					renderTab={jest.fn()}
					onTabClick={jest.fn()}
					onTabClose={jest.fn()}
				/>
			);
			const list = wrapper.find('[role="tablist"]');

			list.simulate('keydown', {keyCode: 13, shiftKey: true, preventDefault});
			list.simulate('keydown', {keyCode: 13, ctrlKey: true, preventDefault});
			list.simulate('keydown', {keyCode: 13, altKey: true, preventDefault});
			list.simulate('keydown', {keyCode: 13, metaKey: true, preventDefault});

			expect(preventDefault).not.toHaveBeenCalled();
		});

		it('adds an effect which sets firstTimeRef.current to false if is true', () => {
			const firstTimeRef = {current: true};
			useRef
				.mockReturnValueOnce({})
				.mockReturnValueOnce({current: items})
				.mockReturnValueOnce({current: '1'})
				.mockReturnValueOnce(firstTimeRef);
			useState.mockReturnValueOnce([0]);
			shallow(
				<Tabs
					id="test"
					items={items}
					currentTab="1"
					getTabKey={jest.fn()}
					renderTab={jest.fn()}
					onTabClick={jest.fn()}
					onTabClose={jest.fn()}
				/>
			);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, [0]]);
			useEffect.mock.calls[0][0]();
			expect(firstTimeRef).toEqual({current: false});
		});

		it('adds an effect which calls focus on tabsRef.current if activeElement is null', () => {
			const focus = jest.fn();
			useRef
				.mockReturnValueOnce({current: {focus}})
				.mockReturnValueOnce({current: items})
				.mockReturnValueOnce({current: '1'})
				.mockReturnValueOnce({current: false});
			useState.mockReturnValueOnce([0]);
			document.activeElement = null;
			shallow(
				<Tabs
					id="test"
					items={items}
					currentTab="1"
					getTabKey={jest.fn()}
					renderTab={jest.fn()}
					onTabClick={jest.fn()}
					onTabClose={jest.fn()}
				/>
			);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, [0]]);
			useEffect.mock.calls[0][0]();
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('adds an effect which calls focus on tabsRef.current if activeElement is document.body', () => {
			const body = {};
			const focus = jest.fn();
			useRef
				.mockReturnValueOnce({current: {focus}})
				.mockReturnValueOnce({current: items})
				.mockReturnValueOnce({current: '1'})
				.mockReturnValueOnce({current: false});
			useState.mockReturnValueOnce([0]);
			document.body = document.activeElement = body;
			shallow(
				<Tabs
					id="test"
					items={items}
					currentTab="1"
					getTabKey={jest.fn()}
					renderTab={jest.fn()}
					onTabClick={jest.fn()}
					onTabClose={jest.fn()}
				/>
			);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, [0]]);
			useEffect.mock.calls[0][0]();
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('adds an effect which does not call focus on tabsRef.current if activeElement is not document.body', () => {
			const focus = jest.fn();
			useRef
				.mockReturnValueOnce({current: {focus}})
				.mockReturnValueOnce({current: items})
				.mockReturnValueOnce({current: '1'})
				.mockReturnValueOnce({current: false});
			useState.mockReturnValueOnce([0]);
			document.body = {};
			document.activeElement = {};
			shallow(
				<Tabs
					id="test"
					items={items}
					currentTab="1"
					getTabKey={jest.fn()}
					renderTab={jest.fn()}
					onTabClick={jest.fn()}
					onTabClose={jest.fn()}
				/>
			);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, [0]]);
			useEffect.mock.calls[0][0]();
			expect(focus).not.toHaveBeenCalled();
		});
	});
});
