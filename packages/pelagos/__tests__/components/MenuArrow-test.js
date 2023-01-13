import {shallow} from 'enzyme';

import MenuArrow from '../../src/components/MenuArrow';

jest.unmock('../../src/components/MenuArrow');

describe('MenuArrow', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<MenuArrow />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(<MenuArrow className="TestClass" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
