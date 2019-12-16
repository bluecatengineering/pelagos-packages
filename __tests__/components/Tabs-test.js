import React, {useState} from 'react';
import {shallow} from 'enzyme';

import Tabs from '../../src/components/Tabs';

jest.unmock('../../src/components/Tabs');

describe('Tabs', () => {
	const items = [
		// eslint-disable-next-line react/display-name
		{id: 'a', title: 'A', getPanel: () => <div>A panel</div>},
		// eslint-disable-next-line react/display-name
		{id: 'b', title: 'B', getPanel: () => <div>B panel</div>},
		// eslint-disable-next-line react/display-name
		{id: 'c', title: 'C', getPanel: () => <div>C panel</div>},
	];

	describe('rendering', () => {
		it('renders the expected elements', () => {
			const wrapper = shallow(<Tabs id="test" active="a" items={items} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders the expected elements when the active tab is not found', () => {
			const wrapper = shallow(<Tabs id="test" active="d" items={items} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders the expected elements when a tab is focused', () => {
			useState.mockReturnValue([1]);
			const wrapper = shallow(<Tabs id="test" active="a" items={items} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
	describe('behaviour', () => {
		it('sets focused to -1 on blur', () => {
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([0, setFocused]);
			const wrapper = shallow(<Tabs id="test" active="a" items={items} onTabClick={jest.fn()} />);

			wrapper.find('#test-list').simulate('blur');

			expect(setFocused.mock.calls).toEqual([[-1]]);
		});

		it('focuses the active tab on focus', () => {
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([0, setFocused]);
			const wrapper = shallow(<Tabs id="test" active="a" items={items} onTabClick={jest.fn()} />);

			wrapper.find('#test-list').simulate('focus');

			expect(setFocused.mock.calls).toEqual([[0]]);
		});

		it('prevents event default when enter or space are pressed', () => {
			const preventDefault = jest.fn();
			const nativeEvent = {stopImmediatePropagation: jest.fn()};
			const wrapper = shallow(<Tabs id="test" active="a" items={items} onTabClick={jest.fn()} />);
			const list = wrapper.find('#test-list');

			list.simulate('keydown', {keyCode: 13, preventDefault, nativeEvent});
			list.simulate('keydown', {keyCode: 32, preventDefault, nativeEvent});

			expect(preventDefault).toHaveBeenCalledTimes(2);
		});

		it('focuses the last tab when end is pressed', () => {
			const setFocused = jest.fn();
			const event = {keyCode: 35, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			useState.mockReturnValueOnce([0, setFocused]);
			const wrapper = shallow(<Tabs id="test" active="a" items={items} onTabClick={jest.fn()} />);

			wrapper.find('#test-list').simulate('keydown', event);

			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[2]]);
		});

		it('focuses the first tab when home is pressed', () => {
			const setFocused = jest.fn();
			const event = {keyCode: 36, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			useState.mockReturnValueOnce([1, setFocused]);
			const wrapper = shallow(<Tabs id="test" active="a" items={items} onTabClick={jest.fn()} />);

			wrapper.find('#test-list').simulate('keydown', event);

			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[0]]);
		});

		it('focuses the previous tab when left is pressed', () => {
			const setFocused = jest.fn();
			const event = {keyCode: 37, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			useState.mockReturnValueOnce([1, setFocused]);
			const wrapper = shallow(<Tabs id="test" active="a" items={items} onTabClick={jest.fn()} />);

			wrapper.find('#test-list').simulate('keydown', event);

			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[expect.any(Function)]]);
			expect(setFocused.mock.calls[0][0](1)).toBe(0);
		});

		it('focuses the last tab when left is pressed and the first tab is focused', () => {
			const setFocused = jest.fn();
			const event = {keyCode: 37, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			useState.mockReturnValueOnce([0, setFocused]);
			const wrapper = shallow(<Tabs id="test" active="a" items={items} onTabClick={jest.fn()} />);

			wrapper.find('#test-list').simulate('keydown', event);

			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[expect.any(Function)]]);
			expect(setFocused.mock.calls[0][0](0)).toBe(2);
		});

		it('focuses the next tab when right is pressed', () => {
			const setFocused = jest.fn();
			const event = {keyCode: 39, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			useState.mockReturnValueOnce([0, setFocused]);
			const wrapper = shallow(<Tabs id="test" active="a" items={items} onTabClick={jest.fn()} />);

			wrapper.find('#test-list').simulate('keydown', event);

			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[expect.any(Function)]]);
			expect(setFocused.mock.calls[0][0](0)).toBe(1);
		});

		it('focuses the first tab when right is pressed and the last tab is focused', () => {
			const setFocused = jest.fn();
			const event = {keyCode: 39, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			useState.mockReturnValueOnce([2, setFocused]);
			const wrapper = shallow(<Tabs id="test" active="a" items={items} onTabClick={jest.fn()} />);

			wrapper.find('#test-list').simulate('keydown', event);

			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[expect.any(Function)]]);
			expect(setFocused.mock.calls[0][0](2)).toBe(0);
		});

		it('ignores the event when a key is pressed and any modifier is set', () => {
			const preventDefault = jest.fn();
			const wrapper = shallow(<Tabs id="test" active="a" items={items} onTabClick={jest.fn()} />);
			const list = wrapper.find('#test-list');

			list.simulate('keydown', {keyCode: 13, shiftKey: true, preventDefault});
			list.simulate('keydown', {keyCode: 13, ctrlKey: true, preventDefault});
			list.simulate('keydown', {keyCode: 13, altKey: true, preventDefault});
			list.simulate('keydown', {keyCode: 13, metaKey: true, preventDefault});

			expect(preventDefault).not.toHaveBeenCalled();
		});

		it('calls onTabClick when enter is released', () => {
			useState.mockReturnValueOnce([1]);
			const event = {keyCode: 13, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const onTabClick = jest.fn();
			const wrapper = shallow(<Tabs id="test" active="a" items={items} onTabClick={onTabClick} />);
			wrapper.find('#test-list').simulate('keyup', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(onTabClick.mock.calls).toEqual([['b']]);
		});

		it('calls onTabClick when space is released', () => {
			useState.mockReturnValueOnce([1]);
			const event = {keyCode: 32, preventDefault: jest.fn(), nativeEvent: {stopImmediatePropagation: jest.fn()}};
			const onTabClick = jest.fn();
			const wrapper = shallow(<Tabs id="test" active="a" items={items} onTabClick={onTabClick} />);
			wrapper.find('#test-list').simulate('keyup', event);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(onTabClick.mock.calls).toEqual([['b']]);
		});

		it('ignores the event when a key is released and any modifier is set', () => {
			const preventDefault = jest.fn();
			const wrapper = shallow(<Tabs id="test" active="a" items={items} onTabClick={jest.fn()} />);
			const list = wrapper.find('#test-list');

			list.simulate('keyup', {keyCode: 13, shiftKey: true, preventDefault});
			list.simulate('keyup', {keyCode: 13, ctrlKey: true, preventDefault});
			list.simulate('keyup', {keyCode: 13, altKey: true, preventDefault});
			list.simulate('keyup', {keyCode: 13, metaKey: true, preventDefault});

			expect(preventDefault).not.toHaveBeenCalled();
		});

		it('focuses the tab when the mouse is over it', () => {
			const setFocused = jest.fn();
			const element = {dataset: {index: '1'}};
			const closest = jest.fn().mockReturnValue(element);
			const event = {target: {closest}};
			useState.mockReturnValueOnce([0, setFocused]);
			const wrapper = shallow(<Tabs id="test" active="a" items={items} onTabClick={jest.fn()} />);

			wrapper.find('#test-list').simulate('mouseover', event);

			expect(closest.mock.calls).toEqual([['[role="tab"]']]);
			expect(setFocused.mock.calls).toEqual([[1]]);
		});

		it('sets focused to -1 when the mouse is over other element', () => {
			const setFocused = jest.fn();
			const event = {target: {closest: jest.fn()}};
			useState.mockReturnValueOnce([0, setFocused]);
			const wrapper = shallow(<Tabs id="test" active="a" items={items} onTabClick={jest.fn()} />);

			wrapper.find('#test-list').simulate('mouseover', event);

			expect(setFocused.mock.calls).toEqual([[-1]]);
		});

		it('prevents event default when a mouse button is pressed pressed', () => {
			const event = {preventDefault: jest.fn()};
			const wrapper = shallow(<Tabs id="test" active="a" items={items} onTabClick={jest.fn()} />);

			wrapper.find('#test-list').simulate('mousedown', event);

			expect(event.preventDefault).toHaveBeenCalledTimes(1);
		});

		it('calls onTabClick when a tab is clicked', () => {
			const onTabClick = jest.fn();
			const element = {dataset: {index: '1'}};
			const closest = jest.fn().mockReturnValue(element);
			const event = {target: {closest}, preventDefault: jest.fn()};
			const wrapper = shallow(<Tabs id="test" active="a" items={items} onTabClick={onTabClick} />);

			wrapper.find('#test-list').simulate('mouseup', event);

			expect(closest.mock.calls).toEqual([['[role="tab"]']]);
			expect(event.preventDefault).toHaveBeenCalledTimes(1);
			expect(onTabClick.mock.calls).toEqual([['b']]);
		});

		it('ignores the mouse up event when the tab is not found', () => {
			const onTabClick = jest.fn();
			const closest = jest.fn();
			const event = {target: {closest}, preventDefault: jest.fn()};
			const wrapper = shallow(<Tabs id="test" active="a" items={items} onTabClick={onTabClick} />);

			wrapper.find('#test-list').simulate('mouseup', event);

			expect(closest.mock.calls).toEqual([['[role="tab"]']]);
			expect(event.preventDefault).not.toHaveBeenCalled();
			expect(onTabClick).not.toHaveBeenCalled();
		});

		it('sets focused to -1 when the mouse leaves', () => {
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([0, setFocused]);
			const wrapper = shallow(<Tabs id="test" active="a" items={items} onTabClick={jest.fn()} />);

			wrapper.find('#test-list').simulate('mouseout');

			expect(setFocused.mock.calls).toEqual([[-1]]);
		});
	});
});
