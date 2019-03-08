import React, {useState} from 'react';
import {shallow} from 'enzyme';

import ListInput from '../../src/listInput/ListInput';

jest.unmock('../../src/listInput/ListInput');

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useState: jest.fn(v => [v, jest.fn()]),
}));

describe('ListInput', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<ListInput
					id="test"
					label="Test"
					notice="Notice"
					placeholder="test placeholder"
					emptyText="Test empty"
					list={[{id: '0', name: 'test'}]}
					text="test text"
					error="test error"
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when the notice is not set', () => {
			const wrapper = shallow(
				<ListInput
					id="test"
					label="Test"
					placeholder="test placeholder"
					emptyText="Test empty"
					list={[{id: '0', name: 'test'}]}
					text="test text"
					error="test error"
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when the list is empty', () => {
			const wrapper = shallow(
				<ListInput
					id="test"
					label="Test"
					notice="Notice"
					placeholder="test placeholder"
					emptyText="Test empty"
					list={[]}
					text="test text"
					error="test error"
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when error is not set', () => {
			const wrapper = shallow(
				<ListInput
					id="test"
					label="Test"
					notice="Notice"
					placeholder="test placeholder"
					emptyText="Test empty"
					list={[{id: '0', name: 'test'}]}
					text="test text"
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls getSuggestions when the combo-box requests suggestions', () => {
			const suggestions = [{}];
			const list = [{}];
			const getSuggestions = jest.fn().mockReturnValue({suggestions});
			const wrapper = shallow(<ListInput id="test" list={list} getSuggestions={getSuggestions} />);
			expect(wrapper.find('ComboBox').prop('getSuggestions')('x')).toBe(suggestions);
			expect(getSuggestions.mock.calls).toEqual([['x', list]]);
		});

		it('calls getSuggestions and onErrorChange when the combo-box requests suggestions and the result is an error', () => {
			const error = 'Error';
			const list = [{}];
			const getSuggestions = jest.fn().mockReturnValue({error});
			const onErrorChange = jest.fn();
			const wrapper = shallow(
				<ListInput id="test" list={list} getSuggestions={getSuggestions} onErrorChange={onErrorChange} />
			);
			expect(wrapper.find('ComboBox').prop('getSuggestions')('x')).toEqual([]);
			expect(getSuggestions.mock.calls).toEqual([['x', list]]);
			expect(onErrorChange.mock.calls).toEqual([['Error']]);
		});

		it('sets highlightKey when the combo-box value changes and getHighlightKey returns an id', () => {
			const suggestion = {name: 'Test suggestion'};
			const getHighlightKey = jest.fn().mockReturnValue(1);
			const onTextChange = jest.fn();
			const onErrorChange = jest.fn();
			useState.mockReturnValueOnce([null, jest.fn()]);
			const wrapper = shallow(
				<ListInput
					id="test"
					getHighlightKey={getHighlightKey}
					onTextChange={onTextChange}
					onErrorChange={onErrorChange}
				/>
			);
			wrapper.find('ComboBox').prop('onChange')(suggestion);
			expect(getHighlightKey.mock.calls).toEqual([[suggestion]]);
			expect(onTextChange.mock.calls).toEqual([['']]);
			expect(useState.mock.results[0].value[1].mock.calls).toEqual([[1]]);
		});

		it('calls onListChange when the combo-box value changes and parseInput is set', () => {
			const suggestion = {name: 'Test suggestion'};
			const getSuggestionText = jest.fn().mockReturnValue('Text');
			const getHighlightKey = jest.fn();
			const onListChange = jest.fn();
			const onTextChange = jest.fn();
			const wrapper = shallow(
				<ListInput
					id="test"
					list={['Foo']}
					getSuggestionText={getSuggestionText}
					getHighlightKey={getHighlightKey}
					parseInput={jest.fn()}
					onListChange={onListChange}
					onTextChange={onTextChange}
				/>
			);
			wrapper.find('ComboBox').prop('onChange')(suggestion);
			expect(getHighlightKey.mock.calls).toEqual([[suggestion]]);
			expect(onTextChange.mock.calls).toEqual([['']]);
			expect(onListChange.mock.calls).toEqual([[['Text', 'Foo']]]);
		});

		it('calls onErrorChange when the combo-box value changes and validateSuggestion returns an error', () => {
			const suggestion = {name: 'Test suggestion'};
			const getSuggestionText = jest.fn().mockReturnValue('Text');
			const getHighlightKey = jest.fn();
			const validateSuggestion = jest.fn().mockReturnValue('Error');
			const onTextChange = jest.fn();
			const onErrorChange = jest.fn();
			const wrapper = shallow(
				<ListInput
					id="test"
					getSuggestionText={getSuggestionText}
					getHighlightKey={getHighlightKey}
					validateSuggestion={validateSuggestion}
					renderSuggestion={() => <div />}
					onTextChange={onTextChange}
					onErrorChange={onErrorChange}
				/>
			);
			wrapper.find('ComboBox').prop('onChange')(suggestion);
			expect(getHighlightKey.mock.calls).toEqual([[suggestion]]);
			expect(validateSuggestion.mock.calls).toEqual([[suggestion]]);
			expect(getSuggestionText.mock.calls).toEqual([[suggestion]]);
			expect(onTextChange.mock.calls).toEqual([['Text']]);
			expect(onErrorChange.mock.calls).toEqual([['Error']]);
		});

		it('calls onListChange when the combo-box value changes and validateSuggestion returns null', () => {
			const item = {name: 'Item'};
			const suggestion = {name: 'Test suggestion'};
			const getHighlightKey = jest.fn();
			const validateSuggestion = jest.fn();
			const onListChange = jest.fn();
			const onTextChange = jest.fn();
			const wrapper = shallow(
				<ListInput
					id="test"
					list={[item]}
					getHighlightKey={getHighlightKey}
					validateSuggestion={validateSuggestion}
					renderSuggestion={() => <div />}
					onListChange={onListChange}
					onTextChange={onTextChange}
				/>
			);
			wrapper.find('ComboBox').prop('onChange')(suggestion);
			expect(getHighlightKey.mock.calls).toEqual([[suggestion]]);
			expect(validateSuggestion.mock.calls).toEqual([[suggestion]]);
			expect(onTextChange.mock.calls).toEqual([['']]);
			expect(onListChange.mock.calls).toEqual([[[suggestion, item]]]);
		});

		it('calls onListChange with an empty list when enter is pressed and test is /clear', () => {
			const onListChange = jest.fn();
			const onTextChange = jest.fn();
			const wrapper = shallow(
				<ListInput id="test" text="/clear" onListChange={onListChange} onTextChange={onTextChange} />
			);
			wrapper.find('ComboBox').prop('onEnter')();
			expect(onTextChange.mock.calls).toEqual([['']]);
			expect(onListChange.mock.calls).toEqual([[[]]]);
		});

		it('calls onErrorChange when enter is pressed parseInput returns an error', () => {
			const list = [{}];
			const error = 'Error';
			const parseInput = jest.fn().mockReturnValue({error});
			const onErrorChange = jest.fn();
			const wrapper = shallow(
				<ListInput id="test" list={list} text="test" parseInput={parseInput} onErrorChange={onErrorChange} />
			);
			wrapper.find('ComboBox').prop('onEnter')();
			expect(parseInput.mock.calls).toEqual([['test', list]]);
			expect(onErrorChange.mock.calls).toEqual([[error]]);
		});

		it('calls onListChange with the parsed list when enter is pressed and parseInput returns a list', () => {
			const list = [{id: 0}];
			const entries = [{id: 1}];
			const parseInput = jest.fn().mockReturnValue({entries});
			const onListChange = jest.fn();
			const onTextChange = jest.fn();
			const wrapper = shallow(
				<ListInput
					id="test"
					list={list}
					text="test"
					parseInput={parseInput}
					onListChange={onListChange}
					onTextChange={onTextChange}
				/>
			);
			wrapper.find('ComboBox').prop('onEnter')();
			expect(parseInput.mock.calls).toEqual([['test', list]]);
			expect(onTextChange.mock.calls).toEqual([['']]);
			expect(onListChange.mock.calls).toEqual([[[...entries, ...list]]]);
		});

		it('ignores input when enter is pressed and parseInput is not set', () => {
			const onListChange = jest.fn();
			const onTextChange = jest.fn();
			const wrapper = shallow(<ListInput id="test" onListChange={onListChange} onTextChange={onTextChange} />);
			wrapper.find('ComboBox').prop('onEnter')();
		});

		it('calls onTextChange when the combo-box text changes', () => {
			const text = 'test';
			const onTextChange = jest.fn();
			const wrapper = shallow(<ListInput id="test" onTextChange={onTextChange} />);
			wrapper.find('ComboBox').prop('onTextChange')(text);
			expect(onTextChange.mock.calls).toEqual([[text]]);
		});

		it('calls onTextChange and onErrorChange when the combo-box text changes and error is set', () => {
			const text = 'test';
			const onTextChange = jest.fn();
			const onErrorChange = jest.fn();
			const wrapper = shallow(
				<ListInput id="test" error="Error" onTextChange={onTextChange} onErrorChange={onErrorChange} />
			);
			wrapper.find('ComboBox').prop('onTextChange')(text);
			expect(onTextChange.mock.calls).toEqual([[text]]);
			expect(onErrorChange.mock.calls).toEqual([[null]]);
		});

		it('calls onListChange when an item is removed', () => {
			const item0 = {id: 0};
			const item1 = {id: 1};
			const onListChange = jest.fn();
			const wrapper = shallow(<ListInput id="test" list={[item0, item1]} onListChange={onListChange} />);
			wrapper.find('ListEntries').prop('onRemoveClick')(item0);
			expect(onListChange.mock.calls).toEqual([[[item1]]]);
		});

		it('sets highlightKey to null when highlight is cleared', () => {
			const wrapper = shallow(<ListInput id="test" list={[{}]} />);
			wrapper.find('ListEntries').prop('onHighlightClear')();
			expect(useState.mock.results[0].value[1].mock.calls).toEqual([[null]]);
		});
	});
});
