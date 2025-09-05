import {useEffect, useRef, useState} from 'react';
import {shallow} from 'enzyme';

import TabList from '../../src/tabs/TabList';
import Tab from '../../src/tabs/Tab';
import addResizeObserver from '../../src/functions/addResizeObserver';

jest.unmock('../../src/tabs/TabList');
jest.mock('lodash-es/debounce', () => jest.fn((f) => f));

const anyFunction = expect.any(Function);

describe('TabList', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<TabList selectedIndex={0}>
					<Tab />
				</TabList>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(
				<TabList className="TestClass" selectedIndex={0} contained>
					<Tab />
				</TabList>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when tabs have secondary labels', () => {
			const wrapper = shallow(
				<TabList selectedIndex={0} contained>
					<Tab secondaryLabel="X" />
				</TabList>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls setFocused when the home key is pressed', () => {
			const setFocused = jest.fn();
			const focus = jest.fn();
			const preventDefault = jest.fn();
			useRef.mockReturnValueOnce({current: {childNodes: [{focus}, {}, {}]}});
			useState.mockReturnValueOnce([0, setFocused]).mockReturnValueOnce([false]).mockReturnValueOnce([0]);
			const wrapper = shallow(
				<TabList selectedIndex={0}>
					<Tab />
				</TabList>
			);
			wrapper.find('[role="tablist"]').simulate('keydown', {key: 'Home', preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(setFocused.mock.calls).toEqual([[anyFunction]]);
			expect(setFocused.mock.calls[0][0]()).toBe(0);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls setFocused when the end key is pressed', () => {
			const setFocused = jest.fn();
			const focus = jest.fn();
			const preventDefault = jest.fn();
			useRef.mockReturnValueOnce({current: {childNodes: [{}, {}, {focus}]}});
			useState.mockReturnValueOnce([0, setFocused]).mockReturnValueOnce([false]).mockReturnValueOnce([0]);
			const wrapper = shallow(
				<TabList selectedIndex={0}>
					<Tab />
				</TabList>
			);
			wrapper.find('[role="tablist"]').simulate('keydown', {key: 'End', preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(setFocused.mock.calls).toEqual([[anyFunction]]);
			expect(setFocused.mock.calls[0][0]()).toBe(2);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls setFocused when the left key is pressed', () => {
			const setFocused = jest.fn();
			const focus = jest.fn();
			const preventDefault = jest.fn();
			useRef.mockReturnValueOnce({current: {childNodes: [{}, {focus}, {}]}});
			useState.mockReturnValueOnce([0, setFocused]).mockReturnValueOnce([false]).mockReturnValueOnce([0]);
			const wrapper = shallow(
				<TabList selectedIndex={0}>
					<Tab />
				</TabList>
			);
			wrapper.find('[role="tablist"]').simulate('keydown', {key: 'ArrowLeft', preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(setFocused.mock.calls).toEqual([[anyFunction]]);
			expect(setFocused.mock.calls[0][0](2)).toBe(1);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls setFocused when the left key is pressed and focused is 0', () => {
			const setFocused = jest.fn();
			const focus = jest.fn();
			const preventDefault = jest.fn();
			useRef.mockReturnValueOnce({current: {childNodes: [{}, {}, {focus}]}});
			useState.mockReturnValueOnce([0, setFocused]).mockReturnValueOnce([false]).mockReturnValueOnce([0]);
			const wrapper = shallow(
				<TabList selectedIndex={0}>
					<Tab />
				</TabList>
			);
			wrapper.find('[role="tablist"]').simulate('keydown', {key: 'ArrowLeft', preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(setFocused.mock.calls).toEqual([[anyFunction]]);
			expect(setFocused.mock.calls[0][0](0)).toBe(2);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls setFocused when the right key is pressed', () => {
			const setFocused = jest.fn();
			const focus = jest.fn();
			const preventDefault = jest.fn();
			useRef.mockReturnValueOnce({current: {childNodes: [{}, {focus}, {}]}});
			useState.mockReturnValueOnce([0, setFocused]).mockReturnValueOnce([false]).mockReturnValueOnce([0]);
			const wrapper = shallow(
				<TabList selectedIndex={0}>
					<Tab />
				</TabList>
			);
			wrapper.find('[role="tablist"]').simulate('keydown', {key: 'ArrowRight', preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(setFocused.mock.calls).toEqual([[anyFunction]]);
			expect(setFocused.mock.calls[0][0](0)).toBe(1);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls setFocused when the right key is pressed and focused is n - 1', () => {
			const setFocused = jest.fn();
			const focus = jest.fn();
			const preventDefault = jest.fn();
			useRef.mockReturnValueOnce({current: {childNodes: [{focus}, {}, {}]}});
			useState.mockReturnValueOnce([0, setFocused]).mockReturnValueOnce([false]).mockReturnValueOnce([0]);
			const wrapper = shallow(
				<TabList selectedIndex={0}>
					<Tab />
				</TabList>
			);
			wrapper.find('[role="tablist"]').simulate('keydown', {key: 'ArrowRight', preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(setFocused.mock.calls).toEqual([[anyFunction]]);
			expect(setFocused.mock.calls[0][0](2)).toBe(0);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('ignores the event when a key is pressed and any modifier is set', () => {
			const preventDefault = jest.fn();
			const wrapper = shallow(
				<TabList selectedIndex={0}>
					<Tab />
				</TabList>
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
				<TabList selectedIndex={0}>
					<Tab />
				</TabList>
			);
			wrapper.find('[role="tablist"]').simulate('keydown', {key: 'Other', preventDefault});
			expect(preventDefault.mock.calls).toEqual([]);
		});

		it('calls setFocused on blur', () => {
			const setFocused = jest.fn();
			const relatedTarget = {foo: 'test'};
			const contains = jest.fn();
			useRef.mockReturnValueOnce({current: {contains}});
			useState.mockReturnValueOnce([1, setFocused]).mockReturnValueOnce([false]).mockReturnValueOnce([0]);
			const wrapper = shallow(
				<TabList selectedIndex={0}>
					<Tab />
				</TabList>
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
			useState.mockReturnValueOnce([0, setFocused]).mockReturnValueOnce([false]).mockReturnValueOnce([0]);
			const wrapper = shallow(
				<TabList selectedIndex={0}>
					<Tab />
				</TabList>
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
			useState.mockReturnValueOnce([1, setFocused]).mockReturnValueOnce([false]).mockReturnValueOnce([0]);
			const wrapper = shallow(
				<TabList selectedIndex={0}>
					<Tab />
				</TabList>
			);
			wrapper.find('[role="tablist"]').simulate('blur', {relatedTarget});
			expect(contains.mock.calls).toEqual([[relatedTarget]]);
			expect(setFocused.mock.calls).toEqual([]);
		});

		it('calls setScrollLeft on scroll', () => {
			const setScrollLeft = jest.fn();
			useState.mockReturnValueOnce([1]).mockReturnValueOnce([false]).mockReturnValueOnce([150, setScrollLeft]);
			const wrapper = shallow(
				<TabList selectedIndex={0}>
					<Tab />
				</TabList>
			);
			wrapper.find('[role="tablist"]').simulate('scroll', {target: {scrollLeft: 50}});
			expect(setScrollLeft.mock.calls).toEqual([[50]]);
		});

		it('calls setScrollLeft when the left arrow button is clicked', () => {
			const setScrollLeft = jest.fn();
			useRef.mockReturnValueOnce({current: {scrollWidth: 200, childNodes: [{}, {}, {}, {}]}});
			useState.mockReturnValueOnce([1]).mockReturnValueOnce([false]).mockReturnValueOnce([150, setScrollLeft]);
			const wrapper = shallow(
				<TabList selectedIndex={0}>
					<Tab />
				</TabList>
			);
			wrapper.find('button').at(0).simulate('click');
			expect(setScrollLeft.mock.calls).toEqual([[anyFunction]]);
			const cb = setScrollLeft.mock.calls[0][0];
			expect(cb(150)).toBe(100);
			expect(cb(50)).toBe(0);
		});

		it('calls setScrollLeft when the right arrow button is clicked', () => {
			const setScrollLeft = jest.fn();
			useRef.mockReturnValueOnce({current: {scrollWidth: 200, clientWidth: 50, childNodes: [{}, {}, {}, {}]}});
			useState.mockReturnValueOnce([1]).mockReturnValueOnce([false]).mockReturnValueOnce([150, setScrollLeft]);
			const wrapper = shallow(
				<TabList selectedIndex={0}>
					<Tab />
				</TabList>
			);
			wrapper.find('button').at(1).simulate('click');
			expect(setScrollLeft.mock.calls).toEqual([[anyFunction]]);
			const cb = setScrollLeft.mock.calls[0][0];
			expect(cb(50)).toBe(100);
			expect(cb(125)).toBe(150);
		});

		it('adds an effect which calls setFocused when selectedIndex changes', () => {
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([1, setFocused]).mockReturnValueOnce([false]).mockReturnValueOnce([0]);
			shallow(
				<TabList selectedIndex={0}>
					<Tab />
				</TabList>
			);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, [0]]);
			useEffect.mock.calls[0][0]();
			expect(setFocused.mock.calls).toEqual([[0]]);
		});

		it('adds an effect which sets scrollLeft on the list when scrollLeft changes', () => {
			const list = {};
			useRef.mockReturnValueOnce({current: list});
			useState.mockReturnValueOnce([1]).mockReturnValueOnce([false]).mockReturnValueOnce([50.5]);
			shallow(
				<TabList selectedIndex={0}>
					<Tab />
				</TabList>
			);
			expect(useEffect.mock.calls[1]).toEqual([anyFunction, [50.5]]);
			useEffect.mock.calls[1][0]();
			expect(list.scrollLeft).toBe(51);
		});

		it('adds an effect which calls addResizeObserver', () => {
			const list = {scrollWidth: 200};
			const setCanScroll = jest.fn();
			const ref = {current: list};
			useRef.mockReturnValueOnce(ref);
			useState.mockReturnValueOnce([1]).mockReturnValueOnce([false, setCanScroll]).mockReturnValueOnce([50.5]);
			shallow(
				<TabList selectedIndex={0}>
					<Tab />
				</TabList>
			);
			expect(useEffect.mock.calls[2]).toEqual([anyFunction, []]);
			useEffect.mock.calls[2][0]();
			expect(addResizeObserver.mock.calls).toEqual([[list, anyFunction]]);

			const observer = addResizeObserver.mock.calls[0][1];
			observer({width: 199.5});
			observer({width: 199.1});
			ref.current = null;
			observer({width: 200});
			expect(setCanScroll.mock.calls).toEqual([[false], [true]]);
		});

		it('adds an effect which calls setCanScroll when children change', () => {
			const list = {scrollWidth: 200, clientWidth: 50};
			const setCanScroll = jest.fn();
			const tab = <Tab />;
			useRef.mockReturnValueOnce({current: list});
			useState.mockReturnValueOnce([1]).mockReturnValueOnce([false, setCanScroll]).mockReturnValueOnce([50.5]);
			shallow(<TabList selectedIndex={0}>{tab}</TabList>);
			expect(useEffect.mock.calls[3]).toEqual([anyFunction, [tab]]);
			useEffect.mock.calls[3][0]();
			expect(setCanScroll.mock.calls).toEqual([[true]]);
		});

		it('adds an effect which calls setScrollLeft when the left side of the focused tab is not visible', () => {
			const setScrollLeft = jest.fn();
			useRef.mockReturnValueOnce({
				current: {
					scrollLeft: 100,
					getBoundingClientRect: () => ({left: 200, right: 300, width: 100}),
					childNodes: [{getBoundingClientRect: () => ({left: 180, right: 220})}],
				},
			});
			useState.mockReturnValueOnce([0]).mockReturnValueOnce([true]).mockReturnValueOnce([0, setScrollLeft]);
			shallow(
				<TabList selectedIndex={0}>
					<Tab />
				</TabList>
			);
			expect(useEffect.mock.calls[4]).toEqual([anyFunction, [true, undefined, 0]]);
			useEffect.mock.calls[4][0]();
			expect(setScrollLeft.mock.calls).toEqual([[36]]);
		});

		it('adds an effect which calls setScrollLeft when the left side of the focused tab is not visible and the result is less than 0', () => {
			const setScrollLeft = jest.fn();
			useRef.mockReturnValueOnce({
				current: {
					scrollLeft: 50,
					getBoundingClientRect: () => ({left: 200, right: 300, width: 100}),
					childNodes: [{getBoundingClientRect: () => ({left: 180, right: 220})}],
				},
			});
			useState.mockReturnValueOnce([0]).mockReturnValueOnce([true]).mockReturnValueOnce([0, setScrollLeft]);
			shallow(
				<TabList selectedIndex={0}>
					<Tab />
				</TabList>
			);
			expect(useEffect.mock.calls[4]).toEqual([anyFunction, [true, undefined, 0]]);
			useEffect.mock.calls[4][0]();
			expect(setScrollLeft.mock.calls).toEqual([[0]]);
		});

		it('adds an effect which calls setScrollLeft when the right side of the focused tab is not visible', () => {
			const setScrollLeft = jest.fn();
			useRef.mockReturnValueOnce({
				current: {
					scrollLeft: 100,
					scrollWidth: 300,
					getBoundingClientRect: () => ({left: 200, right: 300, width: 100}),
					childNodes: [{getBoundingClientRect: () => ({left: 280, right: 320})}],
				},
			});
			useState.mockReturnValueOnce([0]).mockReturnValueOnce([true]).mockReturnValueOnce([0, setScrollLeft]);
			shallow(
				<TabList selectedIndex={0} contained>
					<Tab />
				</TabList>
			);
			expect(useEffect.mock.calls[4]).toEqual([anyFunction, [true, true, 0]]);
			useEffect.mock.calls[4][0]();
			expect(setScrollLeft.mock.calls).toEqual([[172]]);
		});

		it('adds an effect which calls setScrollLeft when the right side of the focused tab is not visible and the result is more than the maximum', () => {
			const setScrollLeft = jest.fn();
			useRef.mockReturnValueOnce({
				current: {
					scrollLeft: 200,
					scrollWidth: 300,
					getBoundingClientRect: () => ({left: 200, right: 300, width: 100}),
					childNodes: [{getBoundingClientRect: () => ({left: 280, right: 320})}],
				},
			});
			useState.mockReturnValueOnce([0]).mockReturnValueOnce([true]).mockReturnValueOnce([0, setScrollLeft]);
			shallow(
				<TabList selectedIndex={0} contained>
					<Tab />
				</TabList>
			);
			expect(useEffect.mock.calls[4]).toEqual([anyFunction, [true, true, 0]]);
			useEffect.mock.calls[4][0]();
			expect(setScrollLeft.mock.calls).toEqual([[200]]);
		});

		it('adds an effect which does not call setScrollLeft when the focused tab is already visible', () => {
			const setScrollLeft = jest.fn();
			useRef.mockReturnValueOnce({
				current: {
					getBoundingClientRect: () => ({left: 200, right: 400, width: 200}),
					childNodes: [{getBoundingClientRect: () => ({left: 280, right: 320})}],
				},
			});
			useState.mockReturnValueOnce([0]).mockReturnValueOnce([true]).mockReturnValueOnce([0, setScrollLeft]);
			shallow(
				<TabList selectedIndex={0}>
					<Tab />
				</TabList>
			);
			expect(useEffect.mock.calls[4]).toEqual([anyFunction, [true, undefined, 0]]);
			useEffect.mock.calls[4][0]();
			expect(setScrollLeft.mock.calls).toEqual([]);
		});

		it('adds an effect which does not call setScrollLeft when canScroll is false', () => {
			const setScrollLeft = jest.fn();
			useRef.mockReturnValueOnce({current: {}});
			useState.mockReturnValueOnce([0]).mockReturnValueOnce([false]).mockReturnValueOnce([0, setScrollLeft]);
			shallow(
				<TabList selectedIndex={0}>
					<Tab />
				</TabList>
			);
			expect(useEffect.mock.calls[4]).toEqual([anyFunction, [false, undefined, 0]]);
			useEffect.mock.calls[4][0]();
			expect(setScrollLeft.mock.calls).toEqual([]);
		});
	});
});
