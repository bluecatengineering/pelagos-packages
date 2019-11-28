import React from 'react';
import {shallow} from 'enzyme';

import Hamburger from '../../src/components/Hamburger';

jest.unmock('../../src/components/Hamburger');

describe('Hamburger', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<Hamburger active />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when active is not set', () => {
			const wrapper = shallow(<Hamburger />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onClick when the button is clicked', () => {
			const onClick = jest.fn();
			const wrapper = shallow(<Hamburger onClick={onClick} />);
			wrapper.find('[role="button"]').simulate('click');
			expect(onClick).toHaveBeenCalledTimes(1);
		});
	});
});
