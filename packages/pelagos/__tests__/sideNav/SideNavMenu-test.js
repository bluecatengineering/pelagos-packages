import {useContext} from 'react';
import {shallow} from 'enzyme';

import SideNavMenu from '../../src/sideNav/SideNavMenu';
import SideNavMenuItem from '../../src/sideNav/SideNavMenuItem';

jest.unmock('../../src/sideNav/SideNavMenu');

describe('SideNavMenu', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<SideNavMenu className="TestClass" title="Test Title">
					child
				</SideNavMenu>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when a child element has current set', () => {
			const wrapper = shallow(
				<SideNavMenu title="Test Title">
					<SideNavMenuItem current />
				</SideNavMenu>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when boolean properties are set', () => {
			const child = <SideNavMenuItem current />;
			useContext.mockReturnValueOnce(true);
			const wrapper = shallow(
				<SideNavMenu title="Test Title" expanded>
					{child}
				</SideNavMenu>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
