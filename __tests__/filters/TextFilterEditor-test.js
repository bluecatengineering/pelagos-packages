import {useState} from 'react';
import {shallow} from 'enzyme';

import TextFilterEditor from '../../src/filters/TextFilterEditor';

jest.unmock('../../src/filters/TextFilterEditor');
jest.unmock('../../src/strings');

describe('TextFilterEditor', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<TextFilterEditor label="label" list={['a']} placeholder="placeholder" validateSaveRef={{}} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when list is null', () => {
			const wrapper = shallow(
				<TextFilterEditor label="label" list={null} placeholder="placeholder" validateSaveRef={{}} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when list input requests suggestions text', () => {
			const wrapper = shallow(
				<TextFilterEditor label="label" list={['a']} placeholder="placeholder" validateSaveRef={{}} />
			);
			wrapper.find('#textFilterEditorInput').prop('getSuggestionText')({name: 'a'});
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onListChange when list is changed', () => {
			const onListChange = jest.fn();
			const wrapper = shallow(
				<TextFilterEditor label="label" list={['a']} validateSaveRef={{}} onListChange={onListChange} />
			);
			wrapper.find('#textFilterEditorInput').prop('onListChange')(['a']);
			expect(onListChange.mock.calls).toEqual([[['a']]]);
		});

		it('calls onListChange when list is empty', () => {
			const onListChange = jest.fn();
			const wrapper = shallow(
				<TextFilterEditor label="label" list={[]} validateSaveRef={{}} onListChange={onListChange} />
			);
			wrapper.find('#textFilterEditorInput').prop('onListChange')([]);
			expect(onListChange.mock.calls).toEqual([[null]]);
		});

		it('returns the suggestion name if the order is 2', () => {
			const wrapper = shallow(
				<TextFilterEditor label="label" list={[]} placeholder="placeholder" validateSaveRef={{}} />
			);
			expect(wrapper.find('ListInput').prop('getHighlightKey')({name: 'test', order: 2})).toBe('test');
		});

		it('returns null if the suggestion order is not 2', () => {
			const wrapper = shallow(
				<TextFilterEditor label="label" list={[]} placeholder="placeholder" validateSaveRef={{}} />
			);
			expect(wrapper.find('ListInput').prop('getHighlightKey')({name: 'test', order: 0})).toBeNull();
		});

		it('sets error when text is set', () => {
			const ref = {};
			shallow(<TextFilterEditor label="label" list={['a']} placeholder="placeholder" validateSaveRef={ref} />);
			expect(ref).not.toEqual({});
			expect(ref.current()).toEqual(true);
		});

		it('does not set an error when no text is set', () => {
			const ref = {};
			const setError = jest.fn();
			useState.mockReturnValueOnce(['something']).mockReturnValueOnce([null, setError]);

			shallow(<TextFilterEditor label="label" list={['a']} placeholder="placeholder" validateSaveRef={ref} />);
			expect(ref).not.toEqual({});
			expect(ref.current()).toEqual(false);
			expect(setError.mock.calls).toEqual([['Press Enter to add item(s) to the list.']]);
		});
	});
});
