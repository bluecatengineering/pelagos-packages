import {shallow} from 'enzyme';

import TableHeader from '../../src/table/TableHeader';

jest.unmock('../../src/table/TableHeader');

describe('TableHeader', () => {
	describe('rendering', () => {
		it('renders expected elements when sortable is true', () => {
			const wrapper = shallow(
				<TableHeader id="test" sortable sortOrder="a" align="center">
					body
				</TableHeader>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when sortable is true and sortOrder is d', () => {
			const wrapper = shallow(
				<TableHeader id="test" sortable sortOrder="d" align="center">
					body
				</TableHeader>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when sortable is true and sortOrder is not set', () => {
			const wrapper = shallow(
				<TableHeader id="test" sortable align="center">
					body
				</TableHeader>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when sortable is true and className is set', () => {
			const wrapper = shallow(
				<TableHeader id="test" className="TestClass" sortable align="center">
					body
				</TableHeader>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when sortable is not set', () => {
			const wrapper = shallow(<TableHeader id="test">body</TableHeader>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(
				<TableHeader id="test" className="TestClass">
					body
				</TableHeader>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when radio is set', () => {
			const wrapper = shallow(
				<TableHeader id="test" radio>
					body
				</TableHeader>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
