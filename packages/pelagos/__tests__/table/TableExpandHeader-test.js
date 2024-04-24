import {shallow} from 'enzyme';

import TableExpandHeader from '../../src/table/TableExpandHeader';

jest.unmock('../../src/table/TableExpandHeader');

describe('TableExpandHeader', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<TableExpandHeader />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(<TableExpandHeader className="TestClass" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
