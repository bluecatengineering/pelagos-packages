import {useContext} from 'react';
import {shallow} from 'enzyme';

import SideNavLink from '../../src/sideNav/SideNavLink';

jest.unmock('../../src/sideNav/SideNavLink');

describe('SideNavLink', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<SideNavLink className="TestClass">child</SideNavLink>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			useContext.mockReturnValueOnce(true);
			const wrapper = shallow(
				<SideNavLink icon="test-icon" current shortcut>
					child
				</SideNavLink>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when children is not a string', () => {
			const wrapper = shallow(
				<SideNavLink className="TestClass">
					<span />
				</SideNavLink>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
