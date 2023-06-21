import {useContext} from 'react';
import {shallow} from 'enzyme';

import SideNavMenuItem from '../../src/sideNav/SideNavMenuItem';

jest.unmock('../../src/sideNav/SideNavMenuItem');

describe('SideNavMenuItem', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<SideNavMenuItem className="TestClass">child</SideNavMenuItem>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when boolean properties are set', () => {
			useContext.mockReturnValueOnce(true);
			const wrapper = shallow(
				<SideNavMenuItem current shortcut>
					child
				</SideNavMenuItem>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when children is not a string', () => {
			const wrapper = shallow(
				<SideNavMenuItem className="TestClass">
					<span />
				</SideNavMenuItem>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
