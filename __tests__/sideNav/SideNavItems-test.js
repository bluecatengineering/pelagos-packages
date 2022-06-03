import {shallow} from 'enzyme';

import SideNavItems from '../../src/sideNav/SideNavItems';
import passSideNavActive from '../../src/sideNav/passSideNavActive';

jest.unmock('../../src/sideNav/SideNavItems');

passSideNavActive.mockReturnValue('passSideNavActive');

describe('SideNavItems', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<SideNavItems sideNavActive>child</SideNavItems>);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(passSideNavActive.mock.calls).toEqual([[true, 'child']]);
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(<SideNavItems className="TestClass">child</SideNavItems>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
