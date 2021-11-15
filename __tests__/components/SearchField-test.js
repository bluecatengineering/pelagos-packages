import {useRef, useState} from 'react';
import {shallow} from 'enzyme';
import debounce from 'lodash-es/debounce';

import SearchField from '../../src/components/SearchField';

jest.unmock('../../src/components/SearchField');
jest.mock('lodash-es/debounce');

describe('SearchField', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			useState.mockReturnValueOnce(['foo']);
			const wrapper = shallow(<SearchField id="test" className="TestClass" onChange={jest.fn()} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onChange when the text changes', () => {
			const onChange = jest.fn();
			const debounced = jest.fn();
			debounce.mockReturnValue(debounced);
			const wrapper = shallow(<SearchField onChange={onChange} />);
			wrapper.find('input').simulate('change', {target: {value: 'TEST'}});
			expect(debounce.mock.calls).toEqual([[onChange, 300]]);
			expect(debounced.mock.calls).toEqual([['test']]);
		});

		it('calls onChange when the clear button is clicked', () => {
			const onChange = jest.fn();
			const setText = jest.fn();
			const focus = jest.fn();
			useRef.mockReturnValue({current: {focus}});
			useState.mockReturnValueOnce(['foo', setText]);
			const wrapper = shallow(<SearchField onChange={onChange} />);
			wrapper.find('button').simulate('click');
			expect(focus.mock.calls).toEqual([[]]);
			expect(setText.mock.calls).toEqual([['']]);
			expect(onChange.mock.calls).toEqual([['']]);
		});
	});
});
