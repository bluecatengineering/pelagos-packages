import {shallow} from 'enzyme';

import Pagination from '../../src/components/Pagination';
import useRandomId from '../../src/hooks/useRandomId';

jest.unmock('../../src/components/Pagination');

useRandomId.mockReturnValue('test');

describe('Pagination', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<Pagination id="test" page={2} pageSize={10} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(<Pagination id="test" className="TestClass" page={2} pageSize={10} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when pageSizes is set', () => {
			const wrapper = shallow(<Pagination id="test" page={2} pageSize={10} pageSizes={[10, 20]} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when totalItems is set', () => {
			const wrapper = shallow(<Pagination id="test" page={2} pageSize={10} totalItems={123} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onPageChange when a page is selected', () => {
			const onPageChange = jest.fn();
			const wrapper = shallow(
				<Pagination id="test" page={2} pageSize={10} totalItems={123} onPageChange={onPageChange} />
			);
			wrapper.find('#test-page').simulate('change', {target: {value: '5'}});
			expect(onPageChange.mock.calls).toEqual([[5]]);
		});

		it('calls onPageChange when previous is clicked', () => {
			const onPageChange = jest.fn();
			const wrapper = shallow(<Pagination id="test" page={2} pageSize={10} onPageChange={onPageChange} />);
			wrapper.find('#test-prev').simulate('click');
			expect(onPageChange.mock.calls).toEqual([[1]]);
		});

		it('calls onPageChange when next is clicked', () => {
			const onPageChange = jest.fn();
			const wrapper = shallow(<Pagination id="test" page={2} pageSize={10} onPageChange={onPageChange} />);
			wrapper.find('#test-next').simulate('click');
			expect(onPageChange.mock.calls).toEqual([[3]]);
		});

		it('calls onPageSizeChange when a page size is selected', () => {
			const onPageSizeChange = jest.fn();
			const wrapper = shallow(
				<Pagination id="test" page={2} pageSize={10} pageSizes={[5, 10]} onPageSizeChange={onPageSizeChange} />
			);
			wrapper.find('#test-pageSize').simulate('change', {target: {value: '5'}});
			expect(onPageSizeChange.mock.calls).toEqual([[5]]);
		});
	});
});
