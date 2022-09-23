import {shallow} from 'enzyme';

import SideNavDivider from '../../src/sideNav/SideNavDivider';

jest.unmock('../../src/sideNav/SideNavDivider');

describe('SideNavDivider', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<SideNavDivider />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(<SideNavDivider className="TestClass" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
