import React from 'react';
import {shallow} from 'enzyme';

import Toggle from '../../src/components/Toggle';

jest.unmock('../../src/components/Toggle');

describe('Toggle', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<Toggle id="test" componentId="test" className="TestClass" ariaLabel="Test" checked onChange={jest.fn()} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when disabled is true', () => {
			const wrapper = shallow(
				<Toggle componentId="test" className="TestClass" ariaLabel="Test" checked disabled onChange={jest.fn()} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onChange when clicked', () => {
			const onChange = jest.fn();
			const wrapper = shallow(<Toggle className="TestClass" ariaLabel="Test" checked onChange={onChange} />);
			wrapper.simulate('click');
			expect(onChange).toHaveBeenCalled();
		});

		it('calls onChange when the space key is pressed', () => {
			const onChange = jest.fn();
			const event = {preventDefault: jest.fn(), keyCode: 32};
			const wrapper = shallow(<Toggle className="TestClass" ariaLabel="Test" checked onChange={onChange} />);
			wrapper.simulate('keydown', event);
			expect(onChange).toHaveBeenCalled();
			expect(event.preventDefault).toHaveBeenCalled();
		});

		it('does not call onChange when the any other key is pressed', () => {
			const onChange = jest.fn();
			const event = {preventDefault: jest.fn(), keyCode: 9};
			const wrapper = shallow(<Toggle className="TestClass" ariaLabel="Test" checked onChange={onChange} />);
			wrapper.simulate('keydown', event);
			expect(onChange).not.toHaveBeenCalled();
			expect(event.preventDefault).not.toHaveBeenCalled();
		});
	});
});
