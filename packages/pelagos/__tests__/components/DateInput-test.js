import {useEffect, useRef, useState} from 'react';
import {shallow} from 'enzyme';
import {createFocusTrap} from 'focus-trap';

import DateInput from '../../src/components/DateInput';

jest.unmock('../../src/components/DateInput');

const anyFunction = expect.any(Function);

const body = {tag: 'body'};
global.document = {body};

describe('DateInput', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<DateInput />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(<DateInput className="TestClass" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when value is set', () => {
			const wrapper = shallow(<DateInput value="foo" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when calendarTime is set', () => {
			useState.mockReturnValueOnce([1000]);
			const wrapper = shallow(<DateInput />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onChange when the input changes', () => {
			const onChange = jest.fn();
			const wrapper = shallow(<DateInput onChange={onChange} />);
			wrapper.find('[as="input"]').simulate('change', {target: {value: 'foo'}});
			expect(onChange.mock.calls).toEqual([['foo']]);
		});

		it('calls setCalendarTime when the button is clicked', () => {
			const setCalendarTime = jest.fn();
			const parse = jest.fn().mockReturnValue(1000);
			useState.mockReturnValueOnce([null, setCalendarTime]);
			const wrapper = shallow(<DateInput value="foo" parse={parse} />);
			wrapper.find('IconButton').simulate('click');
			expect(parse.mock.calls).toEqual([['foo']]);
			expect(setCalendarTime.mock.calls).toEqual([[1000]]);
		});

		it('calls setCalendarTime when the button is clicked and parse returns null', () => {
			const setCalendarTime = jest.fn();
			const parse = jest.fn();
			const setHours = jest.fn().mockReturnValue(2000);
			useState.mockReturnValueOnce([null, setCalendarTime]);
			jest.spyOn(global, 'Date').mockImplementation(() => ({setHours}));
			const wrapper = shallow(<DateInput value="foo" parse={parse} />);
			wrapper.find('IconButton').simulate('click');
			expect(parse.mock.calls).toEqual([['foo']]);
			expect(Date.mock.calls).toEqual([[]]);
			expect(setHours.mock.calls).toEqual([[0, 0, 0, 0]]);
			expect(setCalendarTime.mock.calls).toEqual([[2000]]);
		});

		it('calls onChange when the Calendar calls onChange', () => {
			const setCalendarTime = jest.fn();
			const format = jest.fn().mockReturnValue('bar');
			const onChange = jest.fn();
			useState.mockReturnValueOnce([1000, setCalendarTime]);
			const wrapper = shallow(<DateInput format={format} onChange={onChange} />);
			wrapper.find('Calendar').simulate('change', 'foo');
			expect(format.mock.calls).toEqual([['foo']]);
			expect(onChange.mock.calls).toEqual([['bar']]);
			expect(setCalendarTime.mock.calls).toEqual([[null]]);
		});

		it('adds an effect which creates and activates a focus trap', () => {
			const wrapper = {
				closest: jest.fn().mockReturnValue({dataset: {layer: '2'}}),
				getBoundingClientRect: jest.fn().mockReturnValue({bottom: 100, left: 200}),
			};
			const popUp = {style: {}};
			const setCalendarTime = jest.fn();
			const activate = jest.fn();
			const deactivate = jest.fn();
			useRef.mockReturnValueOnce({current: wrapper}).mockReturnValueOnce({current: popUp});
			useState.mockReturnValueOnce([1000, setCalendarTime]);
			createFocusTrap.mockReturnValue({activate, deactivate});
			shallow(<DateInput className="TestClass" />);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, [1000]]);
			expect(useEffect.mock.calls[0][0]()).toBe(deactivate);
			expect(activate.mock.calls).toEqual([[]]);
			expect(createFocusTrap.mock.calls).toEqual([
				[popUp, {initialFocus: '.Calendar [tabindex="0"]', allowOutsideClick: anyFunction, onDeactivate: anyFunction}],
			]);

			const {allowOutsideClick, onDeactivate} = createFocusTrap.mock.calls[0][1];

			expect(allowOutsideClick({type: 'foo'})).toBe(false);
			expect(deactivate.mock.calls).toEqual([]);

			expect(allowOutsideClick({type: 'click'})).toBe(false);
			expect(deactivate.mock.calls).toEqual([[]]);

			onDeactivate();
			expect(setCalendarTime.mock.calls).toEqual([[null]]);
		});

		it('adds an effect which does not create a focus trap when calendarTime is null', () => {
			const button = {};
			const popUp = {};
			useRef.mockReturnValueOnce({current: button}).mockReturnValueOnce({current: popUp});
			useState.mockReturnValueOnce([null]);
			shallow(<DateInput className="TestClass" />);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, [null]]);
			expect(useEffect.mock.calls[0][0]()).toBeUndefined();
			expect(createFocusTrap.mock.calls).toEqual([]);
		});
	});
});
