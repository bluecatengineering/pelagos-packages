import React from 'react';
import {shallow} from 'enzyme';

import FormTextArea from '../../src/formFields/FormTextArea';

jest.unmock('../../src/formFields/FormTextArea');

describe('FormTextArea', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<FormTextArea
					id="test-id"
					label="Label"
					value="value"
					placeholder="placeholder"
					maxLength={10}
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(
				<FormTextArea
					id="test-id"
					className="TestClass"
					label="Label"
					value="value"
					placeholder="placeholder"
					maxLength={10}
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('does not add the resize class if the resize is true', () => {
			const wrapper = shallow(
				<FormTextArea
					id="test-id"
					label="Label"
					value="value"
					placeholder="placeholder"
					maxLength={10}
					resize={true}
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('sets a random id if not provided', () => {
			const random = jest.spyOn(Math, 'random').mockReturnValue(0.1);
			const wrapper = shallow(
				<FormTextArea label="Label" value="value" placeholder="placeholder" maxLength={10} onChange={jest.fn()} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(random).toHaveBeenCalledTimes(1);
		});

		it('adds the error class if the error is set', () => {
			const wrapper = shallow(
				<FormTextArea
					id="test-id"
					label="Label"
					value="value"
					placeholder="placeholder"
					maxLength={10}
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
			const wrapper = shallow(<FormTextArea label="Label" value="" onChange={onChange} />);
			wrapper.find('textarea').simulate('change', event);
			expect(onChange.mock.calls).toEqual([[event]]);
		});
	});
});
