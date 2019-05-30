import React from 'react';
import {shallow} from 'enzyme';

import ToggleField from '../../src/formFields/ToggleField';

jest.unmock('../../src/formFields/ToggleField');

describe('ToggleField', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<ToggleField id="test" label="Test" icons={false} value={true} disabled={true} onChange={jest.fn()} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(
				<ToggleField id="test" className="TestClass" label="Test" icons={false} value={true} onChange={jest.fn()} />
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

			const wrapper = shallow(<ToggleField label="Test" icons={false} value={true} onChange={onChange} />);
			wrapper.find('Toggle').simulate('change', event);
			expect(onChange.mock.calls).toEqual([[false]]);
		});
	});
});
