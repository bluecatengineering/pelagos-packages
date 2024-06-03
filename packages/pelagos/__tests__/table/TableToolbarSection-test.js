import {shallow} from 'enzyme';

import TableToolbarSection from '../../src/table/TableToolbarSection';

jest.unmock('../../src/table/TableToolbarSection');

describe('TableToolbarSection', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<TableToolbarSection />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(<TableToolbarSection className="TestClass" area="end" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
