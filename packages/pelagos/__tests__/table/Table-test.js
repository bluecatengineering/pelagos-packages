import {shallow} from 'enzyme';

import Table from '../../src/table/Table';

jest.unmock('../../src/table/Table');

describe('Table', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<Table></Table>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(<Table className="TestClass"></Table>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when stickyHeader is set', () => {
			const wrapper = shallow(<Table stickyHeader></Table>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when fixedLayout is set', () => {
			const wrapper = shallow(<Table fixedLayout></Table>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when fixedColumns is set', () => {
			const wrapper = shallow(<Table fixedColumns></Table>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
