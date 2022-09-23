import {shallow} from 'enzyme';

import TableRow from '../../src/table/TableRow';
import TableCell from '../../src/table/TableCell';

jest.unmock('../../src/table/TableRow');

describe('TableRow', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<TableRow id="test">
					<TableCell />
				</TableRow>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when selected is set', () => {
			const wrapper = shallow(
				<TableRow id="test" selected>
					<TableCell />
				</TableRow>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
