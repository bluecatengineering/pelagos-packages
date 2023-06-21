import {shallow} from 'enzyme';

import SideNavItems from '../../src/sideNav/SideNavItems';

jest.unmock('../../src/sideNav/SideNavItems');

describe('SideNavItems', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<SideNavItems>child</SideNavItems>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(<SideNavItems className="TestClass">child</SideNavItems>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
