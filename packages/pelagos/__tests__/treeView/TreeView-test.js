import {useEffect, useRef, useState} from 'react';
import {shallow} from 'enzyme';

import TreeView from '../../src/treeView/TreeView';

jest.unmock('../../src/treeView/TreeView');

const anyFunction = expect.any(Function);

global.document = {activeElement: 'active-element'};

describe('TreeView', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<TreeView>children</TreeView>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(
				<TreeView className="TestClass" size="xs" selected="test-id">
					children
				</TreeView>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('initializes focused to selected when specified', () => {
			shallow(<TreeView selected="test-id" />);
			expect(useState.mock.calls).toEqual([[anyFunction]]);
			expect(useState.mock.calls[0][0]()).toBe('test-id');
		});

		it('initializes focused to the id of the first child when selected is not specified', () => {
			shallow(
				<TreeView>
					<div id="child-id" />
				</TreeView>
			);
			expect(useState.mock.calls).toEqual([[anyFunction]]);
			expect(useState.mock.calls[0][0]()).toBe('child-id');
		});

		it('adds an effect which calls setFocused when selected changes', () => {
			const children = <div id="child-id" />;
			const contains = jest.fn();
			const setFocused = jest.fn();
			useRef.mockReturnValueOnce({current: {contains}});
			useState.mockReturnValueOnce(['test-id', setFocused]);
			shallow(<TreeView selected="other-id">{children}</TreeView>);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, [children, 'other-id']]);

			useEffect.mock.calls[0][0]();
			expect(contains.mock.calls).toEqual([['active-element']]);
			expect(setFocused.mock.calls).toEqual([['other-id']]);
		});

		it('adds an effect which calls setFocused when selected changes to null', () => {
			const children = <div id="child-id" />;
			const contains = jest.fn();
			const setFocused = jest.fn();
			useRef.mockReturnValueOnce({current: {contains}});
			useState.mockReturnValueOnce(['test-id', setFocused]);
			shallow(<TreeView selected={null}>{children}</TreeView>);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, [children, null]]);

			useEffect.mock.calls[0][0]();
			expect(contains.mock.calls).toEqual([['active-element']]);
			expect(setFocused.mock.calls).toEqual([['child-id']]);
		});

		it('adds an effect which does not call setFocused when a node in the tree has focus', () => {
			const children = <div id="child-id" />;
			const contains = jest.fn().mockReturnValue(true);
			const setFocused = jest.fn();
			useRef.mockReturnValueOnce({current: {contains}});
			useState.mockReturnValueOnce(['test-id', setFocused]);
			shallow(<TreeView selected="other-id">{children}</TreeView>);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, [children, 'other-id']]);

			useEffect.mock.calls[0][0]();
			expect(contains.mock.calls).toEqual([['active-element']]);
			expect(setFocused.mock.calls).toEqual([]);
		});
	});
});
