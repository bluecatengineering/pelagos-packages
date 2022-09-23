import {shallow} from 'enzyme';

import BreadcrumbItem from '../../src/components/BreadcrumbItem';

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
	});
});
