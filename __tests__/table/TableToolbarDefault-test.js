import {shallow} from 'enzyme';

import TableToolbarDefault from '../../src/table/TableToolbarDefault';
import Button from '../../src/components/Button';

jest.unmock('../../src/table/TableToolbarDefault');

describe('TableToolbarDefault', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<TableToolbarDefault>
					<Button />
				</TableToolbarDefault>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(
				<TableToolbarDefault className="TestClass">
					<Button />
				</TableToolbarDefault>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when hidden is set', () => {
			const wrapper = shallow(
				<TableToolbarDefault hidden>
					<Button />
				</TableToolbarDefault>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when hidden is set and children is a list', () => {
			const wrapper = shallow(
				<TableToolbarDefault hidden>
					<Button />
					<Button />
				</TableToolbarDefault>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
