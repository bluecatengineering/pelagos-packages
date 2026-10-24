import {useEffect, useRef, useState} from 'react';
import {shallow} from 'enzyme';

import ContentSwitcher from '../../src/components/ContentSwitcher';
import ContentSwitcherButton from '../../src/components/ContentSwitcherButton';

jest.unmock('../../src/components/ContentSwitcher');

const anyFunction = expect.any(Function);

global.document = {};

describe('ContentSwitcher', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const button = <ContentSwitcherButton className="Foo" />;
			const wrapper = shallow(
				<ContentSwitcher selected={0}>
					{button}
					<ContentSwitcherButton className="Bar" />
				</ContentSwitcher>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(
				<ContentSwitcher id="test" className="TestClass" selected={0}>
					<ContentSwitcherButton className="Foo" />
					<ContentSwitcherButton className="Bar" />
				</ContentSwitcher>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('skips empty children', () => {
			const wrapper = shallow(
				<ContentSwitcher selected={1}>
					{false}
					<ContentSwitcherButton className="Foo" />
					{null}
					<ContentSwitcherButton className="Bar" />
				</ContentSwitcher>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onChange when a button is clicked', () => {
			const button = {dataset: {index: '1'}};
			const closest = jest.fn().mockReturnValue(button);
			const onChange = jest.fn();
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([1, setFocused]);
			const wrapper = shallow(
				<ContentSwitcher id="test" selected={0} onChange={onChange}>
					<ContentSwitcherButton />
					<ContentSwitcherButton />
				</ContentSwitcher>
			);
			wrapper.find('#test').simulate('click', {target: {closest}});
			expect(setFocused.mock.calls).toEqual([[1]]);
			expect(onChange.mock.calls).toEqual([[1]]);
		});

		it('does not call onChange when the selected button is clicked', () => {
			const button = {dataset: {index: '0'}};
			const closest = jest.fn().mockReturnValue(button);
			const onChange = jest.fn();
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([0, setFocused]);
			const wrapper = shallow(
				<ContentSwitcher id="test" selected={0} onChange={onChange}>
					<ContentSwitcherButton />
				</ContentSwitcher>
			);
			wrapper.find('#test').simulate('click', {target: {closest}});
			expect(setFocused.mock.calls).toEqual([[0]]);
			expect(onChange.mock.calls).toEqual([]);
		});

		it('does not call onChange when no button is clicked', () => {
			const closest = jest.fn();
			const onChange = jest.fn();
			const wrapper = shallow(
				<ContentSwitcher id="test" selected={0} onChange={onChange}>
					<ContentSwitcherButton />
				</ContentSwitcher>
			);
			wrapper.find('#test').simulate('click', {target: {closest}});
			expect(onChange.mock.calls).toEqual([]);
		});

		it('leaves Enter and Space to the buttons', () => {
			const onChange = jest.fn();
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([0, setFocused]);
			const wrapper = shallow(
				<ContentSwitcher id="test" selected={1} onChange={onChange}>
					<ContentSwitcherButton />
					<ContentSwitcherButton />
				</ContentSwitcher>
			);
			const container = wrapper.find('#test');
			container.simulate('keydown', {key: 'Enter'});
			container.simulate('keydown', {key: ' '});
			expect(onChange.mock.calls).toEqual([]);
			expect(setFocused.mock.calls).toEqual([]);
		});

		it('keeps the focus on the only button when an arrow key is pressed', () => {
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([0, setFocused]);
			const wrapper = shallow(
				<ContentSwitcher id="test" selected={0}>
					<ContentSwitcherButton />
				</ContentSwitcher>
			);
			wrapper.find('#test').simulate('keydown', {key: 'ArrowLeft'});
			wrapper.find('#test').simulate('keydown', {key: 'ArrowRight'});
			expect(setFocused.mock.calls).toEqual([[0], [0]]);
		});

		it('calls setFocused when ArrowLeft is pressed', () => {
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([1, setFocused]);
			const wrapper = shallow(
				<ContentSwitcher id="test" selected={1}>
					<ContentSwitcherButton />
					<ContentSwitcherButton />
					<ContentSwitcherButton />
				</ContentSwitcher>
			);
			wrapper.find('#test').simulate('keydown', {key: 'ArrowLeft'});
			expect(setFocused.mock.calls).toEqual([[0]]);
		});

		it('calls setFocused when ArrowLeft is pressed on the first button', () => {
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([0, setFocused]);
			const wrapper = shallow(
				<ContentSwitcher id="test" selected={0}>
					<ContentSwitcherButton />
					<ContentSwitcherButton />
					<ContentSwitcherButton />
				</ContentSwitcher>
			);
			wrapper.find('#test').simulate('keydown', {key: 'ArrowLeft'});
			expect(setFocused.mock.calls).toEqual([[2]]);
		});

		it('calls setFocused when ArrowRight is pressed', () => {
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([1, setFocused]);
			const wrapper = shallow(
				<ContentSwitcher id="test" selected={1}>
					<ContentSwitcherButton />
					<ContentSwitcherButton />
					<ContentSwitcherButton />
				</ContentSwitcher>
			);
			wrapper.find('#test').simulate('keydown', {key: 'ArrowRight'});
			expect(setFocused.mock.calls).toEqual([[2]]);
		});

		it('calls setFocused when ArrowRight is pressed on the last button', () => {
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([2, setFocused]);
			const wrapper = shallow(
				<ContentSwitcher id="test" selected={2}>
					<ContentSwitcherButton />
					<ContentSwitcherButton />
					<ContentSwitcherButton />
				</ContentSwitcher>
			);
			wrapper.find('#test').simulate('keydown', {key: 'ArrowRight'});
			expect(setFocused.mock.calls).toEqual([[0]]);
		});

		it('moves the focus back to the selected button on blur', () => {
			const relatedTarget = {foo: 'test'};
			const contains = jest.fn();
			const onChange = jest.fn();
			const setFocused = jest.fn();
			useRef.mockReturnValue({current: {contains}});
			useState.mockReturnValueOnce([1, setFocused]);
			const wrapper = shallow(
				<ContentSwitcher id="test" selected={0} onChange={onChange}>
					<ContentSwitcherButton />
				</ContentSwitcher>
			);
			wrapper.find('#test').simulate('blur', {relatedTarget});
			expect(contains.mock.calls).toEqual([[relatedTarget]]);
			expect(setFocused.mock.calls).toEqual([[0]]);
			expect(onChange.mock.calls).toEqual([]);
		});

		it('does not move the focus on blur when current is not set', () => {
			const relatedTarget = {foo: 'test'};
			const onChange = jest.fn();
			useRef.mockReturnValue({});
			useState.mockReturnValueOnce([1]);
			const wrapper = shallow(
				<ContentSwitcher id="test" selected={0} onChange={onChange}>
					<ContentSwitcherButton />
				</ContentSwitcher>
			);
			wrapper.find('#test').simulate('blur', {relatedTarget});
			expect(onChange.mock.calls).toEqual([]);
		});

		it('does not move the focus on blur when relatedTarget is inside container', () => {
			const relatedTarget = {foo: 'test'};
			const contains = jest.fn().mockReturnValue(true);
			const onChange = jest.fn();
			useRef.mockReturnValue({current: {contains}});
			useState.mockReturnValueOnce([1]);
			const wrapper = shallow(
				<ContentSwitcher id="test" selected={0} onChange={onChange}>
					<ContentSwitcherButton />
				</ContentSwitcher>
			);
			wrapper.find('#test').simulate('blur', {relatedTarget});
			expect(contains.mock.calls).toEqual([[relatedTarget]]);
			expect(onChange.mock.calls).toEqual([]);
		});

		it('does not move the focus on blur when focused equals selected', () => {
			const relatedTarget = {foo: 'test'};
			const contains = jest.fn();
			const onChange = jest.fn();
			useRef.mockReturnValue({current: {contains}});
			useState.mockReturnValueOnce([0]);
			const wrapper = shallow(
				<ContentSwitcher id="test" selected={0} onChange={onChange}>
					<ContentSwitcherButton />
				</ContentSwitcher>
			);
			wrapper.find('#test').simulate('blur', {relatedTarget});
			expect(contains.mock.calls).toEqual([[relatedTarget]]);
			expect(onChange.mock.calls).toEqual([]);
		});

		it('adds an effect which moves the focus to the selected button when selected changes', () => {
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([0, setFocused]);
			shallow(
				<ContentSwitcher selected={1}>
					<ContentSwitcherButton />
					<ContentSwitcherButton />
				</ContentSwitcher>
			);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, [1]]);

			useEffect.mock.calls[0][0]();
			expect(setFocused.mock.calls).toEqual([[1]]);
		});

		it('adds an effect which calls focus on selected if activeElement is inside', () => {
			const activeElement = {foo: 'test'};
			const contains = jest.fn().mockReturnValue(true);
			const focus = jest.fn();
			useRef.mockReturnValue({current: {contains, childNodes: [{focus}]}});
			document.activeElement = activeElement;
			shallow(
				<ContentSwitcher selected={0}>
					<ContentSwitcherButton />
				</ContentSwitcher>
			);
			expect(useEffect.mock.calls[1]).toEqual([anyFunction, [0]]);

			useEffect.mock.calls[1][0]();
			expect(contains.mock.calls).toEqual([[activeElement]]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('adds an effect which does not call focus on selected if activeElement is outside', () => {
			const activeElement = {foo: 'test'};
			const contains = jest.fn().mockReturnValue(false);
			const focus = jest.fn();
			useRef.mockReturnValue({current: {contains, childNodes: [{focus}]}});
			document.activeElement = activeElement;
			shallow(
				<ContentSwitcher selected={0}>
					<ContentSwitcherButton />
				</ContentSwitcher>
			);
			expect(useEffect.mock.calls[1]).toEqual([anyFunction, [0]]);

			useEffect.mock.calls[1][0]();
			expect(contains.mock.calls).toEqual([[activeElement]]);
			expect(focus.mock.calls).toEqual([]);
		});

		it('adds an effect which does not throw if ref.current is null', () => {
			const activeElement = {foo: 'test'};
			useRef.mockReturnValue({current: null});
			document.activeElement = activeElement;
			shallow(
				<ContentSwitcher selected={0}>
					<ContentSwitcherButton />
				</ContentSwitcher>
			);
			expect(useEffect.mock.calls[1]).toEqual([anyFunction, [0]]);

			expect(() => useEffect.mock.calls[1][0]()).not.toThrow();
		});
	});
});
