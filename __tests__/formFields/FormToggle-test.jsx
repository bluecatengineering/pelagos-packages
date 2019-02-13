import React from 'react';
import {shallow} from 'enzyme';

import FormToggle from '../../src/formFields/FormToggle';

jest.unmock('../../src/formFields/FormToggle');

describe('FormToggle', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<FormToggle componentId="test" label="Test" icons={false} value={true} onChange={jest.fn()} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(
				<FormToggle
					componentId="test"
					className="TestClass"
					label="Test"
					icons={false}
					value={true}
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onChange when the value changes', () => {
			const onChange = jest.fn();
			const event = {
				target: {checked: false},
			};

			const wrapper = shallow(<FormToggle label="Test" icons={false} value={true} onChange={onChange} />);
			wrapper.find('Toggle').simulate('change', event);
			expect(onChange.mock.calls).toEqual([[false]]);
		});
	});
});
