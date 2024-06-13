import {useEffect, useRef, useState} from 'react';
import {shallow} from 'enzyme';

import VerticalTabList from '../../src/tabs/VerticalTabList';
import VerticalTab from '../../src/tabs/VerticalTab';
import setRefs from '../../src/functions/setRefs';

jest.unmock('../../src/tabs/VerticalTabList');

const anyFunction = expect.any(Function);

describe('VerticalTabList', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<VerticalTabList selectedIndex={0}>
					<VerticalTab />
				</VerticalTabList>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(
				<VerticalTabList className="TestClass" selectedIndex={0}>
					<VerticalTab />
				</VerticalTabList>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls setFocused when the home key is pressed', () => {
			const setFocused = jest.fn();
			const focus = jest.fn();
			const preventDefault = jest.fn();
			useRef.mockReturnValueOnce({current: {childNodes: [{disabled: true}, {focus}, {}]}});
			useState.mockReturnValueOnce([2, setFocused]);
			const wrapper = shallow(
				<VerticalTabList selectedIndex={0}>
					<VerticalTab />
				</VerticalTabList>
			);
			wrapper.find('[role="tablist"]').simulate('keydown', {key: 'Home', preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(setFocused.mock.calls).toEqual([[anyFunction]]);
			expect(setFocused.mock.calls[0][0]()).toBe(1);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls setFocused when the end key is pressed', () => {
			const setFocused = jest.fn();
			const focus = jest.fn();
			const preventDefault = jest.fn();
			useRef.mockReturnValueOnce({current: {childNodes: [{}, {focus}, {disabled: true}]}});
			useState.mockReturnValueOnce([0, setFocused]);
			const wrapper = shallow(
				<VerticalTabList selectedIndex={0}>
					<VerticalTab />
				</VerticalTabList>
			);
			wrapper.find('[role="tablist"]').simulate('keydown', {key: 'End', preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(setFocused.mock.calls).toEqual([[anyFunction]]);
			expect(setFocused.mock.calls[0][0]()).toBe(1);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls setFocused when the up key is pressed', () => {
			const setFocused = jest.fn();
			const focus = jest.fn();
			const preventDefault = jest.fn();
			useRef.mockReturnValueOnce({current: {childNodes: [{}, {focus}, {}]}});
			useState.mockReturnValueOnce([2, setFocused]);
			const wrapper = shallow(
				<VerticalTabList selectedIndex={0}>
					<VerticalTab />
				</VerticalTabList>
			);
			wrapper.find('[role="tablist"]').simulate('keydown', {key: 'ArrowUp', preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(setFocused.mock.calls).toEqual([[anyFunction]]);
			expect(setFocused.mock.calls[0][0](2)).toBe(1);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls setFocused when the up key is pressed and focused is 0', () => {
			const setFocused = jest.fn();
			const focus = jest.fn();
			const preventDefault = jest.fn();
			useRef.mockReturnValueOnce({current: {childNodes: [{}, {}, {focus}]}});
			useState.mockReturnValueOnce([0, setFocused]);
			const wrapper = shallow(
				<VerticalTabList selectedIndex={0}>
					<VerticalTab />
				</VerticalTabList>
			);
			wrapper.find('[role="tablist"]').simulate('keydown', {key: 'ArrowUp', preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(setFocused.mock.calls).toEqual([[anyFunction]]);
			expect(setFocused.mock.calls[0][0](0)).toBe(2);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls setFocused when the up key is pressed and focused is the first enabled', () => {
			const setFocused = jest.fn();
			const focus = jest.fn();
			const preventDefault = jest.fn();
			useRef.mockReturnValueOnce({current: {childNodes: [{disabled: true}, {}, {focus}]}});
			useState.mockReturnValueOnce([1, setFocused]);
			const wrapper = shallow(
				<VerticalTabList selectedIndex={0}>
					<VerticalTab />
				</VerticalTabList>
			);
			wrapper.find('[role="tablist"]').simulate('keydown', {key: 'ArrowUp', preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(setFocused.mock.calls).toEqual([[anyFunction]]);
			expect(setFocused.mock.calls[0][0](1)).toBe(2);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls setFocused when the down key is pressed', () => {
			const setFocused = jest.fn();
			const focus = jest.fn();
			const preventDefault = jest.fn();
			useRef.mockReturnValueOnce({current: {childNodes: [{}, {focus}, {}]}});
			useState.mockReturnValueOnce([0, setFocused]);
			const wrapper = shallow(
				<VerticalTabList selectedIndex={0}>
					<VerticalTab />
				</VerticalTabList>
			);
			wrapper.find('[role="tablist"]').simulate('keydown', {key: 'ArrowDown', preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(setFocused.mock.calls).toEqual([[anyFunction]]);
			expect(setFocused.mock.calls[0][0](0)).toBe(1);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls setFocused when the down key is pressed and focused is n - 1', () => {
			const setFocused = jest.fn();
			const focus = jest.fn();
			const preventDefault = jest.fn();
			useRef.mockReturnValueOnce({current: {childNodes: [{focus}, {}, {}]}});
			useState.mockReturnValueOnce([0, setFocused]);
			const wrapper = shallow(
				<VerticalTabList selectedIndex={0}>
					<VerticalTab />
				</VerticalTabList>
			);
			wrapper.find('[role="tablist"]').simulate('keydown', {key: 'ArrowDown', preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(setFocused.mock.calls).toEqual([[anyFunction]]);
			expect(setFocused.mock.calls[0][0](2)).toBe(0);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls setFocused when the down key is pressed and focused the last enabled', () => {
			const setFocused = jest.fn();
			const focus = jest.fn();
			const preventDefault = jest.fn();
			useRef.mockReturnValueOnce({current: {childNodes: [{focus}, {}, {disabled: true}]}});
			useState.mockReturnValueOnce([1, setFocused]);
			const wrapper = shallow(
				<VerticalTabList selectedIndex={0}>
					<VerticalTab />
				</VerticalTabList>
			);
			wrapper.find('[role="tablist"]').simulate('keydown', {key: 'ArrowDown', preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(setFocused.mock.calls).toEqual([[anyFunction]]);
			expect(setFocused.mock.calls[0][0](1)).toBe(0);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('ignores the event when a key is pressed and any modifier is set', () => {
			const preventDefault = jest.fn();
			const wrapper = shallow(
				<VerticalTabList selectedIndex={0}>
					<VerticalTab />
				</VerticalTabList>
			);
			const list = wrapper.find('[role="tablist"]');
			list.simulate('keydown', {key: 'Home', shiftKey: true, preventDefault});
			list.simulate('keydown', {key: 'Home', ctrlKey: true, preventDefault});
			list.simulate('keydown', {key: 'Home', altKey: true, preventDefault});
			list.simulate('keydown', {key: 'Home', metaKey: true, preventDefault});
			expect(preventDefault.mock.calls).toEqual([]);
		});

		it('ignores the event when an unknown key is pressed', () => {
			const preventDefault = jest.fn();
			const wrapper = shallow(
				<VerticalTabList selectedIndex={0}>
					<VerticalTab />
				</VerticalTabList>
			);
			wrapper.find('[role="tablist"]').simulate('keydown', {key: 'Other', preventDefault});
			expect(preventDefault.mock.calls).toEqual([]);
		});

		it('calls setFocused on blur', () => {
			const setFocused = jest.fn();
			const relatedTarget = {foo: 'test'};
			const contains = jest.fn();
			useRef.mockReturnValueOnce({current: {contains}});
			useState.mockReturnValueOnce([1, setFocused]);
			const wrapper = shallow(
				<VerticalTabList selectedIndex={0}>
					<VerticalTab />
				</VerticalTabList>
			);
			wrapper.find('[role="tablist"]').simulate('blur', {relatedTarget});
			expect(contains.mock.calls).toEqual([[relatedTarget]]);
			expect(setFocused.mock.calls).toEqual([[0]]);
		});

		it('does not call setFocused on blur when focused equals selectedIndex', () => {
			const setFocused = jest.fn();
			const relatedTarget = {foo: 'test'};
			const contains = jest.fn();
			useRef.mockReturnValueOnce({current: {contains}});
			useState.mockReturnValueOnce([0, setFocused]);
			const wrapper = shallow(
				<VerticalTabList selectedIndex={0}>
					<VerticalTab />
				</VerticalTabList>
			);
			wrapper.find('[role="tablist"]').simulate('blur', {relatedTarget});
			expect(contains.mock.calls).toEqual([[relatedTarget]]);
			expect(setFocused.mock.calls).toEqual([]);
		});

		it('does not call setFocused on blur when relatedTarget is inside container', () => {
			const setFocused = jest.fn();
			const relatedTarget = {foo: 'test'};
			const contains = jest.fn().mockReturnValue(true);
			useRef.mockReturnValueOnce({current: {contains}});
			useState.mockReturnValueOnce([1, setFocused]);
			const wrapper = shallow(
				<VerticalTabList selectedIndex={0}>
					<VerticalTab />
				</VerticalTabList>
			);
			wrapper.find('[role="tablist"]').simulate('blur', {relatedTarget});
			expect(contains.mock.calls).toEqual([[relatedTarget]]);
			expect(setFocused.mock.calls).toEqual([]);
		});

		it('adds an effect which calls setFocused when selectedIndex changes', () => {
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([1, setFocused]);
			shallow(
				<VerticalTabList selectedIndex={0}>
					<VerticalTab />
				</VerticalTabList>
			);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, [0]]);
			useEffect.mock.calls[0][0]();
			expect(setFocused.mock.calls).toEqual([[0]]);
		});

		it('calls setRefs when ref is set', () => {
			const ref = {foo: 'test'};
			useRef.mockReturnValueOnce('useRef');
			VerticalTabList({}, ref); // ref is not passed any other way
			expect(setRefs.mock.calls).toEqual([[ref, 'useRef']]);
		});
	});
});
