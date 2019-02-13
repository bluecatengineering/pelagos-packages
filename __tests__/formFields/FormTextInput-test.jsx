import React from 'react';
import {shallow} from 'enzyme';

import FormTextInput from '../../src/formFields/FormTextInput';

jest.unmock('../../src/formFields/FormTextInput');

describe('FormTextInput', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<FormTextInput
					id="test-id"
					label="Label"
					type="text"
					name="name"
					value="value"
					placeholder="placeholder"
					maxLength={10}
					disabled={false}
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(
				<FormTextInput
					id="test-id"
					className="TestClass"
					label="Label"
					type="text"
					name="name"
					value="value"
					placeholder="placeholder"
					maxLength={10}
					disabled={false}
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders optional text if provided', () => {
			const wrapper = shallow(
				<FormTextInput
					id="test-id"
					label="Label"
					type="text"
					name="name"
					value=""
					placeholder="placeholder"
					maxLength={10}
					disabled={false}
					optionalText="optional"
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('does not render optional text if value is set', () => {
			const wrapper = shallow(
				<FormTextInput
					id="test-id"
					label="Label"
					type="text"
					name="name"
					value="value"
					placeholder="placeholder"
					maxLength={10}
					disabled={false}
					optional={true}
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('sets a random id if not provided', () => {
			const random = jest.spyOn(Math, 'random').mockReturnValue(0.1);
			const wrapper = shallow(
				<FormTextInput
					label="Label"
					type="text"
					name="name"
					value="value"
					placeholder="placeholder"
					maxLength={10}
					disabled={false}
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(random).toHaveBeenCalledTimes(1);
		});

		it('adds the error class if the error is set', () => {
			const wrapper = shallow(
				<FormTextInput
					id="test-id"
					label="Label"
					type="text"
					name="name"
					value="value"
					placeholder="placeholder"
					maxLength={10}
					disabled={false}
					error="Error"
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onChange when a change event is fired', () => {
			const onChange = jest.fn();
			const event = {type: 'change'};
			const wrapper = shallow(<FormTextInput label="Label" name="name" value="" onChange={onChange} />);
			wrapper.find('input').simulate('change', event);
			expect(onChange.mock.calls).toEqual([[event]]);
		});
	});
});
