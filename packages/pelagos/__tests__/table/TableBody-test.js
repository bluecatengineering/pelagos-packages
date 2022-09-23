import {shallow} from 'enzyme';

import TableBody from '../../src/table/TableBody';
import TableRow from '../../src/table/TableRow';

jest.unmock('../../src/table/TableBody');

describe('TableBody', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<TableBody id="test">
					<TableRow />
				</TableBody>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
