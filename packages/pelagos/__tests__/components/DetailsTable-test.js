import {shallow} from 'enzyme';

import DetailsTable from '../../src/components/DetailsTable';
import useRandomId from '../../src/hooks/useRandomId';

jest.unmock('../../src/components/DetailsTable');

useRandomId.mockReturnValue('random-id');

describe('DetailsTable', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const list = ['test'];
			const columns = [
				{
					key: 'foo',
					header: 'Foo',
					headerClassName: 'HeaderClass',
					valueClassName: 'ValueClass',
					renderValue: (d) => d,
				},
				{
					key: 'bar',
					header: 'Bar',
					valueLong: true,
					renderValue: (d) => d,
				},
			];
			const wrapper = shallow(
				<DetailsTable
					id="test"
					className="TestClass"
					rowClassName="TestRowClass"
					title="Title"
					list={list}
					columns={columns}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useRandomId.mock.calls).toEqual([['test']]);
		});
	});
});
