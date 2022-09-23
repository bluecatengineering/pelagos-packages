import {shallow} from 'enzyme';

import TableToolbarBatch from '../../src/table/TableToolbarBatch';
import Button from '../../src/components/Button';
import hideChild from '../../src/table/hideChild';

jest.unmock('../../src/table/TableToolbarBatch');

hideChild.mockReturnValue('hideChild');

describe('TableToolbarBatch', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const button = <Button />;
			const wrapper = shallow(<TableToolbarBatch selectedCount={0}>{button}</TableToolbarBatch>);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(hideChild.mock.calls).toEqual([[button, 0]]);
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
			const buttons = [<Button key="a" />, <Button key="b" />];
			const wrapper = shallow(<TableToolbarBatch selectedCount={0}>{buttons}</TableToolbarBatch>);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(hideChild.mock.calls).toEqual([
				[buttons[0], 0, buttons],
				[buttons[1], 1, buttons],
			]);
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
