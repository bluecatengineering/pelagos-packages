import {useRef} from 'react';
import {shallow} from 'enzyme';

import Search from '../../src/components/Search';

jest.unmock('../../src/components/Search');

describe('Search', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<Search id="test" value="test" onChange={jest.fn()} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(<Search id="test" className="TestClass" value="test" disabled onChange={jest.fn()} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onChange when the text changes', () => {
			const onChange = jest.fn();
			const wrapper = shallow(<Search value="test" onChange={onChange} />);
			wrapper.find('input').simulate('change', {target: {value: 'TEST'}});
			expect(onChange.mock.calls).toEqual([['test']]);
		});

		it('calls onChange when escape key is pressed', () => {
			const onChange = jest.fn();
			const wrapper = shallow(<Search value="test" onChange={onChange} />);
			wrapper.find('input').simulate('keydown', {keyCode: 27});
			expect(onChange.mock.calls).toEqual([['']]);
		});

		it('does not call onChange when other key is pressed', () => {
			const onChange = jest.fn();
			const wrapper = shallow(<Search value="test" onChange={onChange} />);
			wrapper.find('input').simulate('keydown', {keyCode: 13});
			expect(onChange.mock.calls).toEqual([]);
		});

		it('calls onChange when the clear button is clicked', () => {
			const onChange = jest.fn();
			const focus = jest.fn();
			useRef.mockReturnValue({current: {focus}});
			const wrapper = shallow(<Search value="test" onChange={onChange} />);
			wrapper.find('button').simulate('click');
			expect(focus.mock.calls).toEqual([[]]);
			expect(onChange.mock.calls).toEqual([['']]);
		});
	});
});
