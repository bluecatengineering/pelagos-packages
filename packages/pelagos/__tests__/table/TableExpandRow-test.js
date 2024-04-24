import {shallow} from 'enzyme';

import TableExpandRow from '../../src/table/TableExpandRow';

jest.unmock('../../src/table/TableExpandRow');

describe('TableExpandRow', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<TableExpandRow aria-controls="test-row">Test child</TableExpandRow>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(
				<TableExpandRow className="TestClass" selected expanded aria-controls="test-row">
					Test child
				</TableExpandRow>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
