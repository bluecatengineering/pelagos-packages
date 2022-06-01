import {shallow} from 'enzyme';

import IconMenuItem from '../../src/components/IconMenuItem';

jest.unmock('../../src/components/IconMenuItem');

describe('IconMenuItem', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<IconMenuItem text="Test" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(<IconMenuItem className="TestClass" text="Test" disabled hasDivider />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
