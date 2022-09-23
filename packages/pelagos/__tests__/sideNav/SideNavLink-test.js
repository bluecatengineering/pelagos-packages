import {shallow} from 'enzyme';

import SideNavLink from '../../src/sideNav/SideNavLink';

jest.unmock('../../src/sideNav/SideNavLink');

describe('SideNavLink', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<SideNavLink className="TestClass">child</SideNavLink>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when boolean properties are set', () => {
			const wrapper = shallow(
				<SideNavLink current shortcut sideNavActive>
					child
				</SideNavLink>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
