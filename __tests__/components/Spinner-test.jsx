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
	});
});
