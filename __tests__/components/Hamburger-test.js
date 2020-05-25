import React from 'react';
import {shallow} from 'enzyme';

import Hamburger from '../../src/components/Hamburger';
import handleButtonKeyDown from '../../src/functions/handleButtonKeyDown';

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

		it('calls the key handler when a key is pressed', () => {
			const event = {keyCode: 13};
			const wrapper = shallow(<Hamburger />);
			wrapper.find('[role="button"]').simulate('keydown', event);
			expect(handleButtonKeyDown.mock.calls).toEqual([[event]]);
		});
	});
});
