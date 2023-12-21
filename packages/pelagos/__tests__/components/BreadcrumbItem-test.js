import {shallow} from 'enzyme';

import BreadcrumbItem from '../../src/components/BreadcrumbItem';
import IconMenu from '../../src/components/IconMenu';
import MenuItem from '../../src/menu/MenuItem';

jest.unmock('../../src/components/BreadcrumbItem');

describe('BreadcrumbItem', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<BreadcrumbItem>Test</BreadcrumbItem>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when href is set', () => {
			const wrapper = shallow(
				<BreadcrumbItem href="#" other="foo">
					Test
				</BreadcrumbItem>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when href is set and the child is not a string', () => {
			const wrapper = shallow(
				<BreadcrumbItem href="#" other="foo">
					<span>Test</span>
				</BreadcrumbItem>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when the child is an IconMenu', () => {
			const wrapper = shallow(
				<BreadcrumbItem>
					<IconMenu>
						<MenuItem />
					</IconMenu>
				</BreadcrumbItem>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
