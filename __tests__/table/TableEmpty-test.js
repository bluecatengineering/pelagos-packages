import {shallow} from 'enzyme';

import TableEmpty from '../../src/table/TableEmpty';

jest.unmock('../../src/table/TableEmpty');

describe('TableEmpty', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<TableEmpty id="test">Test</TableEmpty>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
		it('renders expected elements when className is set', () => {
			const wrapper = shallow(
				<TableEmpty id="test" className="TestClass">
					Test
				</TableEmpty>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
