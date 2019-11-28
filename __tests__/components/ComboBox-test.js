import React, {useRef, useEffect, useState} from 'react';
import {shallow} from 'enzyme';
import debounce from 'lodash-es/debounce';
import {scrollToItem} from '@bluecat/helpers';

import ComboBox from '../../src/components/ComboBox';

jest.unmock('../../src/components/ComboBox');

jest.mock('react', () => ({
	...jest.requireActual('react'),
	createRef: jest.fn(() => ({})),
	useEffect: jest.fn(),
	useState: jest.fn(v => [v, jest.fn()]),
	useRef: jest.fn(current => ({current})),
}));
jest.mock('lodash-es/debounce', () => jest.fn(f => ((f.cancel = jest.fn()), f)));

describe('ComboBox', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<ComboBox id="test" placeholder="test placeholder" text="test text" error />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when error is not set', () => {
			const wrapper = shallow(<ComboBox id="test" placeholder="test placeholder" text="test text" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when the suggestions are displayed', () => {
			useState
				.mockReturnValueOnce([[{name: 'Test suggestion 0'}, {name: 'Test suggestion 1'}], jest.fn()])
				.mockReturnValueOnce([true, jest.fn()])
				.mockReturnValueOnce([0, jest.fn()]);
			const wrapper = shallow(
				<ComboBox
					id="test"
					placeholder="test placeholder"
					text="x"
					renderSuggestion={i => <div className="TestClass">{i.name}</div>}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('hides the list when text is empty', () => {
			shallow(<ComboBox id="test" />);
			expect(useEffect.mock.calls).toEqual([
				[expect.any(Function), [expect.any(Function), expect.any(Function), undefined, undefined]],
			]);
			const cancel = debounce.mock.results[0].value.cancel;
			expect(useEffect.mock.calls[0][0]()).toBe(cancel);
			expect(useState.mock.results[0].value[1].mock.calls).toEqual([[[]]]);
			expect(useState.mock.results[1].value[1].mock.calls).toEqual([[false]]);
			expect(useState.mock.results[2].value[1].mock.calls).toEqual([[-1]]);
			expect(cancel).toHaveBeenCalledTimes(1);
		});

		it('hides the list when text starts with slash', () => {
			shallow(<ComboBox id="test" text="/x" />);
			expect(useEffect.mock.calls).toEqual([
				[expect.any(Function), [expect.any(Function), expect.any(Function), '/x', undefined]],
			]);
			const cancel = debounce.mock.results[0].value.cancel;
			expect(useEffect.mock.calls[0][0]()).toBe(cancel);
			expect(useState.mock.results[0].value[1].mock.calls).toEqual([[[]]]);
			expect(useState.mock.results[1].value[1].mock.calls).toEqual([[false]]);
			expect(useState.mock.results[2].value[1].mock.calls).toEqual([[-1]]);
			expect(cancel).toHaveBeenCalledTimes(1);
		});

		it('calls getSuggestions when text is not empty', () => {
			const suggestions = [{}];
			const getSuggestions = jest.fn().mockReturnValue(suggestions);
			shallow(<ComboBox id="test" text="x" getSuggestions={getSuggestions} />);
			expect(useEffect.mock.calls).toEqual([
				[expect.any(Function), [expect.any(Function), expect.any(Function), 'x', undefined]],
			]);
			useEffect.mock.calls[0][0]();
			expect(getSuggestions.mock.calls).toEqual([['x']]);
			expect(useState.mock.results[0].value[1].mock.calls).toEqual([[suggestions]]);
			expect(useState.mock.results[1].value[1].mock.calls).toEqual([[true]]);
			expect(useState.mock.results[2].value[1].mock.calls).toEqual([[-1]]);
		});

		it('calls getSuggestions and sets selection when text is not empty and autoSelect is set', () => {
			const suggestions = [{}];
			const getSuggestions = jest.fn().mockReturnValue(suggestions);
			shallow(<ComboBox id="test" autoSelect text="x" getSuggestions={getSuggestions} />);
			expect(useEffect.mock.calls).toEqual([
				[expect.any(Function), [expect.any(Function), expect.any(Function), 'x', undefined]],
			]);
			useEffect.mock.calls[0][0]();
			expect(getSuggestions.mock.calls).toEqual([['x']]);
			expect(useState.mock.results[0].value[1].mock.calls).toEqual([[suggestions]]);
			expect(useState.mock.results[1].value[1].mock.calls).toEqual([[true]]);
			expect(useState.mock.results[2].value[1].mock.calls).toEqual([[0]]);
		});

		it('calls getSuggestions and hides the list when text is not empty and suggestions is empty', () => {
			const suggestions = [];
			const getSuggestions = jest.fn().mockReturnValue(suggestions);
			shallow(<ComboBox id="test" text="x" getSuggestions={getSuggestions} />);
			expect(useEffect.mock.calls).toEqual([
				[expect.any(Function), [expect.any(Function), expect.any(Function), 'x', undefined]],
			]);
			useEffect.mock.calls[0][0]();
			expect(getSuggestions.mock.calls).toEqual([['x']]);
			expect(useState.mock.results[0].value[1].mock.calls).toEqual([[[]]]);
			expect(useState.mock.results[1].value[1].mock.calls).toEqual([[false]]);
			expect(useState.mock.results[2].value[1].mock.calls).toEqual([[-1]]);
		});

		it('calls preventDefault when enter is pressed', () => {
			const preventDefault = jest.fn();
			const wrapper = shallow(<ComboBox id="test" />);
			wrapper.find('input').simulate('keydown', {keyCode: 13, preventDefault});
			expect(preventDefault).toHaveBeenCalledTimes(1);
		});

		it('calls preventDefault when escape is pressed', () => {
			const preventDefault = jest.fn();
			const wrapper = shallow(<ComboBox id="test" />);
			wrapper.find('input').simulate('keydown', {keyCode: 27, preventDefault});
			expect(preventDefault).toHaveBeenCalledTimes(1);
		});

		it('selects the previous item when up is pressed', () => {
			const child = {};
			const listElement = {children: [child]};
			useRef.mockReturnValue({current: listElement});
			useState
				.mockReturnValueOnce([[{}, {}], jest.fn()])
				.mockReturnValueOnce([true, jest.fn()])
				.mockReturnValueOnce([1, jest.fn()]);
			const wrapper = shallow(<ComboBox id="test" renderSuggestion={() => <div />} />);
			wrapper.find('input').simulate('keydown', {keyCode: 38, preventDefault: jest.fn()});
			expect(useState.mock.results[2].value[1].mock.calls).toEqual([[0]]);
			expect(scrollToItem.mock.calls).toEqual([[listElement, child]]);
		});

		it('selects the last item when up is pressed and selected is 0', () => {
			const child = {};
			const listElement = {children: [null, child]};
			useRef.mockReturnValue({current: listElement});
			useState
				.mockReturnValueOnce([[{}, {}], jest.fn()])
				.mockReturnValueOnce([true, jest.fn()])
				.mockReturnValueOnce([0, jest.fn()]);
			const wrapper = shallow(<ComboBox id="test" renderSuggestion={() => <div />} />);
			wrapper.find('input').simulate('keydown', {keyCode: 38, preventDefault: jest.fn()});
			expect(useState.mock.results[2].value[1].mock.calls).toEqual([[1]]);
			expect(scrollToItem.mock.calls).toEqual([[listElement, child]]);
		});

		it('ignores the key when up is pressed and visible is false', () => {
			const wrapper = shallow(<ComboBox id="test" />);
			wrapper.find('input').simulate('keydown', {keyCode: 38, preventDefault: jest.fn()});
			expect(scrollToItem).not.toHaveBeenCalled();
		});

		it('selects the next item when down is pressed', () => {
			const child = {};
			const listElement = {children: [null, child]};
			useRef.mockReturnValue({current: listElement});
			useState
				.mockReturnValueOnce([[{}, {}], jest.fn()])
				.mockReturnValueOnce([true, jest.fn()])
				.mockReturnValueOnce([0, jest.fn()]);
			const wrapper = shallow(<ComboBox id="test" renderSuggestion={() => <div />} />);
			wrapper.find('input').simulate('keydown', {keyCode: 40, preventDefault: jest.fn()});
			expect(useState.mock.results[2].value[1].mock.calls).toEqual([[1]]);
			expect(scrollToItem.mock.calls).toEqual([[listElement, child]]);
		});

		it('selects the first item when down is pressed and selected is the last item', () => {
			const child = {};
			const listElement = {children: [child]};
			useRef.mockReturnValue({current: listElement});
			useState
				.mockReturnValueOnce([[{}, {}], jest.fn()])
				.mockReturnValueOnce([true, jest.fn()])
				.mockReturnValueOnce([1, jest.fn()]);
			const wrapper = shallow(<ComboBox id="test" renderSuggestion={() => <div />} />);
			wrapper.find('input').simulate('keydown', {keyCode: 40, preventDefault: jest.fn()});
			expect(useState.mock.results[2].value[1].mock.calls).toEqual([[0]]);
			expect(scrollToItem.mock.calls).toEqual([[listElement, child]]);
		});

		it('ignores the key when down is pressed and visible is false', () => {
			const wrapper = shallow(<ComboBox id="test" />);
			wrapper.find('input').simulate('keydown', {keyCode: 40, preventDefault: jest.fn()});
			expect(scrollToItem).not.toHaveBeenCalled();
		});

		it('calls onChange when enter is relased and an item is selected', () => {
			const suggestion = {name: 'Test suggestion'};
			const onChange = jest.fn();
			useState
				.mockReturnValueOnce([[suggestion], jest.fn()])
				.mockReturnValueOnce([true, jest.fn()])
				.mockReturnValueOnce([0, jest.fn()]);
			const wrapper = shallow(<ComboBox id="test" renderSuggestion={() => <div />} onChange={onChange} />);
			wrapper.find('input').simulate('keyup', {keyCode: 13, preventDefault: jest.fn()});
			expect(onChange.mock.calls).toEqual([[suggestion]]);
		});

		it('calls onEnter when enter is relased and no item is selected', () => {
			const suggestion = {name: 'Test suggestion'};
			const onEnter = jest.fn();
			useState
				.mockReturnValueOnce([[suggestion], jest.fn()])
				.mockReturnValueOnce([true, jest.fn()])
				.mockReturnValueOnce([-1, jest.fn()]);
			const wrapper = shallow(<ComboBox id="test" text="Test" renderSuggestion={() => <div />} onEnter={onEnter} />);
			wrapper.find('input').simulate('keyup', {keyCode: 13, preventDefault: jest.fn()});
			expect(onEnter).toHaveBeenCalledTimes(1);
		});

		it('ignores input when enter is relased, no item is selected and onEnter is not set', () => {
			const wrapper = shallow(<ComboBox id="test" text="Test" />);
			wrapper.find('input').simulate('keyup', {keyCode: 13, preventDefault: jest.fn()});
		});

		it('hides the list and clears the text when escape is relased', () => {
			const onTextChange = jest.fn();
			const wrapper = shallow(<ComboBox id="test" onTextChange={onTextChange} />);
			wrapper.find('input').simulate('keyup', {keyCode: 27, preventDefault: jest.fn()});
			expect(useState.mock.results[0].value[1].mock.calls).toEqual([[[]]]);
			expect(useState.mock.results[1].value[1].mock.calls).toEqual([[false]]);
			expect(useState.mock.results[2].value[1].mock.calls).toEqual([[-1]]);
			expect(onTextChange.mock.calls).toEqual([['']]);
		});

		it('calls onTextChange on change', () => {
			const value = 'test';
			const onTextChange = jest.fn();
			const wrapper = shallow(<ComboBox id="test" onTextChange={onTextChange} />);
			wrapper.find('input').simulate('change', {target: {value}});
			expect(onTextChange.mock.calls).toEqual([[value]]);
		});

		it('expands the list on focus', () => {
			useState
				.mockReturnValueOnce([[{}], jest.fn()])
				.mockReturnValueOnce([true, jest.fn()])
				.mockReturnValueOnce([1, jest.fn()]);
			const wrapper = shallow(<ComboBox id="test" parseInput={jest.fn()} renderSuggestion={() => <div />} />);
			wrapper.find('input').simulate('focus');
			expect(useState.mock.results[1].value[1].mock.calls).toEqual([[true]]);
			expect(useState.mock.results[2].value[1].mock.calls).toEqual([[-1]]);
		});

		it('expands the list and selects the first on focus if autoSelect is set', () => {
			useState
				.mockReturnValueOnce([[{}], jest.fn()])
				.mockReturnValueOnce([true, jest.fn()])
				.mockReturnValueOnce([1, jest.fn()]);
			const wrapper = shallow(<ComboBox id="test" autoSelect renderSuggestion={() => <div />} />);
			wrapper.find('input').simulate('focus');
			expect(useState.mock.results[1].value[1].mock.calls).toEqual([[true]]);
			expect(useState.mock.results[2].value[1].mock.calls).toEqual([[0]]);
		});

		it('does not expand the list on focus if suggestions is empty', () => {
			const wrapper = shallow(<ComboBox id="test" />);
			wrapper.find('input').simulate('focus');
			expect(useState.mock.results[1].value[1]).not.toHaveBeenCalled();
		});

		it('collapses the list on blur', () => {
			const wrapper = shallow(<ComboBox id="test" />);
			wrapper.find('input').simulate('blur');
			expect(useState.mock.results[1].value[1].mock.calls).toEqual([[false]]);
		});

		it('selects the item on mouse over', () => {
			useState
				.mockReturnValueOnce([[{}], jest.fn()])
				.mockReturnValueOnce([true, jest.fn()])
				.mockReturnValueOnce([-1, jest.fn()]);
			const closest = jest.fn().mockReturnValue({dataset: {index: '0'}});
			const wrapper = shallow(<ComboBox id="test" renderSuggestion={() => <div />} />);
			wrapper.find('[role="listbox"]').simulate('mouseover', {target: {closest}});
			expect(closest).toHaveBeenCalledTimes(1);
			expect(useState.mock.results[2].value[1].mock.calls).toEqual([[0]]);
		});

		it('ignores the event on mouse over if the element is not found', () => {
			useState
				.mockReturnValueOnce([[{}], jest.fn()])
				.mockReturnValueOnce([true, jest.fn()])
				.mockReturnValueOnce([-1, jest.fn()]);
			const closest = jest.fn();
			const wrapper = shallow(<ComboBox id="test" renderSuggestion={() => <div />} />);
			wrapper.find('[role="listbox"]').simulate('mouseover', {target: {closest}});
			expect(closest).toHaveBeenCalledTimes(1);
			expect(useState.mock.results[2].value[1]).not.toHaveBeenCalled();
		});

		it('calls preventDefault on mouse down', () => {
			useState
				.mockReturnValueOnce([[{}], jest.fn()])
				.mockReturnValueOnce([true, jest.fn()])
				.mockReturnValueOnce([-1, jest.fn()]);
			const preventDefault = jest.fn();
			const wrapper = shallow(<ComboBox id="test" renderSuggestion={() => <div />} />);
			wrapper.find('[role="listbox"]').simulate('mousedown', {preventDefault});
			expect(preventDefault).toHaveBeenCalledTimes(1);
		});

		it('calls onChange on mouse up if the element is found', () => {
			const suggestion = {name: 'Test suggestion'};
			const onChange = jest.fn();
			useState
				.mockReturnValueOnce([[suggestion], jest.fn()])
				.mockReturnValueOnce([true, jest.fn()])
				.mockReturnValueOnce([0, jest.fn()]);
			const closest = jest.fn().mockReturnValue({dataset: {index: '0'}});
			const preventDefault = jest.fn();
			const wrapper = shallow(<ComboBox id="test" renderSuggestion={() => <div />} onChange={onChange} />);
			wrapper.find('[role="listbox"]').simulate('mouseup', {target: {closest}, preventDefault});
			expect(closest).toHaveBeenCalledTimes(1);
			expect(preventDefault).toHaveBeenCalledTimes(1);
			expect(onChange.mock.calls).toEqual([[suggestion]]);
		});

		it('ignores the event on mouse up if the element is not found', () => {
			useState
				.mockReturnValueOnce([[{}], jest.fn()])
				.mockReturnValueOnce([true, jest.fn()])
				.mockReturnValueOnce([-1, jest.fn()]);
			const closest = jest.fn();
			const wrapper = shallow(<ComboBox id="test" renderSuggestion={() => <div />} />);
			wrapper.find('[role="listbox"]').simulate('mouseup', {target: {closest}});
			expect(closest).toHaveBeenCalledTimes(1);
		});
	});
});
