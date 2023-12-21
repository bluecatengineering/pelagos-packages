import {shallow} from 'enzyme';

import Breadcrumb from '../../src/components/Breadcrumb';
import BreadcrumbItem from '../../src/components/BreadcrumbItem';

jest.unmock('../../src/components/Breadcrumb');

describe('Breadcrumb', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<Breadcrumb>
					<BreadcrumbItem />
				</Breadcrumb>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(
				<Breadcrumb title="Test">
					<BreadcrumbItem />
				</Breadcrumb>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
