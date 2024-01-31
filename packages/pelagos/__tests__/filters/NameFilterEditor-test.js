import {useState} from 'react';
import {shallow} from 'enzyme';

import NameFilterEditor, {NewNameFilterEditor, OldNameFilterEditor} from '../../src/filters/NameFilterEditor';
import getGenericSuggestions from '../../src/functions/getGenericSuggestions';
import ListItem from '../../src/listItems/ListItem';
import useRandomId from '../../src/hooks/useRandomId';

jest.unmock('../../src/filters/NameFilterEditor');

const anyFunction = expect.any(Function);

useRandomId.mockReturnValue('random-id');

describe('NameFilterEditor', () => {
	describe('rendering', () => {
		it('renders expected elements when forArea is not set', () => {
			const wrapper = shallow(<NameFilterEditor label="label" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when forArea is set', () => {
			const wrapper = shallow(<NameFilterEditor label="label" forArea />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('OldNameFilterEditor', () => {
		describe('rendering', () => {
			it('renders expected elements', () => {
				const wrapper = shallow(
					<OldNameFilterEditor
						label="label"
						list={['a']}
						sourceById={{a: {name: 'Alpha'}}}
						placeholder="placeholder"
						errorMessage="error message"
						validateSaveRef={{}}
					/>
				);
				expect(wrapper.getElement()).toMatchSnapshot();
			});

			it('renders expected elements when list is null', () => {
				const wrapper = shallow(
					<OldNameFilterEditor
						label="label"
						list={null}
						sourceById={{a: {name: 'Alpha'}}}
						placeholder="placeholder"
						errorMessage="error message"
						validateSaveRef={{}}
					/>
				);
				expect(wrapper.getElement()).toMatchSnapshot();
			});

			it('renders expected elements when sourceById does not have list id', () => {
				const wrapper = shallow(
					<OldNameFilterEditor
						label="label"
						list={['a']}
						sourceById={{b: {name: 'Beta'}}}
						placeholder="placeholder"
						errorMessage="error message"
						validateSaveRef={{}}
					/>
				);
				expect(wrapper.getElement()).toMatchSnapshot();
			});

			it('renders expected elements when list input requests suggestions text', () => {
				const wrapper = shallow(
					<OldNameFilterEditor
						label="label"
						list={['a']}
						sourceById={{a: {name: 'Alpha'}}}
						placeholder="placeholder"
						errorMessage="error message"
						validateSaveRef={{}}
					/>
				);
				wrapper.find('#nameFilterEditorInput').prop('getSuggestionText')({name: 'a'});
				expect(wrapper.getElement()).toMatchSnapshot();
			});

			it('renders expected elements when list input requests suggestion highlight key', () => {
				const wrapper = shallow(
					<OldNameFilterEditor
						label="label"
						list={['a']}
						sourceById={{a: {name: 'Alpha'}}}
						placeholder="placeholder"
						errorMessage="error message"
						validateSaveRef={{}}
					/>
				);
				wrapper.find('#nameFilterEditorInput').prop('getHighlightKey')({order: 2});
				wrapper.find('#nameFilterEditorInput').prop('getHighlightKey')({order: 0});
				expect(wrapper.getElement()).toMatchSnapshot();
			});
		});

		describe('behaviour', () => {
			it('calls onListChange when list is changed', () => {
				const onListChange = jest.fn();
				const wrapper = shallow(
					<OldNameFilterEditor
						label="label"
						list={['a']}
						sourceById={{a: {name: 'Alpha'}}}
						placeholder="placeholder"
						errorMessage="error message"
						onListChange={onListChange}
						validateSaveRef={{}}
					/>
				);
				wrapper.find('#nameFilterEditorInput').prop('onListChange')([{id: 'a'}]);
				expect(onListChange.mock.calls).toEqual([[['a']]]);
			});

			it('calls onListChange when list is empty', () => {
				const onListChange = jest.fn();
				const wrapper = shallow(
					<OldNameFilterEditor
						label="label"
						list={['a']}
						sourceById={{a: {name: 'Alpha'}}}
						placeholder="placeholder"
						errorMessage="error message"
						onListChange={onListChange}
						validateSaveRef={{}}
					/>
				);
				wrapper.find('#nameFilterEditorInput').prop('onListChange')([]);
				expect(onListChange.mock.calls).toEqual([[null]]);
			});

			it('calls getGenericSuggestions when list input requests suggestions', () => {
				const wrapper = shallow(
					<OldNameFilterEditor
						label="label"
						list={['a']}
						sourceById={{a: {name: 'Alpha'}}}
						placeholder="placeholder"
						errorMessage="error message"
						validateSaveRef={{}}
					/>
				);
				wrapper.find('#nameFilterEditorInput').prop('getSuggestions')('value', ['list']);
				expect(getGenericSuggestions.mock.calls).toEqual([['value', ['list'], [{name: 'Alpha'}], 'error message']]);
			});

			it('sets error when text is set', () => {
				const ref = {};
				shallow(
					<OldNameFilterEditor
						label="label"
						list={['a']}
						sourceById={{a: {name: 'Alpha'}}}
						placeholder="placeholder"
						errorMessage="error message"
						validateSaveRef={ref}
					/>
				);
				expect(ref).not.toEqual({});
				expect(ref.current()).toBe(true);
			});

			it('does not set an error when no text is set', () => {
				const ref = {};
				const setError = jest.fn();
				useState.mockReturnValueOnce(['something']).mockReturnValueOnce([null, setError]);

				shallow(
					<OldNameFilterEditor
						label="label"
						list={['a']}
						sourceById={{a: {name: 'Alpha'}}}
						placeholder="placeholder"
						errorMessage="error message"
						validateSaveRef={ref}
					/>
				);
				expect(ref).not.toEqual({});
				expect(ref.current()).toBe(false);
				expect(setError.mock.calls).toEqual([['Press Enter to add items to the list.']]);
			});
		});
	});

	describe('NewNameFilterEditor', () => {
		describe('rendering', () => {
			it('renders expected elements', () => {
				const wrapper = shallow(
					<NewNameFilterEditor
						id="test"
						label="label"
						list={['a']}
						sourceById={{a: {name: 'Alpha'}}}
						placeholder="placeholder"
						errorMessage="error message"
						chipId="button"
					/>
				);
				expect(wrapper.getElement()).toMatchSnapshot();
			});

			it('renders expected elements when list is not set', () => {
				const wrapper = shallow(
					<NewNameFilterEditor
						id="test"
						label="label"
						sourceById={{a: {name: 'Alpha'}}}
						placeholder="placeholder"
						errorMessage="error message"
						chipId="button"
					/>
				);
				expect(wrapper.getElement()).toMatchSnapshot();
			});
		});

		describe('behaviour', () => {
			it('calls getGenericSuggestions when ListInput requests suggestions', () => {
				const wrapper = shallow(
					<NewNameFilterEditor
						id="test"
						label="label"
						list={['a']}
						sourceById={{a: {name: 'Alpha'}}}
						placeholder="placeholder"
						errorMessage="error message"
					/>
				);
				wrapper.find('#random-id-list').prop('getSuggestions')('value', ['a']);
				expect(getGenericSuggestions.mock.calls).toEqual([['value', anyFunction, [{name: 'Alpha'}], 'error message']]);
				expect(getGenericSuggestions.mock.calls[0][1]('a')).toBe(true);
			});

			it('returns expected value when ListInput calls getItemName', () => {
				const wrapper = shallow(
					<NewNameFilterEditor
						id="test"
						label="label"
						list={['a']}
						sourceById={{a: {name: 'Alpha'}}}
						placeholder="placeholder"
						errorMessage="error message"
					/>
				);
				const getItemName = wrapper.find('#random-id-list').prop('getItemName');
				expect(getItemName('a')).toBe('Alpha');
				expect(getItemName('b')).toBe('b');
			});

			it('renders a list item when ListInput calls renderItem', () => {
				const wrapper = shallow(
					<NewNameFilterEditor
						id="test"
						label="label"
						list={['a']}
						sourceById={{a: {name: 'Alpha'}}}
						placeholder="placeholder"
						errorMessage="error message"
					/>
				);
				const renderItem = wrapper.find('#random-id-list').prop('renderItem');
				expect(renderItem('a')).toEqual(<ListItem item="Alpha" unresolved={false} />);
				expect(renderItem('b')).toEqual(<ListItem item="b" unresolved={true} />);
			});

			it('calls onSave when the editor calls onSave', () => {
				const list = ['a'];
				const onSave = jest.fn();
				const wrapper = shallow(
					<NewNameFilterEditor
						id="test"
						label="label"
						list={list}
						sourceById={{a: {name: 'Alpha'}}}
						placeholder="placeholder"
						errorMessage="error message"
						onSave={onSave}
					/>
				);
				wrapper.find('#random-id').prop('onSave')();
				expect(onSave.mock.calls).toEqual([[list]]);
			});

			it('calls onSave when the editor calls onSave and the list is empty', () => {
				const onSave = jest.fn();
				const wrapper = shallow(
					<NewNameFilterEditor
						id="test"
						label="label"
						list={[]}
						sourceById={{a: {name: 'Alpha'}}}
						placeholder="placeholder"
						errorMessage="error message"
						onSave={onSave}
					/>
				);
				wrapper.find('#random-id').prop('onSave')();
				expect(onSave.mock.calls).toEqual([[null]]);
			});

			it('calls setError when the editor calls onSave and text is not empty', () => {
				const onSave = jest.fn();
				const setError = jest.fn();
				useState.mockReturnValueOnce([[]]).mockReturnValueOnce(['foo']).mockReturnValueOnce([null, setError]);
				const wrapper = shallow(
					<NewNameFilterEditor
						id="test"
						label="label"
						list={[]}
						sourceById={{a: {name: 'Alpha'}}}
						placeholder="placeholder"
						errorMessage="error message"
						onSave={onSave}
					/>
				);
				wrapper.find('#random-id').prop('onSave')();
				expect(onSave.mock.calls).toEqual([]);
				expect(setError.mock.calls).toEqual([['Press Enter to add items to the list.']]);
			});
		});
	});
});
