import {useContext} from 'react';
import {shallow} from 'enzyme';

import Tab from '../../src/tabs/Tab';

jest.unmock('../../src/tabs/Tab');

describe('Tab', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			useContext.mockReturnValueOnce({index: 0});
			const wrapper = shallow(<Tab>Test</Tab>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const onRemove = jest.fn();
			useContext.mockReturnValueOnce({index: 0, selectedIndex: 0, focused: 0, hasSecondary: true});
			const wrapper = shallow(
				<Tab className="TestClass" secondaryLabel="Test secondary" onRemove={onRemove}>
					Test
				</Tab>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onChange when the tab is clicked', () => {
			const onChange = jest.fn();
			useContext.mockReturnValueOnce({index: 0, onChange});
			const wrapper = shallow(<Tab>Test</Tab>);
			wrapper.simulate('click');
			expect(onChange.mock.calls).toEqual([[0]]);
		});

		it('calls onRemove when the middle button is clicked', () => {
			const onRemove = jest.fn();
			const preventDefault = jest.fn();
			useContext.mockReturnValueOnce({index: 0});
			const wrapper = shallow(<Tab onRemove={onRemove}>Test</Tab>);
			wrapper.simulate('mouseup', {button: 1, preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
			expect(onRemove.mock.calls).toEqual([[0]]);
		});

		it('does not calls onRemove when the other button is clicked', () => {
			const onRemove = jest.fn();
			useContext.mockReturnValueOnce({index: 0});
			const wrapper = shallow(<Tab onRemove={onRemove}>Test</Tab>);
			wrapper.simulate('mouseup', {button: 2});
			expect(onRemove.mock.calls).toEqual([]);
		});

		it('calls onRemove when the delete key is pressed', () => {
			const onRemove = jest.fn();
			useContext.mockReturnValueOnce({index: 0});
			const wrapper = shallow(<Tab onRemove={onRemove}>Test</Tab>);
			wrapper.simulate('keydown', {key: 'Delete'});
			expect(onRemove.mock.calls).toEqual([[0]]);
		});

		it('does not call onRemove when another key is pressed', () => {
			const onRemove = jest.fn();
			useContext.mockReturnValueOnce({index: 0});
			const wrapper = shallow(<Tab onRemove={onRemove}>Test</Tab>);
			wrapper.simulate('keydown', {key: 'Other'});
			expect(onRemove.mock.calls).toEqual([]);
		});

		it('calls onRemove when the remove button is clicked', () => {
			const onRemove = jest.fn();
			const stopPropagation = jest.fn();
			useContext.mockReturnValueOnce({index: 0});
			const wrapper = shallow(<Tab onRemove={onRemove}>Test</Tab>);
			wrapper.find('[role="button"]').simulate('click', {stopPropagation});
			expect(stopPropagation.mock.calls).toEqual([[]]);
			expect(onRemove.mock.calls).toEqual([[0]]);
		});
	});
});
