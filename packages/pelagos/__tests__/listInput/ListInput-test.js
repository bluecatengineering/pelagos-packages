import {useRef, useState} from 'react';
import {shallow} from 'enzyme';

import ListInput from '../../src/listInput/ListInput';
import useRandomId from '../../src/hooks/useRandomId';

jest.unmock('../../src/listInput/ListInput');

useRandomId.mockReturnValue('random-id');

describe('ListInput', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<ListInput
					id="test"
					label="Test"
					required
					placeholder="test placeholder"
					emptyText="Test empty"
					list={[{id: '0', name: 'test'}]}
					helperText="Helper text"
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useRandomId.mock.calls).toEqual([['test']]);
		});

		it('renders expected elements when the list is empty', () => {
			const wrapper = shallow(
				<ListInput id="test" label="Test" placeholder="test placeholder" emptyText="Test empty" list={[]} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(
				<ListInput id="test" className="TestClass" label="Test" list={[{id: '0', name: 'test'}]} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useRandomId.mock.calls).toEqual([['test']]);
		});

		it('renders expected elements when error is set', () => {
			const wrapper = shallow(
				<ListInput
					id="test"
					label="Test"
					placeholder="test placeholder"
					emptyText="Test empty"
					list={[{id: '0', name: 'test'}]}
					helperText="Helper text"
					error="Error"
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when column is set', () => {
			const wrapper = shallow(
				<ListInput
					id="test"
					label="Test"
					placeholder="test placeholder"
					emptyText="Test empty"
					list={[{id: '0', name: 'test'}]}
					column
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
			const setText = jest.fn();
			const getHighlightKey = jest.fn().mockReturnValue(1);
			const onTextChange = jest.fn();
			const onErrorChange = jest.fn();
			useState.mockReturnValueOnce(['', setText]);
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
			expect(setText.mock.calls).toEqual([['']]);
			expect(onTextChange.mock.calls).toEqual([[false]]);
			expect(useState.mock.results[1].value[1].mock.calls).toEqual([[1]]);
		});

		it('calls onListChange when the combo-box value changes and parseInput is set', () => {
			const suggestion = {name: 'Test suggestion'};
			const getSuggestionText = jest.fn().mockReturnValue('Text');
			const getHighlightKey = jest.fn();
			const onListChange = jest.fn();
			const onTextChange = jest.fn();
			const live = {};
			useRef.mockReturnValueOnce({current: live});
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
			expect(onTextChange.mock.calls).toEqual([[false]]);
			expect(onListChange.mock.calls).toEqual([[['Text', 'Foo']]]);
			expect(live.textContent).toBe('Text added');
		});

		it('calls onListChange when the combo-box value changes and both parseInput and getSuggestionValue are set', () => {
			const suggestion = {name: 'Test suggestion'};
			const getSuggestionValue = jest.fn().mockReturnValue('Value');
			const getHighlightKey = jest.fn();
			const getItemName = jest.fn().mockReturnValue('Name');
			const onListChange = jest.fn();
			const onTextChange = jest.fn();
			const live = {};
			useRef.mockReturnValueOnce({current: live});
			const wrapper = shallow(
				<ListInput
					id="test"
					list={['Foo']}
					getSuggestionValue={getSuggestionValue}
					getHighlightKey={getHighlightKey}
					parseInput={jest.fn()}
					getItemName={getItemName}
					onListChange={onListChange}
					onTextChange={onTextChange}
				/>
			);
			wrapper.find('ComboBox').prop('onChange')(suggestion);
			expect(getHighlightKey.mock.calls).toEqual([[suggestion]]);
			expect(getSuggestionValue.mock.calls).toEqual([[suggestion]]);
			expect(getItemName.mock.calls).toEqual([['Value']]);
			expect(onTextChange.mock.calls).toEqual([[false]]);
			expect(onListChange.mock.calls).toEqual([[['Value', 'Foo']]]);
			expect(live.textContent).toBe('Name added');
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
			expect(onTextChange.mock.calls).toEqual([[true]]);
			expect(onErrorChange.mock.calls).toEqual([['Error']]);
			expect(useState.mock.results[0].value[1].mock.calls).toEqual([['Text']]);
		});

		it('calls onListChange when the combo-box value changes and validateSuggestion returns null', () => {
			const item = {name: 'Item'};
			const suggestion = {name: 'Test suggestion'};
			const getSuggestionText = jest.fn().mockReturnValue('Text');
			const getHighlightKey = jest.fn();
			const validateSuggestion = jest.fn();
			const onListChange = jest.fn();
			const onTextChange = jest.fn();
			const live = {};
			useRef.mockReturnValueOnce({current: live});
			const wrapper = shallow(
				<ListInput
					id="test"
					list={[item]}
					getSuggestionText={getSuggestionText}
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
			expect(onTextChange.mock.calls).toEqual([[false]]);
			expect(onListChange.mock.calls).toEqual([[[suggestion, item]]]);
			expect(live.textContent).toBe('Text added');
		});

		it('calls onListChange when the combo-box value changes, getSuggestionValue is set and validateSuggestion returns null', () => {
			const item = {name: 'Item'};
			const value = {name: 'Value'};
			const suggestion = {name: 'Test suggestion'};
			const getSuggestionValue = jest.fn().mockReturnValue(value);
			const getHighlightKey = jest.fn();
			const validateSuggestion = jest.fn();
			const getItemName = jest.fn().mockReturnValue('Name');
			const onListChange = jest.fn();
			const onTextChange = jest.fn();
			const live = {};
			useRef.mockReturnValueOnce({current: live});
			const wrapper = shallow(
				<ListInput
					id="test"
					list={[item]}
					getSuggestionValue={getSuggestionValue}
					getHighlightKey={getHighlightKey}
					validateSuggestion={validateSuggestion}
					renderSuggestion={() => <div />}
					getItemName={getItemName}
					onListChange={onListChange}
					onTextChange={onTextChange}
				/>
			);
			wrapper.find('ComboBox').prop('onChange')(suggestion);
			expect(getHighlightKey.mock.calls).toEqual([[suggestion]]);
			expect(getSuggestionValue.mock.calls).toEqual([[suggestion]]);
			expect(getItemName.mock.calls).toEqual([[value]]);
			expect(validateSuggestion.mock.calls).toEqual([[suggestion]]);
			expect(onTextChange.mock.calls).toEqual([[false]]);
			expect(onListChange.mock.calls).toEqual([[[value, item]]]);
			expect(live.textContent).toBe('Name added');
		});

		it('calls onListChange with an empty list when enter is pressed and text is /clear', () => {
			const setText = jest.fn();
			const onListChange = jest.fn();
			const onTextChange = jest.fn();
			useState.mockReturnValueOnce(['', setText]).mockReturnValueOnce([]);
			const wrapper = shallow(<ListInput id="test" onListChange={onListChange} onTextChange={onTextChange} />);
			wrapper.find('ComboBox').prop('onEnter')('/clear');
			expect(setText.mock.calls).toEqual([['']]);
			expect(onTextChange.mock.calls).toEqual([[false]]);
			expect(onListChange.mock.calls).toEqual([[[]]]);
		});

		it('calls onErrorChange when enter is pressed parseInput returns an error', () => {
			const list = [{}];
			const error = 'Error';
			const parseInput = jest.fn().mockReturnValue({error});
			const onErrorChange = jest.fn();
			useState.mockReturnValueOnce(['']).mockReturnValueOnce([null]);
			const wrapper = shallow(
				<ListInput id="test" list={list} parseInput={parseInput} onErrorChange={onErrorChange} />
			);
			wrapper.find('ComboBox').prop('onEnter')('test');
			expect(parseInput.mock.calls).toEqual([['test', list]]);
			expect(onErrorChange.mock.calls).toEqual([[error]]);
		});

		it('calls onListChange with the parsed list when enter is pressed and parseInput returns a list', () => {
			const list = [{id: 0}];
			const entries = ['Foo', 'Bar'];
			const setText = jest.fn();
			const parseInput = jest.fn().mockReturnValue({entries});
			const onListChange = jest.fn();
			const onTextChange = jest.fn();
			const onErrorChange = jest.fn();
			const live = {};
			useRef.mockReturnValueOnce({current: live});
			useState.mockReturnValueOnce(['', setText]).mockReturnValueOnce([null]);
			const wrapper = shallow(
				<ListInput
					id="test"
					list={list}
					parseInput={parseInput}
					getItemName={(x) => x}
					onListChange={onListChange}
					onTextChange={onTextChange}
					onErrorChange={onErrorChange}
				/>
			);
			wrapper.find('ComboBox').prop('onEnter')('test');
			expect(parseInput.mock.calls).toEqual([['test', list]]);
			expect(setText.mock.calls).toEqual([['']]);
			expect(onTextChange.mock.calls).toEqual([[false]]);
			expect(onListChange.mock.calls).toEqual([[[...entries, ...list]]]);
			expect(onErrorChange.mock.calls).toEqual([[null]]);
			expect(live.textContent).toBe('Foo, Bar added');
		});

		it('ignores input when enter is pressed and parseInput is not set', () => {
			const onListChange = jest.fn();
			const onTextChange = jest.fn();
			const wrapper = shallow(<ListInput id="test" onListChange={onListChange} onTextChange={onTextChange} />);
			expect(() => wrapper.find('ComboBox').prop('onEnter')()).not.toThrow();
		});

		it('ignores input when enter is pressed and text is empty', () => {
			const parseInput = jest.fn();
			const wrapper = shallow(<ListInput id="test" parseInput={parseInput} />);
			wrapper.find('ComboBox').prop('onEnter')();
			expect(parseInput).not.toHaveBeenCalled();
		});

		it('calls onTextChange when the combo-box text changes', () => {
			const text = 'test';
			const onTextChange = jest.fn();
			const wrapper = shallow(<ListInput id="test" onTextChange={onTextChange} />);
			wrapper.find('ComboBox').prop('onTextChange')(text);
			expect(onTextChange.mock.calls).toEqual([[true]]);
			expect(useState.mock.results[0].value[1].mock.calls).toEqual([[text]]);
		});

		it('calls onTextChange and onErrorChange when the combo-box text changes and error is set', () => {
			const text = 'test';
			const onTextChange = jest.fn();
			const onErrorChange = jest.fn();
			const wrapper = shallow(
				<ListInput id="test" error="Error" onTextChange={onTextChange} onErrorChange={onErrorChange} />
			);
			wrapper.find('ComboBox').prop('onTextChange')(text);
			expect(onTextChange.mock.calls).toEqual([[true]]);
			expect(onErrorChange.mock.calls).toEqual([[null]]);
			expect(useState.mock.results[0].value[1].mock.calls).toEqual([[text]]);
		});

		it('calls onListChange when an item is removed', () => {
			const item0 = {id: 0};
			const item1 = {id: 1};
			const onListChange = jest.fn();
			const wrapper = shallow(<ListInput id="test" list={[item0, item1]} onListChange={onListChange} />);
			wrapper.find('ListEntries').prop('onRemoveClick')(item0, 0);
			expect(onListChange.mock.calls).toEqual([[[item1]]]);
		});

		it('sets highlightKey to null when highlight is cleared', () => {
			const wrapper = shallow(<ListInput id="test" list={[{}]} />);
			wrapper.find('ListEntries').prop('onHighlightClear')();
			expect(useState.mock.results[1].value[1].mock.calls).toEqual([[null]]);
		});
	});
});
