import {shallow} from 'enzyme';

import TableSelectRow from '../../src/table/TableSelectRow';

jest.unmock('../../src/table/TableSelectRow');

describe('TableSelectRow', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<TableSelectRow id="test" checked aria-label="Select all" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when radio is set', () => {
			const wrapper = shallow(<TableSelectRow id="test" radio checked aria-label="Select all" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
