import {useState} from 'react';
import {shallow} from 'enzyme';

import NameFilterEditor from '../../src/filters/NameFilterEditor';
import getGenericSuggestions from '../../src/functions/getGenericSuggestions';

jest.unmock('../../src/filters/NameFilterEditor');
jest.unmock('../../src/strings');

describe('NameFilterEditor', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<NameFilterEditor
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
				<NameFilterEditor
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
				<NameFilterEditor
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
				<NameFilterEditor
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
				<NameFilterEditor
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
				<NameFilterEditor
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
				<NameFilterEditor
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
				<NameFilterEditor
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
				<NameFilterEditor
					label="label"
					list={['a']}
					sourceById={{a: {name: 'Alpha'}}}
					placeholder="placeholder"
					errorMessage="error message"
					validateSaveRef={ref}
				/>
			);
			expect(ref).not.toEqual({});
			expect(ref.current()).toEqual(true);
		});

		it('does not set an error when no text is set', () => {
			const ref = {};
			const setError = jest.fn();
			useState.mockReturnValueOnce(['something']).mockReturnValueOnce([null, setError]);

			shallow(
				<NameFilterEditor
					label="label"
					list={['a']}
					sourceById={{a: {name: 'Alpha'}}}
					placeholder="placeholder"
					errorMessage="error message"
					validateSaveRef={ref}
				/>
			);
			expect(ref).not.toEqual({});
			expect(ref.current()).toEqual(false);
			expect(setError.mock.calls).toEqual([['Press Enter to add item(s) to the list.']]);
		});
	});
});
