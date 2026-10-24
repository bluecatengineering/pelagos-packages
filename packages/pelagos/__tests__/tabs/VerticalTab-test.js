import {useContext} from 'react';
import {shallow} from 'enzyme';

import VerticalTab from '../../src/tabs/VerticalTab';

jest.unmock('../../src/tabs/VerticalTab');

describe('VerticalTab', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			useContext.mockReturnValueOnce({index: 0});
			const wrapper = shallow(<VerticalTab>Test</VerticalTab>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			useContext.mockReturnValueOnce({index: 0, selectedIndex: 0, focused: 0});
			const wrapper = shallow(
				<VerticalTab className="TestClass" secondaryLabel="Test secondary" error>
					Test
				</VerticalTab>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onChange when the tab is clicked', () => {
			const onChange = jest.fn();
			useContext.mockReturnValueOnce({index: 0, onChange});
			const wrapper = shallow(<VerticalTab>Test</VerticalTab>);
			wrapper.simulate('click', {});
			expect(onChange.mock.calls).toEqual([[0]]);
		});

		it('calls onClick before onChange when the tab is clicked', () => {
			const calls = [];
			const onChange = jest.fn(() => calls.push('onChange'));
			const onClick = jest.fn(() => calls.push('onClick'));
			const event = {};
			useContext.mockReturnValueOnce({index: 0, onChange});
			const wrapper = shallow(<VerticalTab onClick={onClick}>Test</VerticalTab>);
			wrapper.simulate('click', event);
			expect(onClick.mock.calls).toEqual([[event]]);
			expect(calls).toEqual(['onClick', 'onChange']);
		});

		it('does not call onChange when onClick calls preventDefault', () => {
			const onChange = jest.fn();
			useContext.mockReturnValueOnce({index: 0, onChange});
			const wrapper = shallow(<VerticalTab onClick={(event) => (event.defaultPrevented = true)}>Test</VerticalTab>);
			wrapper.simulate('click', {});
			expect(onChange).not.toHaveBeenCalled();
		});
	});
});
