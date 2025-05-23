import {useEffect, useRef, useState} from 'react';
import {shallow} from 'enzyme';

import Calendar from '../../src/components/Calendar';
import useRandomId from '../../src/hooks/useRandomId';

jest.unmock('../../src/components/Calendar');

const anyFunction = expect.any(Function);
const offsetUTC = (time) => time - new Date(time).getTimezoneOffset() * 60000;

useRandomId.mockReturnValue('random-id');

describe('Calendar', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			useState.mockReturnValueOnce([new Date(2019, 8, 15)]).mockReturnValueOnce([null]);

			const wrapper = shallow(<Calendar />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			useState.mockReturnValueOnce([new Date(2019, 8, 15)]).mockReturnValueOnce([null]);

			const wrapper = shallow(<Calendar id="test" className="TestClass" />);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useRandomId.mock.calls).toEqual([['test']]);
		});

		it('renders expected elements when focused is later than highlighted', () => {
			useState.mockReturnValueOnce([new Date(2019, 8, 15)]).mockReturnValueOnce([new Date(2019, 8, 13).getTime()]);

			const wrapper = shallow(<Calendar />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when focused is earlier than highlighted', () => {
			useState.mockReturnValueOnce([new Date(2019, 8, 15)]).mockReturnValueOnce([new Date(2019, 8, 17).getTime()]);

			const wrapper = shallow(<Calendar />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when value is set', () => {
			useState.mockReturnValueOnce([new Date(2019, 8, 15)]).mockReturnValueOnce([null]);

			const wrapper = shallow(<Calendar value={[1567656000000, 1568088000000]} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('initializes focused to the current date', () => {
			useState.mockReturnValueOnce([new Date(2019, 8, 15)]).mockReturnValueOnce([null]);

			shallow(<Calendar />);
			expect(useState.mock.calls).toEqual([[anyFunction], [null]]);
			const date = useState.mock.calls[0][0]();
			expect(date.getTime()).toBe(new Date().setHours(0, 0, 0, 0));
		});

		it('initializes focused to the specified date', () => {
			useState.mockReturnValueOnce([new Date(2019, 8, 15)]).mockReturnValueOnce([null]);

			shallow(<Calendar value={1682375555250} />);
			expect(useState.mock.calls).toEqual([[anyFunction], [null]]);
			const date = useState.mock.calls[0][0]();
			expect(date.getTime()).toBe(1682308800000);
		});

		it('initializes focused to the specified date when value is an array', () => {
			useState.mockReturnValueOnce([new Date(2019, 8, 15)]).mockReturnValueOnce([null]);

			shallow(<Calendar value={[0, 1682375555250]} />);
			expect(useState.mock.calls).toEqual([[anyFunction], [null]]);
			const date = useState.mock.calls[0][0]();
			expect(date.getTime()).toBe(1682308800000);
		});

		it('initializes focused to the current date when value is an empty array', () => {
			useState.mockReturnValueOnce([new Date(2019, 8, 15)]).mockReturnValueOnce([null]);

			shallow(<Calendar value={[]} />);
			expect(useState.mock.calls).toEqual([[anyFunction], [null]]);
			const date = useState.mock.calls[0][0]();
			expect(date.getTime()).toBe(new Date().setHours(0, 0, 0, 0));
		});

		it('sets live text on focus', () => {
			const contains = jest.fn();
			const current = {contains};
			const live = {};
			const relatedTarget = {};
			useRef.mockReturnValueOnce({current}).mockReturnValueOnce({current: live});
			useState.mockReturnValueOnce([new Date(2019, 8, 15)]).mockReturnValueOnce([null]);

			const wrapper = shallow(<Calendar />);
			wrapper.find('#random-id').prop('onFocusCapture')({relatedTarget});

			expect(contains.mock.calls).toEqual([[relatedTarget]]);
			expect(live.textContent).toBe('Use cursor keys to select date');
		});

		it('does not set live text on focus if the related target is inside the table', () => {
			const contains = jest.fn().mockReturnValue(true);
			const current = {contains};
			const live = {};
			const relatedTarget = {};
			useRef.mockReturnValueOnce({current}).mockReturnValueOnce({current: live});
			useState.mockReturnValueOnce([new Date(2019, 8, 15)]).mockReturnValueOnce([null]);

			const wrapper = shallow(<Calendar />);
			wrapper.find('#random-id').prop('onFocusCapture')({relatedTarget});

			expect(contains.mock.calls).toEqual([[relatedTarget]]);
			expect(live.textContent).toBeUndefined();
		});

		it('clears live text on blur', () => {
			const live = {};
			useRef.mockReturnValueOnce({}).mockReturnValueOnce({current: live});
			useState.mockReturnValueOnce([new Date(2019, 8, 15)]).mockReturnValueOnce([null]);

			const wrapper = shallow(<Calendar />);
			wrapper.find('#random-id').prop('onBlurCapture')();

			expect(live.textContent).toBeNull();
		});

		it('does not throw on blur when liveRef.current is null', () => {
			useRef.mockReturnValueOnce({}).mockReturnValueOnce({current: null});
			useState.mockReturnValueOnce([new Date(2019, 8, 15)]).mockReturnValueOnce([null]);

			const wrapper = shallow(<Calendar />);
			expect(() => wrapper.find('#random-id').prop('onBlurCapture')()).not.toThrow();
		});

		it('ignores the event when a key is pressed and any modifier is set', () => {
			const preventDefault = jest.fn();
			useState.mockReturnValueOnce([new Date(2019, 8, 15)]).mockReturnValueOnce([null]);

			const wrapper = shallow(<Calendar />);
			const grid = wrapper.find('#random-id');
			grid.simulate('keydown', {key: 'Enter', shiftKey: true, preventDefault});
			grid.simulate('keydown', {key: 'Enter', ctrlKey: true, preventDefault});
			grid.simulate('keydown', {key: 'Enter', altKey: true, preventDefault});
			grid.simulate('keydown', {key: 'Enter', metaKey: true, preventDefault});

			expect(preventDefault).not.toHaveBeenCalled();
		});

		it('sets highlighted when enter or space are pressed and no day is currently highlighted', () => {
			const focused = new Date(2019, 8, 15);
			const setHighlighted = jest.fn();
			const preventDefault = jest.fn();
			useState.mockReturnValueOnce([focused]).mockReturnValueOnce([null, setHighlighted]);

			const wrapper = shallow(<Calendar value={[]} />);
			const grid = wrapper.find('#random-id');
			grid.simulate('keydown', {key: 'Enter', preventDefault});
			grid.simulate('keydown', {key: ' ', preventDefault});

			expect(preventDefault).toHaveBeenCalledTimes(2);
			expect(setHighlighted.mock.calls).toEqual([[anyFunction], [anyFunction]]);
			expect(setHighlighted.mock.calls[0][0](0)).toEqual(focused.getTime());
		});

		it('selects previous month when page up is pressed', () => {
			const focused = new Date(2019, 8, 15);
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			useState.mockReturnValueOnce([focused, setFocused]).mockReturnValueOnce([null]);

			const wrapper = shallow(<Calendar />);
			wrapper.find('#random-id').simulate('keydown', {key: 'PageUp', preventDefault});

			expect(preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[anyFunction]]);
			expect(setFocused.mock.calls[0][0](focused)).toEqual(new Date(2019, 7, 15));
		});

		it('selects previous month when page up is pressed and the last day needs fixing', () => {
			const focused = new Date(2019, 2, 31);
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			useState.mockReturnValueOnce([focused, setFocused]).mockReturnValueOnce([null]);

			const wrapper = shallow(<Calendar />);
			wrapper.find('#random-id').simulate('keydown', {key: 'PageUp', preventDefault});

			expect(preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[anyFunction]]);
			expect(setFocused.mock.calls[0][0](focused)).toEqual(new Date(2019, 1, 28));
		});

		it('selects previous month when page up is pressed and current month is January', () => {
			const focused = new Date(2019, 0, 15);
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			useState.mockReturnValueOnce([focused, setFocused]).mockReturnValueOnce([null]);

			const wrapper = shallow(<Calendar />);
			wrapper.find('#random-id').simulate('keydown', {key: 'PageUp', preventDefault});

			expect(preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[anyFunction]]);
			expect(setFocused.mock.calls[0][0](focused)).toEqual(new Date(2018, 11, 15));
		});

		it('selects next month when page down is pressed', () => {
			const focused = new Date(2019, 8, 15);
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			useState.mockReturnValueOnce([focused, setFocused]).mockReturnValueOnce([null]);

			const wrapper = shallow(<Calendar />);
			wrapper.find('#random-id').simulate('keydown', {key: 'PageDown', preventDefault});

			expect(preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[anyFunction]]);
			expect(setFocused.mock.calls[0][0](focused)).toEqual(new Date(2019, 9, 15));
		});

		it('selects next month when page down is pressed and the last day needs fixing', () => {
			const focused = new Date(2019, 2, 31);
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			useState.mockReturnValueOnce([focused, setFocused]).mockReturnValueOnce([null]);

			const wrapper = shallow(<Calendar />);
			wrapper.find('#random-id').simulate('keydown', {key: 'PageDown', preventDefault});

			expect(preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[anyFunction]]);
			expect(setFocused.mock.calls[0][0](focused)).toEqual(new Date(2019, 3, 30));
		});

		it('selects next month when page down is pressed and current month is December', () => {
			const focused = new Date(2019, 11, 15);
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			useState.mockReturnValueOnce([focused, setFocused]).mockReturnValueOnce([null]);

			const wrapper = shallow(<Calendar />);
			wrapper.find('#random-id').simulate('keydown', {key: 'PageDown', preventDefault});

			expect(preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[anyFunction]]);
			expect(setFocused.mock.calls[0][0](focused)).toEqual(new Date(2020, 0, 15));
		});

		it('selects previous day when left is pressed', () => {
			const focused = new Date(2019, 8, 15);
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			useState.mockReturnValueOnce([focused, setFocused]).mockReturnValueOnce([null]);

			const wrapper = shallow(<Calendar />);
			wrapper.find('#random-id').simulate('keydown', {key: 'ArrowLeft', preventDefault});

			expect(preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[anyFunction]]);
			expect(setFocused.mock.calls[0][0](focused)).toEqual(new Date(2019, 8, 14));
		});

		it('selects previous week when up is pressed', () => {
			const focused = new Date(2019, 8, 15);
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			useState.mockReturnValueOnce([focused, setFocused]).mockReturnValueOnce([null]);

			const wrapper = shallow(<Calendar />);
			wrapper.find('#random-id').simulate('keydown', {key: 'ArrowUp', preventDefault});

			expect(preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[anyFunction]]);
			expect(setFocused.mock.calls[0][0](focused)).toEqual(new Date(2019, 8, 8));
		});

		it('selects next day when right is pressed', () => {
			const focused = new Date(2019, 8, 15);
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			useState.mockReturnValueOnce([focused, setFocused]).mockReturnValueOnce([null]);

			const wrapper = shallow(<Calendar />);
			wrapper.find('#random-id').simulate('keydown', {key: 'ArrowRight', preventDefault});

			expect(preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[anyFunction]]);
			expect(setFocused.mock.calls[0][0](focused)).toEqual(new Date(2019, 8, 16));
		});

		it('selects next week when down is pressed', () => {
			const focused = new Date(2019, 8, 15);
			const setFocused = jest.fn();
			const preventDefault = jest.fn();
			useState.mockReturnValueOnce([focused, setFocused]).mockReturnValueOnce([null]);

			const wrapper = shallow(<Calendar />);
			wrapper.find('#random-id').simulate('keydown', {key: 'ArrowDown', preventDefault});

			expect(preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[anyFunction]]);
			expect(setFocused.mock.calls[0][0](focused)).toEqual(new Date(2019, 8, 22));
		});

		it('selects date on mouse over', () => {
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([new Date(2019, 8, 15), setFocused]).mockReturnValueOnce([1]);

			const wrapper = shallow(<Calendar />);
			const closest = jest.fn();
			closest.mockReturnValueOnce({dataset: {time: '1567656000000'}});

			wrapper.find('#random-id').simulate('mouseover', {target: {closest}});
			expect(closest.mock.calls).toEqual([['td']]);
			expect(setFocused.mock.calls).toEqual([[new Date(2019, 8, 5)]]);
		});

		it('ignores the event when mouse is not over a calendar day', () => {
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([new Date(2019, 8, 15), setFocused]).mockReturnValueOnce([null]);

			const wrapper = shallow(<Calendar />);
			const closest = jest.fn();
			closest.mockReturnValueOnce({dataset: {}});

			wrapper.find('#random-id').simulate('mouseover', {target: {closest}});
			expect(closest.mock.calls).toEqual([['td']]);
			expect(setFocused).not.toHaveBeenCalled();
		});

		it('ignores the event when mouse up is not on a calendar day', () => {
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([new Date(2019, 8, 15), setFocused]).mockReturnValueOnce([null]);

			const wrapper = shallow(<Calendar />);
			const closest = jest.fn();
			closest.mockReturnValueOnce({dataset: {}});

			wrapper.find('#random-id').simulate('mouseup', {target: {closest}});
			expect(closest.mock.calls).toEqual([['td']]);
			expect(setFocused).not.toHaveBeenCalled();
		});

		it('calls onChange when a day is clicked in single value mode', () => {
			const setFocused = jest.fn();
			const onChange = jest.fn();
			useState.mockReturnValueOnce([new Date(2019, 8, 15), setFocused]).mockReturnValueOnce([null]);

			const wrapper = shallow(<Calendar onChange={onChange} />);
			const closest = jest.fn();
			closest.mockReturnValueOnce({dataset: {time: '1567656000000'}});

			wrapper.find('#random-id').simulate('mouseup', {target: {closest}});
			expect(closest.mock.calls).toEqual([['td']]);
			expect(setFocused.mock.calls).toEqual([[new Date(2019, 8, 5)]]);
			expect(onChange.mock.calls).toEqual([[1567656000000]]);
		});

		it('highlights day clicked on when highlight is null', () => {
			const setFocused = jest.fn();
			const setHighlighted = jest.fn();
			useState.mockReturnValueOnce([new Date(2019, 8, 15), setFocused]).mockReturnValueOnce([null, setHighlighted]);

			const wrapper = shallow(<Calendar value={[]} />);
			const closest = jest.fn();
			closest.mockReturnValueOnce({dataset: {time: '1567656000000'}});

			wrapper.find('#random-id').simulate('mouseup', {target: {closest}});
			expect(closest.mock.calls).toEqual([['td']]);
			expect(setFocused.mock.calls).toEqual([[new Date(2019, 8, 5)]]);
			expect(setHighlighted.mock.calls).toEqual([[anyFunction]]);
			expect(setHighlighted.mock.calls[0][0](null)).toBe(1567656000000);
		});

		it('calls onChange when a day is clicked in range mode', () => {
			const focused = new Date(2019, 8, 15);
			const highlighted = new Date(2019, 8, 10).getTime();
			const setFocused = jest.fn();
			const setHighlighted = jest.fn();
			const onChange = jest.fn();

			useState.mockReturnValueOnce([focused, setFocused]).mockReturnValueOnce([highlighted, setHighlighted]);

			const wrapper = shallow(<Calendar value={[]} onChange={onChange} />);
			const closest = jest.fn();
			closest.mockReturnValueOnce({dataset: {time: '1567656000000'}});

			wrapper.find('#random-id').simulate('mouseup', {target: {closest}});
			expect(closest.mock.calls).toEqual([['td']]);
			expect(setHighlighted.mock.calls).toEqual([[anyFunction]]);
			expect(setHighlighted.mock.calls[0][0](highlighted)).toBeNull();
			expect(onChange.mock.calls).toEqual([[[1567656000000, highlighted]]]);
		});

		it('calls onChange when a day is clicked in range mode and order is reversed', () => {
			const focused = new Date(2019, 8, 15);
			const highlighted = new Date(2019, 8, 3).getTime();
			const setFocused = jest.fn();
			const setHighlighted = jest.fn();
			const onChange = jest.fn();

			useState.mockReturnValueOnce([focused, setFocused]).mockReturnValueOnce([highlighted, setHighlighted]);

			const wrapper = shallow(<Calendar value={[]} onChange={onChange} />);
			const closest = jest.fn();
			closest.mockReturnValueOnce({dataset: {time: '1567656000000'}});

			wrapper.find('#random-id').simulate('mouseup', {target: {closest}});
			expect(closest.mock.calls).toEqual([['td']]);
			expect(setHighlighted.mock.calls).toEqual([[anyFunction]]);
			expect(setHighlighted.mock.calls[0][0](highlighted)).toBeNull();
			expect(onChange.mock.calls).toEqual([[[highlighted, 1567656000000]]]);
		});

		it('calls onChange when a day is clicked in range mode and times are passed', () => {
			const focused = new Date(2019, 8, 15);
			const highlighted = new Date(2019, 8, 10).getTime();
			const setFocused = jest.fn();
			const setHighlighted = jest.fn();
			const startTime = 1568740444560;
			const endTime = 1568740695791;
			const onChange = jest.fn();

			useState.mockReturnValueOnce([focused, setFocused]).mockReturnValueOnce([highlighted, setHighlighted]);

			const wrapper = shallow(<Calendar value={[startTime, endTime]} onChange={onChange} />);
			const closest = jest.fn();
			closest.mockReturnValueOnce({dataset: {time: '1567656000000'}});

			wrapper.find('#random-id').simulate('mouseup', {target: {closest}});
			expect(closest.mock.calls).toEqual([['td']]);
			expect(setHighlighted.mock.calls).toEqual([[anyFunction]]);
			expect(setHighlighted.mock.calls[0][0](highlighted)).toBeNull();
			expect(onChange.mock.calls).toEqual([
				[[offsetUTC(1567656000000 + (startTime % 8.64e7)), offsetUTC(highlighted + (endTime % 8.64e7))]],
			]);
		});

		it('calls preventDefault on mouse down on the left arrow', () => {
			const preventDefault = jest.fn();
			useState.mockReturnValueOnce([new Date(2019, 8, 15)]).mockReturnValueOnce([null]);
			const wrapper = shallow(<Calendar />);
			wrapper.find('IconButton').first().simulate('mousedown', {preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
		});

		it('calls preventDefault on mouse down on the right arrow', () => {
			const preventDefault = jest.fn();
			useState.mockReturnValueOnce([new Date(2019, 8, 15)]).mockReturnValueOnce([null]);
			const wrapper = shallow(<Calendar />);
			wrapper.find('IconButton').last().simulate('mousedown', {preventDefault});
			expect(preventDefault.mock.calls).toEqual([[]]);
		});

		it('adds an effect which calls focus', () => {
			const focused = new Date(2019, 8, 15);
			const activeElement = {};
			const contains = jest.fn().mockReturnValue(true);
			const focus = jest.fn();
			const querySelector = jest.fn().mockReturnValue({focus});
			const current = {contains, querySelector};
			useRef.mockReturnValueOnce({current});
			useState.mockReturnValueOnce([focused]).mockReturnValueOnce([null]);
			global.document = {activeElement};
			shallow(<Calendar />);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, [focused]]);

			useEffect.mock.calls[0][0]();
			expect(contains.mock.calls).toEqual([[activeElement]]);
			expect(querySelector.mock.calls).toEqual([['[tabindex="0"]']]);
			expect(focus.mock.calls).toEqual([[]]);
		});

		it('adds an effect which does not call focus if activeElement is not set', () => {
			const focused = new Date(2019, 8, 15);
			const contains = jest.fn();
			const current = {contains};
			useRef.mockReturnValueOnce({current});
			useState.mockReturnValueOnce([focused]).mockReturnValueOnce([null]);
			global.document = {};
			shallow(<Calendar />);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, [focused]]);

			useEffect.mock.calls[0][0]();
			expect(contains).not.toHaveBeenCalled();
		});

		it('adds an effect which does not call focus if the table does not contain activeElement', () => {
			const focused = new Date(2019, 8, 15);
			const activeElement = {};
			const contains = jest.fn();
			const querySelector = jest.fn();
			const current = {contains, querySelector};
			useRef.mockReturnValueOnce({current});
			useState.mockReturnValueOnce([focused]).mockReturnValueOnce([null]);
			global.document = {activeElement};
			shallow(<Calendar />);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, [focused]]);

			useEffect.mock.calls[0][0]();
			expect(contains.mock.calls).toEqual([[activeElement]]);
			expect(querySelector).not.toHaveBeenCalled();
		});
	});
});
