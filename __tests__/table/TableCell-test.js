import {shallow} from 'enzyme';

import TableCell from '../../src/table/TableCell';

jest.unmock('../../src/table/TableCell');

describe('TableCell', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<TableCell id="test">body</TableCell>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(
				<TableCell id="test" className="TestClass">
					body
				</TableCell>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
