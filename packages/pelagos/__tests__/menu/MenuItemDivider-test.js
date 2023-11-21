import {shallow} from 'enzyme';

import MenuItemDivider from '../../src/menu/MenuItemDivider';

jest.unmock('../../src/menu/MenuItemDivider');

describe('MenuItemDivider', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<MenuItemDivider />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(<MenuItemDivider className="TestClass" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
