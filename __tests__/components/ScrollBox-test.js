import {useEffect, useRef} from 'react';
import {shallow} from 'enzyme';

import ScrollBox from '../../src/components/ScrollBox';
import addResizeObserver from '../../src/functions/addResizeObserver';

jest.unmock('../../src/components/ScrollBox');

describe('ScrollBox', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<ScrollBox>
					<div>Test</div>
				</ScrollBox>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(
				<ScrollBox className="TestClass">
					<div>Test</div>
				</ScrollBox>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('scrolls left when the left arrow is clicked', () => {
			const current = {scrollLeft: 500};
			useRef.mockReturnValue({current});
			const wrapper = shallow(<ScrollBox />);
			wrapper.find('IconButton').first().simulate('click');
			expect(current.scrollLeft).toBe(340);
		});

		it('scrolls right when the right arrow is clicked', () => {
			const current = {scrollLeft: 500};
			useRef.mockReturnValue({current});
			const wrapper = shallow(<ScrollBox />);
			wrapper.find('IconButton').last().simulate('click');
			expect(current.scrollLeft).toBe(660);
		});

		it('calls preventDefault on mouse down on the left arrow', () => {
			const preventDefault = jest.fn();
			const wrapper = shallow(<ScrollBox />);
			wrapper.find('IconButton').first().simulate('mousedown', {preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
		});

		it('calls preventDefault on mouse down on the right arrow', () => {
			const preventDefault = jest.fn();
			const wrapper = shallow(<ScrollBox />);
			wrapper.find('IconButton').last().simulate('mousedown', {preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
		});

		it('adds and removes resize observer', () => {
			const onResize = jest.fn();
			const rect = {width: 50};
			const current = {
				getBoundingClientRect: jest.fn().mockReturnValue(rect),
				firstChild: {scrollWidth: 100},
				parentNode: {classList: {add: jest.fn()}},
			};
			useRef.mockReturnValue({current});
			shallow(<ScrollBox onResize={onResize} />);
			expect(useEffect).toHaveBeenCalledTimes(2);
			useEffect.mock.calls[0][0]();
			expect(addResizeObserver.mock.calls).toEqual([[current, expect.any(Function)]]);
			addResizeObserver.mock.calls[0][1]();
			expect(current.parentNode.classList.add.mock.calls).toEqual([['ScrollBox--overflow']]);
			expect(onResize.mock.calls).toEqual([[current, rect, true]]);
		});

		it('removes chevrons when width is less', () => {
			const rect = {width: 100};
			const current = {
				getBoundingClientRect: jest.fn().mockReturnValue(rect),
				firstChild: {scrollWidth: 50},
				parentNode: {classList: {remove: jest.fn()}},
			};
			useRef.mockReturnValue({current});
			shallow(<ScrollBox />);
			useEffect.mock.calls[1][0]();
			expect(current.parentNode.classList.remove.mock.calls).toEqual([['ScrollBox--overflow']]);
		});
	});
});
