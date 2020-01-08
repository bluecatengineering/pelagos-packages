import React, {useState} from 'react';
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

		it('renders expected elements when list input requests suggestions text', () => {
			const wrapper = shallow(
				<TextFilterEditor label="label" list={['a']} placeholder="placeholder" validateSaveRef={{}} />
			);
			wrapper.find('#textFilterEditorInput').prop('getSuggestionText')({name: 'a'});
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
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
