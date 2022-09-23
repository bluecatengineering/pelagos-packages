import {shallow} from 'enzyme';

import SideNav from '../../src/sideNav/SideNav';
import passSideNavActive from '../../src/sideNav/passSideNavActive';

jest.unmock('../../src/sideNav/SideNav');

passSideNavActive.mockReturnValue('passSideNavActive');

describe('SideNav', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<SideNav active>child</SideNav>);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(passSideNavActive.mock.calls).toEqual([[true, 'child']]);
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(<SideNav className="TestClass">child</SideNav>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
