import React from 'react';
import {shallow} from 'enzyme';

import ModalSpinner from '../../src/components/ModalSpinner';

jest.unmock('../../src/components/ModalSpinner');

describe('ModalSpinner', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<ModalSpinner id="test" componentId="test-component" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
