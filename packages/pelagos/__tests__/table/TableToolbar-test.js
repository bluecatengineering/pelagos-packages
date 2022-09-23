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

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(
				<TableToolbar className="TestClass">
					<TableToolbarDefault />
				</TableToolbar>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
