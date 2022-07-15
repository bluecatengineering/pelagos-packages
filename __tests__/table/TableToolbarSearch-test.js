import {useRef, useState} from 'react';
import {shallow} from 'enzyme';
import debounce from 'lodash-es/debounce';

import TableToolbarSearch from '../../src/table/TableToolbarSearch';

jest.unmock('../../src/table/TableToolbarSearch');
jest.mock('lodash-es/debounce');

describe('TableToolbarSearch', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			useState.mockReturnValueOnce(['foo']);
			const wrapper = shallow(<TableToolbarSearch id="test" onChange={jest.fn()} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			useState.mockReturnValueOnce(['foo']);
			const wrapper = shallow(<TableToolbarSearch id="test" className="TestClass" onChange={jest.fn()} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when initialText is set', () => {
			const wrapper = shallow(<TableToolbarSearch id="test" initialText="bar" onChange={jest.fn()} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls focus when the search icon is clicked', () => {
			const focus = jest.fn();
			useRef.mockReturnValue({current: {focus}});
			const wrapper = shallow(<TableToolbarSearch onChange={jest.fn()} />);
			wrapper.find('span').simulate('click');
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('calls onChange when the text changes', () => {
			const onChange = jest.fn();
			const debounced = jest.fn();
			debounce.mockReturnValue(debounced);
			const wrapper = shallow(<TableToolbarSearch onChange={onChange} />);
			wrapper.find('input').simulate('change', {target: {value: 'TEST'}});
			expect(debounce.mock.calls).toEqual([[onChange, 300]]);
			expect(debounced.mock.calls).toEqual([['test']]);
		});

		it('calls onChange when escape key is pressed', () => {
			const onChange = jest.fn();
			const setText = jest.fn();
			useRef.mockReturnValue({current: {}});
			useState.mockReturnValueOnce(['foo', setText]);
			const wrapper = shallow(<TableToolbarSearch onChange={onChange} />);
			wrapper.find('input').simulate('keydown', {keyCode: 27});
			expect(setText.mock.calls).toEqual([['']]);
			expect(onChange.mock.calls).toEqual([['']]);
		});

		it('does not call onChange when other key is pressed', () => {
			const onChange = jest.fn();
			const setText = jest.fn();
			useRef.mockReturnValue({current: {}});
			useState.mockReturnValueOnce(['foo', setText]);
			const wrapper = shallow(<TableToolbarSearch onChange={onChange} />);
			wrapper.find('input').simulate('keydown', {keyCode: 13});
			expect(setText.mock.calls).toEqual([]);
			expect(onChange.mock.calls).toEqual([]);
		});

		it('calls onChange when the clear button is clicked', () => {
			const onChange = jest.fn();
			const setText = jest.fn();
			const focus = jest.fn();
			useRef.mockReturnValue({current: {focus}});
			useState.mockReturnValueOnce(['foo', setText]);
			const wrapper = shallow(<TableToolbarSearch onChange={onChange} />);
			wrapper.find('button').simulate('click');
			expect(focus.mock.calls).toEqual([[]]);
			expect(setText.mock.calls).toEqual([['']]);
			expect(onChange.mock.calls).toEqual([['']]);
		});
	});
});
