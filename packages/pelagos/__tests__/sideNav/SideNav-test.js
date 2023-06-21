import {shallow} from 'enzyme';

import SideNav from '../../src/sideNav/SideNav';

jest.unmock('../../src/sideNav/SideNav');

describe('SideNav', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<SideNav active>child</SideNav>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(<SideNav className="TestClass">child</SideNav>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
