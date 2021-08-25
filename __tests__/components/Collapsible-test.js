import {shallow} from 'enzyme';

import Collapsible from '../../src/components/Collapsible';

jest.unmock('../../src/components/Collapsible');

describe('Collapsible', () => {
	describe('rendering', () => {
		it('renders expected elements when open is true and id is set', () => {
			const wrapper = shallow(
				<Collapsible id="test" open={true} header="Test">
					<div className="TestClass" />
				</Collapsible>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('sets a random id if not provided', () => {
			const random = jest.spyOn(Math, 'random').mockReturnValue(0.1);
			const wrapper = shallow(
				<Collapsible open={false} header="Test">
					<div className="TestClass" />
				</Collapsible>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(random.mock.calls).toEqual([[]]);
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(
				<Collapsible id="test" className="TestClass" open={true} header="Test">
					<div className="TestClass" />
				</Collapsible>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onHeaderClick when the header is clicked', () => {
			const onHeaderClick = jest.fn();
			const wrapper = shallow(
				<Collapsible id="test" header="Test" onHeaderClick={onHeaderClick}>
					<div />
				</Collapsible>
			);
			wrapper.find('#test-header').simulate('click');
			expect(onHeaderClick).toHaveBeenCalled();
		});
	});
});
