import {shallow} from 'enzyme';

import TableExpandableRow from '../../src/table/TableExpandableRow';

jest.unmock('../../src/table/TableExpandableRow');

describe('TableExpandableRow', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<TableExpandableRow colSpan={2}>Test child</TableExpandableRow>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(
				<TableExpandableRow className="TestClass" colSpan={2}>
					Test child
				</TableExpandableRow>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls add when the event type is mouseenter', () => {
			const add = jest.fn();
			const wrapper = shallow(<TableExpandableRow colSpan={2} />);
			wrapper.find('tr').simulate('mouseenter', {
				type: 'mouseenter',
				currentTarget: {previousSibling: {classList: {add}}},
			});
			expect(add.mock.calls).toEqual([['Table--parentRowHover']]);
		});

		it('calls add when the event type is mouseleave', () => {
			const remove = jest.fn();
			const wrapper = shallow(<TableExpandableRow colSpan={2} />);
			wrapper.find('tr').simulate('mouseleave', {
				type: 'mouseleave',
				currentTarget: {previousSibling: {classList: {remove}}},
			});
			expect(remove.mock.calls).toEqual([['Table--parentRowHover']]);
		});

		it('ignores the event when previousSibling is not set', () => {
			const wrapper = shallow(<TableExpandableRow colSpan={2} />);
			expect(() =>
				wrapper.find('tr').simulate('mouseenter', {
					type: 'mouseenter',
					currentTarget: {},
				})
			).not.toThrow();
		});
	});
});
