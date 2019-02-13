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
	});
});
