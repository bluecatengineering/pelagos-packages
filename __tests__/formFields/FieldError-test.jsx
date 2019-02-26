import React from 'react';
import {shallow} from 'enzyme';

import FieldError from '../../src/formFields/FieldError';

jest.unmock('../../src/formFields/FieldError');

describe('FieldError', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<FieldError text="Test" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when componentId is set', () => {
			const wrapper = shallow(<FieldError componentId="test" text="Test" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
