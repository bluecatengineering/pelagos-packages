import {shallow} from 'enzyme';

import TableHead from '../../src/table/TableHead';
import TableRow from '../../src/table/TableRow';

jest.unmock('../../src/table/TableHead');

describe('TableHead', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<TableHead id="test">
					<TableRow />
				</TableHead>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
