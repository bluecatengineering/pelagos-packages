import {shallow} from 'enzyme';

import Menu from '../../src/menu/Menu';
import MenuItem from '../../src/menu/MenuItem';

jest.unmock('../../src/menu/Menu');

describe('Menu', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<Menu>
					<MenuItem />
				</Menu>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(
				<Menu id="test" className="TestClass">
					<MenuItem />
				</Menu>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
