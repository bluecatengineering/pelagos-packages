import {useState} from 'react';
import {shallow} from 'enzyme';

import TextFilterEditor, {OldTextFilterEditor, NewTextFilterEditor} from '../../src/filters/TextFilterEditor';

jest.unmock('../../src/filters/TextFilterEditor');

describe('TextFilterEditor', () => {
	describe('rendering', () => {
		it('renders expected elements when forArea is not set', () => {
			const wrapper = shallow(<TextFilterEditor label="label" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when forArea is set', () => {
			const wrapper = shallow(<TextFilterEditor label="label" forArea />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('OldTextFilterEditor', () => {
		describe('rendering', () => {
			it('renders expected elements', () => {
				const wrapper = shallow(
					<OldTextFilterEditor label="label" list={['a']} placeholder="placeholder" validateSaveRef={{}} />
				);
				expect(wrapper.getElement()).toMatchSnapshot();
			});

			it('renders expected elements when list is null', () => {
				const wrapper = shallow(
					<OldTextFilterEditor label="label" list={null} placeholder="placeholder" validateSaveRef={{}} />
				);
				expect(wrapper.getElement()).toMatchSnapshot();
			});

			it('renders expected elements when list input requests suggestions text', () => {
				const wrapper = shallow(
					<OldTextFilterEditor label="label" list={['a']} placeholder="placeholder" validateSaveRef={{}} />
				);
				wrapper.find('#textFilterEditorInput').prop('getSuggestionText')({name: 'a'});
				expect(wrapper.getElement()).toMatchSnapshot();
			});
		});

		describe('behaviour', () => {
			it('calls onListChange when list is changed', () => {
				const onListChange = jest.fn();
				const wrapper = shallow(
					<OldTextFilterEditor label="label" list={['a']} validateSaveRef={{}} onListChange={onListChange} />
				);
				wrapper.find('#textFilterEditorInput').prop('onListChange')(['a']);
				expect(onListChange.mock.calls).toEqual([[['a']]]);
			});

			it('calls onListChange when list is empty', () => {
				const onListChange = jest.fn();
				const wrapper = shallow(
					<OldTextFilterEditor label="label" list={[]} validateSaveRef={{}} onListChange={onListChange} />
				);
				wrapper.find('#textFilterEditorInput').prop('onListChange')([]);
				expect(onListChange.mock.calls).toEqual([[null]]);
			});

			it('returns the suggestion name if the order is 2', () => {
				const wrapper = shallow(
					<OldTextFilterEditor label="label" list={[]} placeholder="placeholder" validateSaveRef={{}} />
				);
				expect(wrapper.find('ListInput').prop('getHighlightKey')({name: 'test', order: 2})).toBe('test');
			});

			it('returns null if the suggestion order is not 2', () => {
				const wrapper = shallow(
					<OldTextFilterEditor label="label" list={[]} placeholder="placeholder" validateSaveRef={{}} />
				);
				expect(wrapper.find('ListInput').prop('getHighlightKey')({name: 'test', order: 0})).toBeNull();
			});

			it('sets error when text is set', () => {
				const ref = {};
				shallow(<OldTextFilterEditor label="label" list={['a']} placeholder="placeholder" validateSaveRef={ref} />);
				expect(ref).not.toEqual({});
				expect(ref.current()).toBe(true);
			});

			it('does not set an error when no text is set', () => {
				const ref = {};
				const setError = jest.fn();
				useState.mockReturnValueOnce(['something']).mockReturnValueOnce([null, setError]);

				shallow(<OldTextFilterEditor label="label" list={['a']} placeholder="placeholder" validateSaveRef={ref} />);
				expect(ref).not.toEqual({});
				expect(ref.current()).toBe(false);
				expect(setError.mock.calls).toEqual([['Press Enter to add items to the list.']]);
			});
		});
	});

	describe('NewTextFilterEditor', () => {
		describe('rendering', () => {
			it('renders expected elements', () => {
				const wrapper = shallow(
					<NewTextFilterEditor id="test" label="label" list={['a']} placeholder="placeholder" buttonId="button" />
				);
				expect(wrapper.getElement()).toMatchSnapshot();
			});

			it('renders expected elements when list is null', () => {
				const wrapper = shallow(
					<NewTextFilterEditor id="test" label="label" list={null} placeholder="placeholder" buttonId="button" />
				);
				expect(wrapper.getElement()).toMatchSnapshot();
			});
		});

		describe('behaviour', () => {
			it('calls onSave when the editor calls onSave', () => {
				const list = ['a'];
				const onSave = jest.fn();
				const wrapper = shallow(
					<NewTextFilterEditor
						id="test"
						label="label"
						list={list}
						placeholder="placeholder"
						chipId="button"
						onSave={onSave}
					/>
				);
				wrapper.find('#test').prop('onSave')();
				expect(onSave.mock.calls).toEqual([[list]]);
			});

			it('calls onSave when the editor calls onSave and the list is empty', () => {
				const onSave = jest.fn();
				const wrapper = shallow(
					<NewTextFilterEditor
						id="test"
						label="label"
						list={[]}
						placeholder="placeholder"
						chipId="button"
						onSave={onSave}
					/>
				);
				wrapper.find('#test').prop('onSave')();
				expect(onSave.mock.calls).toEqual([[null]]);
			});

			it('calls setError when the editor calls onSave and text is not empty', () => {
				const onSave = jest.fn();
				const setError = jest.fn();
				useState.mockReturnValueOnce([[]]).mockReturnValueOnce(['foo']).mockReturnValueOnce([null, setError]);
				const wrapper = shallow(
					<NewTextFilterEditor
						id="test"
						label="label"
						list={['a']}
						placeholder="placeholder"
						chipId="button"
						onSave={onSave}
					/>
				);
				wrapper.find('#test').prop('onSave')();
				expect(onSave.mock.calls).toEqual([]);
				expect(setError.mock.calls).toEqual([['Press Enter to add items to the list.']]);
			});
		});
	});
});
