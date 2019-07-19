import React from 'react';
import {shallow} from 'enzyme';

import Spinner from '../../src/components/Spinner';

jest.unmock('../../src/components/Spinner');

describe('Spinner', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<Spinner id="test" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(<Spinner id="test" className="TestClass" size="large" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
