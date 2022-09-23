import {shallow} from 'enzyme';

import TableToolbarDefault from '../../src/table/TableToolbarDefault';
import Button from '../../src/components/Button';
import hideChild from '../../src/table/hideChild';

jest.unmock('../../src/table/TableToolbarDefault');

hideChild.mockReturnValue('hideChild');

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
			const button = <Button />;
			const wrapper = shallow(<TableToolbarDefault hidden>{button}</TableToolbarDefault>);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(hideChild.mock.calls).toEqual([[button, 0]]);
		});

		it('renders expected elements when hidden is set and children is a list', () => {
			const buttons = [<Button key="a" />, <Button key="b" />];
			const wrapper = shallow(<TableToolbarDefault hidden>{buttons}</TableToolbarDefault>);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(hideChild.mock.calls).toEqual([
				[buttons[0], 0, buttons],
				[buttons[1], 1, buttons],
			]);
		});
	});
});
