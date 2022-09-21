import {useRef} from 'react';

import useCollapse from '../../src/hooks/useCollapse';
import animate from '../../src/functions/animate';
import scrollIntoView from '../../src/functions/scrollIntoView';

jest.unmock('../../src/hooks/useCollapse');

const anyFunction = expect.any(Function);

describe('useCollapse', () => {
	it('sets display to none when prevOpenRef.current is null and open is false', () => {
		const style = {};
		useRef.mockReturnValue({current: null});
		useCollapse(false)({style});
		expect(style).toEqual({display: 'none'});
	});

	it('does not set display when prevOpenRef.current is null and open is true', () => {
		const style = {};
		useRef.mockReturnValue({current: null});
		useCollapse(true)({style});
		expect(style).toEqual({});
	});

	it('calls scrollIntoView when open changes to true', () => {
		const prevOpenRef = {current: false};
		const style = {};
		const parentNode = {};
		useRef.mockReturnValue(prevOpenRef);
		useCollapse(true)({style, parentNode, scrollHeight: 100});
		expect(prevOpenRef.current).toBe(true);
		expect(style).toEqual({display: ''});
		expect(animate.mock.calls).toEqual([[150, anyFunction, anyFunction]]);

		animate.mock.calls[0][1](0.25);
		expect(style).toEqual({display: '', height: '25px'});

		animate.mock.calls[0][2]();
		expect(scrollIntoView.mock.calls).toEqual([[parentNode, {smooth: true, done: anyFunction}]]);
		scrollIntoView.mock.calls[0][1].done();
		expect(style).toEqual({height: '', display: ''});
	});

	it('does not call scrollIntoView when open changes to false', () => {
		const prevOpenRef = {current: true};
		const style = {};
		const parentNode = {};
		useRef.mockReturnValue(prevOpenRef);
		useCollapse(false)({style, parentNode, scrollHeight: 100});
		expect(prevOpenRef.current).toBe(false);
		expect(style).toEqual({});
		expect(animate.mock.calls).toEqual([[150, anyFunction, anyFunction]]);

		animate.mock.calls[0][1](0.25);
		expect(style).toEqual({height: '75px'});

		animate.mock.calls[0][2]();
		expect(scrollIntoView.mock.calls).toEqual([]);
		expect(style).toEqual({height: '0', display: 'none'});
	});

	it('does not change anything when open does not change', () => {
		const style = {};
		useRef.mockReturnValue({current: true});
		useCollapse(true)({style});
		expect(style).toEqual({});
	});

	it('does not throw when element is null', () => {
		expect(() => useCollapse(true)(null)).not.toThrow();
	});
});
