import {shallow} from 'enzyme';

import Collapsible from '../../src/components/Collapsible';
import addClassName from '../../src/functions/addClassName';
import cloneWithClassName from '../../src/functions/cloneWithClassName';

jest.unmock('../../src/components/Collapsible');

addClassName.mockReturnValue('addClassName');
cloneWithClassName.mockReturnValue('cloneWithClassName');

describe('Collapsible', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const header = <div />;
			const wrapper = shallow(
				<Collapsible id="test" className="TestClass" open={true} header="Test">
					{header}
					<div className="TestClass" />
				</Collapsible>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(cloneWithClassName.mock.calls).toEqual([[header, 'Collapsible__title']]);
		});

		it('sets a random id if not provided', () => {
			const random = jest.spyOn(Math, 'random').mockReturnValue(0.1);
			const wrapper = shallow(
				<Collapsible open={false}>
					<div />
					<div className="TestClass" />
				</Collapsible>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(random.mock.calls).toEqual([[]]);
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(
				<Collapsible id="test" className="TestClass" open={true}>
					<div />
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
				<Collapsible id="test" onHeaderClick={onHeaderClick}>
					<div />
					<div />
				</Collapsible>
			);
			wrapper.find('#test-header').simulate('click');
			expect(onHeaderClick).toHaveBeenCalled();
		});
	});
});
