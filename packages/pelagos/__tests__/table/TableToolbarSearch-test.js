import {useRef, useState} from 'react';
import {shallow} from 'enzyme';

import TableToolbarSearch, {OldTableToolbarSearch, NewTableToolbarSearch} from '../../src/table/TableToolbarSearch';

jest.unmock('../../src/table/TableToolbarSearch');

describe('TableToolbarSearch', () => {
	describe('rendering', () => {
		it('renders expected elements when value is set', () => {
			const wrapper = shallow(<TableToolbarSearch value="test" onChange={jest.fn()} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when value is not set', () => {
			const wrapper = shallow(<TableToolbarSearch onChange={jest.fn()} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('OldTableToolbarSearch', () => {
		describe('rendering', () => {
			it('renders expected elements', () => {
				useState.mockReturnValueOnce(['foo']);
				const wrapper = shallow(<OldTableToolbarSearch id="test" onChange={jest.fn()} />);
				expect(wrapper.getElement()).toMatchSnapshot();
			});

			it('renders expected elements when className is set', () => {
				useState.mockReturnValueOnce(['foo']);
				const wrapper = shallow(<OldTableToolbarSearch id="test" className="TestClass" onChange={jest.fn()} />);
				expect(wrapper.getElement()).toMatchSnapshot();
			});

			it('renders expected elements when initialText is set', () => {
				const wrapper = shallow(<OldTableToolbarSearch id="test" initialText="bar" onChange={jest.fn()} />);
				expect(wrapper.getElement()).toMatchSnapshot();
			});
		});

		describe('behaviour', () => {
			it('calls focus when the search icon is clicked', () => {
				const focus = jest.fn();
				useRef.mockReturnValue({current: {focus}});
				const wrapper = shallow(<OldTableToolbarSearch onChange={jest.fn()} />);
				wrapper.find('span').simulate('click');
				expect(focus.mock.calls).toEqual([[]]);
			});

			it('calls onChange when the text changes', () => {
				const onChange = jest.fn();
				const wrapper = shallow(<OldTableToolbarSearch onChange={onChange} />);
				wrapper.find('input').simulate('change', {target: {value: 'TEST'}});
				expect(onChange.mock.calls).toEqual([['test']]);
			});

			it('calls onChange when escape key is pressed', () => {
				const onChange = jest.fn();
				const setText = jest.fn();
				useRef.mockReturnValue({current: {}});
				useState.mockReturnValueOnce(['foo', setText]);
				const wrapper = shallow(<OldTableToolbarSearch onChange={onChange} />);
				wrapper.find('input').simulate('keydown', {keyCode: 27});
				expect(setText.mock.calls).toEqual([['']]);
				expect(onChange.mock.calls).toEqual([['']]);
			});

			it('does not call onChange when other key is pressed', () => {
				const onChange = jest.fn();
				const setText = jest.fn();
				useRef.mockReturnValue({current: {}});
				useState.mockReturnValueOnce(['foo', setText]);
				const wrapper = shallow(<OldTableToolbarSearch onChange={onChange} />);
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
				const wrapper = shallow(<OldTableToolbarSearch onChange={onChange} />);
				wrapper.find('button').simulate('click');
				expect(focus.mock.calls).toEqual([[]]);
				expect(setText.mock.calls).toEqual([['']]);
				expect(onChange.mock.calls).toEqual([['']]);
			});
		});
	});

	describe('NewTableToolbarSearch', () => {
		describe('rendering', () => {
			it('renders expected elements', () => {
				const wrapper = shallow(<NewTableToolbarSearch id="test" value="test" onChange={jest.fn()} />);
				expect(wrapper.getElement()).toMatchSnapshot();
			});

			it('renders expected elements when className is set', () => {
				const wrapper = shallow(
					<NewTableToolbarSearch id="test" className="TestClass" value="test" onChange={jest.fn()} />
				);
				expect(wrapper.getElement()).toMatchSnapshot();
			});
		});

		describe('behaviour', () => {
			it('calls focus when the search icon is clicked', () => {
				const focus = jest.fn();
				useRef.mockReturnValue({current: {focus}});
				const wrapper = shallow(<NewTableToolbarSearch value="test" onChange={jest.fn()} />);
				wrapper.find('span').simulate('click');
				expect(focus.mock.calls).toEqual([[]]);
			});

			it('calls onChange when the text changes', () => {
				const onChange = jest.fn();
				const wrapper = shallow(<NewTableToolbarSearch value="test" onChange={onChange} />);
				wrapper.find('input').simulate('change', {target: {value: 'TEST'}});
				expect(onChange.mock.calls).toEqual([['test']]);
			});

			it('calls onChange when escape key is pressed', () => {
				const onChange = jest.fn();
				useRef.mockReturnValue({current: {}});
				const wrapper = shallow(<NewTableToolbarSearch value="test" onChange={onChange} />);
				wrapper.find('input').simulate('keydown', {keyCode: 27});
				expect(onChange.mock.calls).toEqual([['']]);
			});

			it('does not call onChange when other key is pressed', () => {
				const onChange = jest.fn();
				useRef.mockReturnValue({current: {}});
				const wrapper = shallow(<NewTableToolbarSearch value="test" onChange={onChange} />);
				wrapper.find('input').simulate('keydown', {keyCode: 13});
				expect(onChange.mock.calls).toEqual([]);
			});

			it('calls onChange when the clear button is clicked', () => {
				const onChange = jest.fn();
				const focus = jest.fn();
				useRef.mockReturnValue({current: {focus}});
				const wrapper = shallow(<NewTableToolbarSearch value="test" onChange={onChange} />);
				wrapper.find('button').simulate('click');
				expect(focus.mock.calls).toEqual([[]]);
				expect(onChange.mock.calls).toEqual([['']]);
			});
		});
	});
});
