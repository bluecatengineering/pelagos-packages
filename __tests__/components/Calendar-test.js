import {useEffect, useRef, useState} from 'react';
import {shallow} from 'enzyme';

import Calendar from '../../src/components/Calendar';
import useRandomId from '../../src/hooks/useRandomId';
import setLiveText from '../../src/functions/setLiveText';

jest.unmock('../../src/components/Calendar');

const anyFunction = expect.any(Function);
const offsetUTC = (time) => time - new Date(time).getTimezoneOffset() * 60000;

useRandomId.mockReturnValue('test');

describe('Calendar', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			useState.mockReturnValueOnce([new Date(2019, 8, 15)]).mockReturnValueOnce([null]);

			const wrapper = shallow(<Calendar />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			useState.mockReturnValueOnce([new Date(2019, 8, 15)]).mockReturnValueOnce([null]);

			const wrapper = shallow(<Calendar className="TestClass" />);
			expect(wrapper.getElement()).toMatchSnapshot();
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
			expect(date.getHours()).toBe(0);
			expect(date.getMinutes()).toBe(0);
			expect(date.getSeconds()).toBe(0);
			expect(date.getMilliseconds()).toBe(0);
		});

		it('sets live text on focus', () => {
			const contains = jest.fn();
			const current = {contains};
			const relatedTarget = {};
			useRef.mockReturnValueOnce({current});
			useState.mockReturnValueOnce([new Date(2019, 8, 15)]).mockReturnValueOnce([null]);

			const wrapper = shallow(<Calendar />);
			wrapper.find('#test').prop('onFocusCapture')({relatedTarget});

			expect(contains.mock.calls).toEqual([[relatedTarget]]);
			expect(setLiveText.mock.calls).toEqual([['Use cursor keys to select date']]);
		});

		it('does not set live text on focus if the related target is inside the table', () => {
			const contains = jest.fn().mockReturnValue(true);
			const current = {contains};
			const relatedTarget = {};
			useRef.mockReturnValueOnce({current});
			useState.mockReturnValueOnce([new Date(2019, 8, 15)]).mockReturnValueOnce([null]);

			const wrapper = shallow(<Calendar />);
			wrapper.find('#test').prop('onFocusCapture')({relatedTarget});

			expect(contains.mock.calls).toEqual([[relatedTarget]]);
			expect(setLiveText).not.toHaveBeenCalled();
		});

		it('clears live text on blur', () => {
			useState.mockReturnValueOnce([new Date(2019, 8, 15)]).mockReturnValueOnce([null]);

			const wrapper = shallow(<Calendar />);
			wrapper.find('#test').prop('onBlurCapture')();

			expect(setLiveText.mock.calls).toEqual([[null]]);
		});

		it('ignores the event when a key is pressed and any modifier is set', () => {
			const preventDefault = jest.fn();
			useState.mockReturnValueOnce([new Date(2019, 8, 15)]).mockReturnValueOnce([null]);

			const wrapper = shallow(<Calendar />);
			const grid = wrapper.find('#test');
			grid.simulate('keydown', {keyCode: 13, shiftKey: true, preventDefault});
			grid.simulate('keydown', {keyCode: 13, ctrlKey: true, preventDefault});
			grid.simulate('keydown', {keyCode: 13, altKey: true, preventDefault});
			grid.simulate('keydown', {keyCode: 13, metaKey: true, preventDefault});

			expect(preventDefault).not.toHaveBeenCalled();
		});

		it('sets highlighted when enter or space are pressed and no day is currently highlighted', () => {
			const focused = new Date(2019, 8, 15);
			const setHighlighted = jest.fn();
			const preventDefault = jest.fn();
			useState.mockReturnValueOnce([focused]).mockReturnValueOnce([null, setHighlighted]);

			const wrapper = shallow(<Calendar value={[]} />);
			const grid = wrapper.find('#test');
			grid.simulate('keydown', {keyCode: 13, preventDefault});
			grid.simulate('keydown', {keyCode: 32, preventDefault});

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
			wrapper.find('#test').simulate('keydown', {keyCode: 33, preventDefault});

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
			wrapper.find('#test').simulate('keydown', {keyCode: 33, preventDefault});

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
			wrapper.find('#test').simulate('keydown', {keyCode: 33, preventDefault});

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
			wrapper.find('#test').simulate('keydown', {keyCode: 34, preventDefault});

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
			wrapper.find('#test').simulate('keydown', {keyCode: 34, preventDefault});

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
			wrapper.find('#test').simulate('keydown', {keyCode: 34, preventDefault});

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
			wrapper.find('#test').simulate('keydown', {keyCode: 37, preventDefault});

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
			wrapper.find('#test').simulate('keydown', {keyCode: 38, preventDefault});

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
			wrapper.find('#test').simulate('keydown', {keyCode: 39, preventDefault});

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
			wrapper.find('#test').simulate('keydown', {keyCode: 40, preventDefault});

			expect(preventDefault).toHaveBeenCalledTimes(1);
			expect(setFocused.mock.calls).toEqual([[anyFunction]]);
			expect(setFocused.mock.calls[0][0](focused)).toEqual(new Date(2019, 8, 22));
		});

		it('selects date on mouse over', () => {
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([new Date(2019, 8, 15), setFocused]).mockReturnValueOnce([1]);

			const wrapper = shallow(<Calendar />);

			wrapper.find('#test').simulate('mouseover', {target: {dataset: {time: '1567656000000'}}});
			expect(setFocused.mock.calls).toEqual([[new Date(2019, 8, 5)]]);
		});

		it('ignores the event when mouse is not over a calendar day', () => {
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([new Date(2019, 8, 15), setFocused]).mockReturnValueOnce([null]);

			const wrapper = shallow(<Calendar />);

			wrapper.find('#test').simulate('mouseover', {target: {dataset: {}}});
			expect(setFocused).not.toHaveBeenCalled();
		});

		it('ignores the event when mouse up is not on a calendar day', () => {
			const setFocused = jest.fn();
			useState.mockReturnValueOnce([new Date(2019, 8, 15), setFocused]).mockReturnValueOnce([null]);

			const wrapper = shallow(<Calendar />);

			wrapper.find('#test').simulate('mouseup', {target: {dataset: {}}});
			expect(setFocused).not.toHaveBeenCalled();
		});

		it('calls onChange when a day is clicked in single value mode', () => {
			const setFocused = jest.fn();
			const onChange = jest.fn();
			useState.mockReturnValueOnce([new Date(2019, 8, 15), setFocused]).mockReturnValueOnce([null]);

			const wrapper = shallow(<Calendar onChange={onChange} />);
			wrapper.find('#test').simulate('mouseup', {target: {dataset: {time: '1567656000000'}}});

			expect(setFocused.mock.calls).toEqual([[new Date(2019, 8, 5)]]);
			expect(onChange.mock.calls).toEqual([[1567656000000]]);
		});

		it('highlights day clicked on when highlight is null', () => {
			const setFocused = jest.fn();
			const setHighlighted = jest.fn();
			useState.mockReturnValueOnce([new Date(2019, 8, 15), setFocused]).mockReturnValueOnce([null, setHighlighted]);

			const wrapper = shallow(<Calendar value={[]} />);
			wrapper.find('#test').simulate('mouseup', {target: {dataset: {time: '1567656000000'}}});

			expect(setFocused.mock.calls).toEqual([[new Date(2019, 8, 5)]]);
			expect(setHighlighted.mock.calls).toEqual([[anyFunction]]);
			expect(setHighlighted.mock.calls[0][0](null)).toEqual(1567656000000);
		});

		it('calls onChange when a day is clicked in range mode', () => {
			const focused = new Date(2019, 8, 15);
			const highlighted = new Date(2019, 8, 10).getTime();
			const setFocused = jest.fn();
			const setHighlighted = jest.fn();
			const onChange = jest.fn();

			useState.mockReturnValueOnce([focused, setFocused]).mockReturnValueOnce([highlighted, setHighlighted]);

			const wrapper = shallow(<Calendar value={[]} onChange={onChange} />);
			wrapper.find('#test').simulate('mouseup', {target: {dataset: {time: '1567656000000'}}});

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
			wrapper.find('#test').simulate('mouseup', {target: {dataset: {time: '1567656000000'}}});

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
			wrapper.find('#test').simulate('mouseup', {target: {dataset: {time: '1567656000000'}}});

			expect(setHighlighted.mock.calls).toEqual([[anyFunction]]);
			expect(setHighlighted.mock.calls[0][0](highlighted)).toBeNull();
			expect(onChange.mock.calls).toEqual([
				[[offsetUTC(1567656000000 + (startTime % 8.64e7)), offsetUTC(highlighted + (endTime % 8.64e7))]],
			]);
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
			expect(querySelector.mock.calls).toEqual([['[aria-selected="true"]']]);
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
