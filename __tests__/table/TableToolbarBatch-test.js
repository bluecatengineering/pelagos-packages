import {shallow} from 'enzyme';

import TableToolbarBatch from '../../src/table/TableToolbarBatch';
import Button from '../../src/components/Button';

jest.unmock('../../src/table/TableToolbarBatch');

describe('TableToolbarBatch', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<TableToolbarBatch selectedCount={0}>
					<Button />
				</TableToolbarBatch>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(
				<TableToolbarBatch className="TestClass" selectedCount={0}>
					<Button />
				</TableToolbarBatch>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when children is a list', () => {
			const wrapper = shallow(
				<TableToolbarBatch selectedCount={0}>
					<Button />
					<Button />
				</TableToolbarBatch>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when selectedCount is not 0', () => {
			const wrapper = shallow(
				<TableToolbarBatch selectedCount={1}>
					<Button />
				</TableToolbarBatch>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
