import {shallow} from 'enzyme';

import Breadcrumb from '../../src/components/Breadcrumb';
import BreadcrumbItem from '../../src/components/BreadcrumbItem';

jest.unmock('../../src/components/Breadcrumb');

describe('Breadcrumb', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<Breadcrumb title="Test">
					<BreadcrumbItem />
				</Breadcrumb>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when breadcrumb is set', () => {
			const action0 = jest.fn();
			const action1 = jest.fn();
			const wrapper = shallow(<Breadcrumb title="Test" breadcrumb={[action0, action1]} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls history.go when back is clicked', () => {
			const go = jest.fn();
			global.history = {go};
			const wrapper = shallow(
				<Breadcrumb title="Test">
					<BreadcrumbItem />
				</Breadcrumb>
			);
			wrapper.find('IconButton').simulate('click');
			expect(go.mock.calls).toEqual([[-1]]);
		});
	});
});
