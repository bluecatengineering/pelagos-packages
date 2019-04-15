import React from 'react';
import {shallow} from 'enzyme';

import CheckBox from '../../src/components/CheckBox';

jest.unmock('../../src/components/CheckBox');

describe('CheckBox', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<CheckBox id="test" componentId="test" className="TestClass" label="Test" checked onChange={jest.fn()} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when disabled is true', () => {
			const wrapper = shallow(
				<CheckBox componentId="test" className="TestClass" label="Test" checked disabled onChange={jest.fn()} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when error is true', () => {
			const wrapper = shallow(
				<CheckBox componentId="test" className="TestClass" label="Test" checked error onChange={jest.fn()} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onChange when clicked', () => {
			const onChange = jest.fn();
			const wrapper = shallow(<CheckBox className="TestClass" label="Test" checked onChange={onChange} />);
			wrapper.simulate('click');
			expect(onChange).toHaveBeenCalled();
		});

		it('does not call onChange when clicked if disabled is true', () => {
			const onChange = jest.fn();
			const wrapper = shallow(<CheckBox className="TestClass" label="Test" checked disabled onChange={onChange} />);
			wrapper.simulate('click');
			expect(onChange).not.toHaveBeenCalled();
		});

		it('calls onChange when the space key is pressed', () => {
			const onChange = jest.fn();
			const event = {preventDefault: jest.fn(), keyCode: 32};
			const wrapper = shallow(<CheckBox className="TestClass" label="Test" checked onChange={onChange} />);
			wrapper.simulate('keydown', event);
			expect(onChange).toHaveBeenCalled();
			expect(event.preventDefault).toHaveBeenCalled();
		});

		it('does not calls onChange when the space key is pressed if disabled is true', () => {
			const onChange = jest.fn();
			const event = {preventDefault: jest.fn(), keyCode: 32};
			const wrapper = shallow(<CheckBox className="TestClass" label="Test" checked disabled onChange={onChange} />);
			wrapper.simulate('keydown', event);
			expect(onChange).not.toHaveBeenCalled();
			expect(event.preventDefault).not.toHaveBeenCalled();
		});

		it('does not call onChange when the any other key is pressed', () => {
			const onChange = jest.fn();
			const event = {preventDefault: jest.fn(), keyCode: 9};
			const wrapper = shallow(<CheckBox className="TestClass" label="Test" checked onChange={onChange} />);
			wrapper.simulate('keydown', event);
			expect(onChange).not.toHaveBeenCalled();
			expect(event.preventDefault).not.toHaveBeenCalled();
		});
	});
});
