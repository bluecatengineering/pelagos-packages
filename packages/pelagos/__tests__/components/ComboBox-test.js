import {useEffect, useRef, useState} from 'react';
import {shallow} from 'enzyme';
import debounce from 'lodash-es/debounce';

import ComboBox from '../../src/components/ComboBox';
import scrollToItem from '../../src/functions/scrollToItem';
import useRandomId from '../../src/hooks/useRandomId';

jest.unmock('../../src/components/ComboBox');

jest.mock('lodash-es/debounce', () => jest.fn((f) => (f && ((f.cancel = jest.fn()), (f.flush = jest.fn())), f)));

const getElementById = jest.fn();
global.document = {body: 'body', getElementById};

useRandomId.mockReturnValue('random-id');

describe('ComboBox', () => {
	beforeEach(() => (document.fullscreenElement = null));

	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<ComboBox id="test" placeholder="test placeholder" text="test text" error />);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useRandomId.mock.calls).toEqual([['test']]);
		});

		it('renders expected elements when error is not set', () => {
			const wrapper = shallow(<ComboBox id="test" placeholder="test placeholder" text="test text" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when noLayer is true', () => {
			const wrapper = shallow(<ComboBox id="test" placeholder="test placeholder" text="test text" noLayer error />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when document.fullscreenElement is set', () => {
			document.fullscreenElement = 'fullscreen';
			const wrapper = shallow(<ComboBox id="test" placeholder="test placeholder" text="test text" error />);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useRandomId.mock.calls).toEqual([['test']]);
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
					renderSuggestion={(i) => <div className="TestClass">{i.name}</div>}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('adds an effect which hides the list when text is empty', () => {
			shallow(<ComboBox id="test" />);
			expect(useEffect.mock.calls[0]).toEqual([
				expect.any(Function),
				[expect.any(Function), expect.any(Function), undefined, undefined],
			]);
			const cancel = debounce.mock.results[0].value.cancel;
			useEffect.mock.calls[0][0]();
			expect(useState.mock.results[0].value[1].mock.calls).toEqual([[[]]]);
			expect(useState.mock.results[1].value[1].mock.calls).toEqual([[false]]);
			expect(useState.mock.results[2].value[1].mock.calls).toEqual([[-1]]);
			expect(cancel.mock.calls).toEqual([[]]);
		});

		it('adds an effect which hides the list when text starts with slash', () => {
			shallow(<ComboBox id="test" text="/x" />);
			expect(useEffect.mock.calls[0]).toEqual([
				expect.any(Function),
				[expect.any(Function), expect.any(Function), '/x', undefined],
			]);
			const cancel = debounce.mock.results[0].value.cancel;
			useEffect.mock.calls[0][0]();
			expect(useState.mock.results[0].value[1].mock.calls).toEqual([[[]]]);
			expect(useState.mock.results[1].value[1].mock.calls).toEqual([[false]]);
			expect(useState.mock.results[2].value[1].mock.calls).toEqual([[-1]]);
			expect(cancel.mock.calls).toEqual([[]]);
		});

		it('adds an effect which does not hide the list when text does not start with slash', () => {
			shallow(<ComboBox id="test" text="x" />);
			expect(useEffect.mock.calls[0]).toEqual([
				expect.any(Function),
				[expect.any(Function), expect.any(Function), 'x', undefined],
			]);
			const cancel = debounce.mock.results[0].value.cancel;
			useEffect.mock.calls[0][0]();
			expect(useState.mock.results[0].value[1].mock.calls).toEqual([]);
			expect(useState.mock.results[1].value[1].mock.calls).toEqual([]);
			expect(useState.mock.results[2].value[1].mock.calls).toEqual([]);
			expect(cancel.mock.calls).toEqual([]);
		});

		it('adds an effect which cancels call to updateSuggestions when it changes', () => {
			shallow(<ComboBox id="test" />);
			const updateSuggestions = debounce.mock.results[0].value;
			expect(useEffect.mock.calls[1]).toEqual([expect.any(Function), [updateSuggestions]]);
			expect(useEffect.mock.calls[1][0]()).toBe(updateSuggestions.cancel);
		});

		it('calls onChange when enter is pressed and an item is selected', () => {
			const suggestion = {name: 'Test suggestion'};
			const onChange = jest.fn();
			useState
				.mockReturnValueOnce([[suggestion], jest.fn()])
				.mockReturnValueOnce([true, jest.fn()])
				.mockReturnValueOnce([0, jest.fn()]);
			const wrapper = shallow(<ComboBox id="test" renderSuggestion={() => <div />} onChange={onChange} />);
			wrapper.find('[as="input"]').simulate('keydown', {key: 'Enter', preventDefault: jest.fn()});
			expect(onChange.mock.calls).toEqual([[suggestion]]);
		});

		it('calls onEnter when enter is pressed and no item is selected', () => {
			const suggestion = {name: 'Test suggestion'};
			const onTextChange = jest.fn();
			const onEnter = jest.fn();
			useState
				.mockReturnValueOnce([[suggestion], jest.fn()])
				.mockReturnValueOnce([true, jest.fn()])
				.mockReturnValueOnce([-1, jest.fn()]);
			const wrapper = shallow(
				<ComboBox
					id="test"
					text="Test"
					renderSuggestion={() => <div />}
					onTextChange={onTextChange}
					onEnter={onEnter}
				/>
			);
			wrapper
				.find('[as="input"]')
				.simulate('keydown', {key: 'Enter', target: {value: 'test'}, preventDefault: jest.fn()});
			expect(onEnter.mock.calls).toEqual([['test']]);
		});

		it('ignores input when enter is pressed, no item is selected and onEnter is not set', () => {
			const preventDefault = jest.fn();
			const wrapper = shallow(<ComboBox id="test" text="Test" />);
			wrapper.find('[as="input"]').simulate('keydown', {key: 'Enter', preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
		});

		it('hides the list and clears the text when escape is pressed', () => {
			const onTextChange = jest.fn();
			const wrapper = shallow(<ComboBox id="test" onTextChange={onTextChange} />);
			wrapper.find('[as="input"]').simulate('keydown', {key: 'Escape', preventDefault: jest.fn()});
			expect(useState.mock.results[0].value[1].mock.calls).toEqual([[[]]]);
			expect(useState.mock.results[1].value[1].mock.calls).toEqual([[false]]);
			expect(useState.mock.results[2].value[1].mock.calls).toEqual([[-1]]);
			expect(onTextChange.mock.calls).toEqual([['']]);
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
			wrapper.find('[as="input"]').simulate('keydown', {key: 'ArrowUp', preventDefault: jest.fn()});
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
			wrapper.find('[as="input"]').simulate('keydown', {key: 'ArrowUp', preventDefault: jest.fn()});
			expect(useState.mock.results[2].value[1].mock.calls).toEqual([[1]]);
			expect(scrollToItem.mock.calls).toEqual([[listElement, child]]);
		});

		it('ignores the key when up is pressed and visible is false', () => {
			const wrapper = shallow(<ComboBox id="test" />);
			wrapper.find('[as="input"]').simulate('keydown', {key: 'ArrowUp', preventDefault: jest.fn()});
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
			wrapper.find('[as="input"]').simulate('keydown', {key: 'ArrowDown', preventDefault: jest.fn()});
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
			wrapper.find('[as="input"]').simulate('keydown', {key: 'ArrowDown', preventDefault: jest.fn()});
			expect(useState.mock.results[2].value[1].mock.calls).toEqual([[0]]);
			expect(scrollToItem.mock.calls).toEqual([[listElement, child]]);
		});

		it('ignores the key when down is pressed and visible is false', () => {
			const wrapper = shallow(<ComboBox id="test" />);
			wrapper.find('[as="input"]').simulate('keydown', {key: 'ArrowDown', preventDefault: jest.fn()});
			expect(scrollToItem).not.toHaveBeenCalled();
		});

		it('calls onTextChange on change and getSuggestions when text is not empty', () => {
			const value = 'test';
			const suggestions = [{}];
			const promise = Promise.resolve(suggestions);
			const getSuggestions = jest.fn().mockReturnValue(promise);
			const onTextChange = jest.fn();
			const setSuggestions = jest.fn();
			const setOpen = jest.fn();
			const setSelected = jest.fn();
			useState
				.mockReturnValueOnce([[], setSuggestions])
				.mockReturnValueOnce([false, setOpen])
				.mockReturnValueOnce([-1, setSelected]);
			const wrapper = shallow(<ComboBox id="test" getSuggestions={getSuggestions} onTextChange={onTextChange} />);
			wrapper.find('[as="input"]').simulate('change', {target: {value}});
			expect(onTextChange.mock.calls).toEqual([[value]]);
			expect(getSuggestions.mock.calls).toEqual([[value]]);
			return promise.then(() => {
				expect(setSuggestions.mock.calls).toEqual([[suggestions]]);
				expect(setOpen.mock.calls).toEqual([[true]]);
				expect(setSelected.mock.calls).toEqual([[-1]]);
			});
		});

		it('calls onTextChange on change and getSuggestions when text is not empty and autoSelect is set', () => {
			const value = 'test';
			const suggestions = [{}];
			const promise = Promise.resolve(suggestions);
			const getSuggestions = jest.fn().mockReturnValue(promise);
			const onTextChange = jest.fn();
			const setSuggestions = jest.fn();
			const setOpen = jest.fn();
			const setSelected = jest.fn();
			useState
				.mockReturnValueOnce([[], setSuggestions])
				.mockReturnValueOnce([false, setOpen])
				.mockReturnValueOnce([-1, setSelected]);
			const wrapper = shallow(
				<ComboBox id="test" autoSelect getSuggestions={getSuggestions} onTextChange={onTextChange} />
			);
			wrapper.find('[as="input"]').simulate('change', {target: {value}});
			expect(onTextChange.mock.calls).toEqual([[value]]);
			expect(getSuggestions.mock.calls).toEqual([[value]]);
			return promise.then(() => {
				expect(setSuggestions.mock.calls).toEqual([[suggestions]]);
				expect(setOpen.mock.calls).toEqual([[true]]);
				expect(setSelected.mock.calls).toEqual([[0]]);
			});
		});

		it('calls onTextChange on change and getSuggestions when text is not empty and hides the list when suggestions is empty', () => {
			const value = 'test';
			const suggestions = [];
			const promise = Promise.resolve(suggestions);
			const getSuggestions = jest.fn().mockReturnValue(promise);
			const onTextChange = jest.fn();
			const setSuggestions = jest.fn();
			const setOpen = jest.fn();
			const setSelected = jest.fn();
			useState
				.mockReturnValueOnce([[], setSuggestions])
				.mockReturnValueOnce([false, setOpen])
				.mockReturnValueOnce([-1, setSelected]);
			const wrapper = shallow(<ComboBox id="test" getSuggestions={getSuggestions} onTextChange={onTextChange} />);
			wrapper.find('[as="input"]').simulate('change', {target: {value}});
			expect(onTextChange.mock.calls).toEqual([[value]]);
			expect(getSuggestions.mock.calls).toEqual([[value]]);
			return promise.then(() => {
				expect(setSuggestions.mock.calls).toEqual([[[]]]);
				expect(setOpen.mock.calls).toEqual([[false]]);
				expect(setSelected.mock.calls).toEqual([[-1]]);
			});
		});

		it('calls onTextChange on change but not getSuggestions when text is empty', () => {
			const value = '';
			const getSuggestions = jest.fn();
			const onTextChange = jest.fn();
			const setSuggestions = jest.fn();
			const setOpen = jest.fn();
			const setSelected = jest.fn();
			useState
				.mockReturnValueOnce([[], setSuggestions])
				.mockReturnValueOnce([false, setOpen])
				.mockReturnValueOnce([-1, setSelected]);
			const wrapper = shallow(<ComboBox id="test" getSuggestions={getSuggestions} onTextChange={onTextChange} />);
			wrapper.find('[as="input"]').simulate('change', {target: {value}});
			expect(onTextChange.mock.calls).toEqual([[value]]);
			expect(getSuggestions.mock.calls).toEqual([]);
		});

		it('calls onTextChange on change but not getSuggestions when text starts with slash', () => {
			const value = '/x';
			const getSuggestions = jest.fn();
			const onTextChange = jest.fn();
			const setSuggestions = jest.fn();
			const setOpen = jest.fn();
			const setSelected = jest.fn();
			useState
				.mockReturnValueOnce([[], setSuggestions])
				.mockReturnValueOnce([false, setOpen])
				.mockReturnValueOnce([-1, setSelected]);
			const wrapper = shallow(<ComboBox id="test" getSuggestions={getSuggestions} onTextChange={onTextChange} />);
			wrapper.find('[as="input"]').simulate('change', {target: {value}});
			expect(onTextChange.mock.calls).toEqual([[value]]);
			expect(getSuggestions.mock.calls).toEqual([]);
		});

		it('expands the list on focus', () => {
			useState
				.mockReturnValueOnce([[{}], jest.fn()])
				.mockReturnValueOnce([true, jest.fn()])
				.mockReturnValueOnce([1, jest.fn()]);
			const wrapper = shallow(<ComboBox id="test" parseInput={jest.fn()} renderSuggestion={() => <div />} />);
			wrapper.find('[as="input"]').simulate('focus');
			expect(useState.mock.results[1].value[1].mock.calls).toEqual([[true]]);
			expect(useState.mock.results[2].value[1].mock.calls).toEqual([[-1]]);
		});

		it('expands the list and selects the first on focus if autoSelect is set', () => {
			useState
				.mockReturnValueOnce([[{}], jest.fn()])
				.mockReturnValueOnce([true, jest.fn()])
				.mockReturnValueOnce([1, jest.fn()]);
			const wrapper = shallow(<ComboBox id="test" autoSelect renderSuggestion={() => <div />} />);
			wrapper.find('[as="input"]').simulate('focus');
			expect(useState.mock.results[1].value[1].mock.calls).toEqual([[true]]);
			expect(useState.mock.results[2].value[1].mock.calls).toEqual([[0]]);
		});

		it('does not expand the list on focus if suggestions is empty', () => {
			const wrapper = shallow(<ComboBox id="test" />);
			wrapper.find('[as="input"]').simulate('focus');
			expect(useState.mock.results[1].value[1]).not.toHaveBeenCalled();
		});

		it('collapses the list on blur', () => {
			const wrapper = shallow(<ComboBox id="test" />);
			wrapper.find('[as="input"]').simulate('blur');
			expect(useState.mock.results[1].value[1].mock.calls).toEqual([[false]]);
		});

		it('calls onEnter when the add button is clicked', () => {
			const onTextChange = jest.fn();
			const onEnter = jest.fn();
			const focus = jest.fn();
			const value = 'test value';
			const input = {focus, value};
			getElementById.mockReturnValue(input);
			const wrapper = shallow(<ComboBox id="test" onTextChange={onTextChange} onEnter={onEnter} />);
			wrapper.find('#random-id-add').simulate('click');
			expect(focus.mock.calls).toEqual([[]]);
			expect(onEnter.mock.calls).toEqual([[value]]);
		});

		it('calls preventDefault on mouse down', () => {
			useState
				.mockReturnValueOnce([[{}], jest.fn()])
				.mockReturnValueOnce([true, jest.fn()])
				.mockReturnValueOnce([-1, jest.fn()]);
			const preventDefault = jest.fn();
			const wrapper = shallow(<ComboBox id="test" renderSuggestion={() => <div />} />);
			wrapper.find('[role="listbox"]').simulate('mousedown', {preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
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
			expect(closest.mock.calls).toEqual([['[role=option]']]);
			expect(preventDefault.mock.calls).toEqual([[]]);
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
			expect(closest.mock.calls).toEqual([['[role=option]']]);
		});
	});
});
