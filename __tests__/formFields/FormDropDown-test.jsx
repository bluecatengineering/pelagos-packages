import React from 'react';
import {shallow} from 'enzyme';

import FormDropDown from '../../src/formFields/FormDropDown';

jest.unmock('../../src/formFields/FormDropDown');

const values = {
	o0: 'Option 0',
	o1: 'Option 1',
};
const options = Object.keys(values);
const renderOption = o => values[o];

describe('FormDropDown', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<FormDropDown
					id="test"
					componentId="test"
					label="Test"
					value="o0"
					options={options}
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(
				<FormDropDown
					componentId="id"
					className="TestClass"
					label="Test"
					value="o0"
					options={options}
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when there are errors', () => {
			const options = [{componentId: 'id', value: 'o0', text: 'Option 0'}, {value: 'o1', text: 'Option 1'}];
			const wrapper = shallow(
				<FormDropDown
					componentId="id"
					label="Test"
					value="o0"
					options={options}
					error={true}
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onChange when the value changes', () => {
			const onChange = jest.fn();
			const wrapper = shallow(
				<FormDropDown componentId="id" label="Test" options={[]} renderOption={renderOption} onChange={onChange} />
			);
			wrapper.find('Select').simulate('change', 'test');
			expect(onChange.mock.calls).toEqual([['test']]);
		});
	});
});
