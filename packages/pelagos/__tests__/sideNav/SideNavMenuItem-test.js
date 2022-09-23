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
			const wrapper = shallow(
				<SideNavMenuItem current shortcut sideNavActive>
					child
				</SideNavMenuItem>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
