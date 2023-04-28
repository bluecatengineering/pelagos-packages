import {shallow} from 'enzyme';

import MenuItem from '../../src/menu/MenuItem';

jest.unmock('../../src/menu/MenuItem');

describe('MenuItem', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<MenuItem />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(<MenuItem id="test" className="TestClass" disabled hasDivider />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
