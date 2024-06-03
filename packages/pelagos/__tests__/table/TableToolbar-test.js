import {shallow} from 'enzyme';

import TableToolbar from '../../src/table/TableToolbar';
import TableToolbarDefault from '../../src/table/TableToolbarDefault';

jest.unmock('../../src/table/TableToolbar');

describe('TableToolbar', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<TableToolbar>
					<TableToolbarDefault />
				</TableToolbar>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(<TableToolbar className="TestClass" type="sectioned" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
