import {shallow} from 'enzyme';

import DetailsTable from '../../src/components/DetailsTable';

jest.unmock('../../src/components/DetailsTable');

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
				<DetailsTable className="TestClass" rowClassName="TestRowClass" title="Title" list={list} columns={columns} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
