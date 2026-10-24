import {useRef} from 'react';

import useCollapse from '../../src/hooks/useCollapse';
import animate from '../../src/functions/animate';
import scrollIntoView from '../../src/functions/scrollIntoView';

jest.unmock('../../src/hooks/useCollapse');

const anyFunction = expect.any(Function);

const mockRefs = (prevOpen, animation = null) => {
	const prevOpenRef = {current: prevOpen};
	const animationRef = {current: animation};
	useRef.mockReturnValueOnce(prevOpenRef).mockReturnValueOnce(animationRef);
	return [prevOpenRef, animationRef];
};

describe('useCollapse', () => {
	it('sets display to none when prevOpenRef.current is null and open is false', () => {
		const style = {};
		mockRefs(null);
		useCollapse(false)({style});
		expect(style).toEqual({display: 'none'});
	});

	it('does not set display when prevOpenRef.current is null and open is true', () => {
		const style = {};
		mockRefs(null);
		useCollapse(true)({style});
		expect(style).toEqual({});
	});

	it('calls scrollIntoView when open changes to true', () => {
		const style = {display: 'none'};
		const parentNode = {};
		const handle = {cancel: jest.fn()};
		const [prevOpenRef, animationRef] = mockRefs(false);
		animate.mockReturnValue(handle);
		useCollapse(true)({style, parentNode, offsetHeight: 50, scrollHeight: 100});
		expect(prevOpenRef.current).toBe(true);
		expect(animationRef.current).toBe(handle);
		expect(style).toEqual({display: ''});
		expect(animate.mock.calls).toEqual([[150, anyFunction, anyFunction]]);

		animate.mock.calls[0][1](0.25);
		expect(style).toEqual({display: '', height: '25px'});

		animate.mock.calls[0][2]();
		expect(scrollIntoView.mock.calls).toEqual([[parentNode, {smooth: true, done: anyFunction}]]);
		scrollIntoView.mock.calls[0][1].done();
		expect(style).toEqual({height: '', display: ''});
	});

	it('opens from the current height when the element is closing', () => {
		const style = {display: '', height: '60px'};
		const closing = {cancel: jest.fn()};
		mockRefs(false, closing);
		useCollapse(true)({style, parentNode: {}, offsetHeight: 60, scrollHeight: 100});
		expect(closing.cancel.mock.calls).toEqual([[]]);

		animate.mock.calls[0][1](0);
		expect(style.height).toBe('60px');
		animate.mock.calls[0][1](0.5);
		expect(style.height).toBe('80px');
	});

	it('keeps the height when the element is closed before scrolling ends', () => {
		const style = {display: 'none'};
		const [prevOpenRef] = mockRefs(false);
		useCollapse(true)({style, parentNode: {}, offsetHeight: 0, scrollHeight: 100});
		animate.mock.calls[0][1](1);
		animate.mock.calls[0][2]();

		prevOpenRef.current = false;
		scrollIntoView.mock.calls[0][1].done();
		expect(style.height).toBe('100px');
	});

	it('does not call scrollIntoView when open changes to false', () => {
		const style = {};
		const parentNode = {};
		const [prevOpenRef] = mockRefs(true);
		useCollapse(false)({style, parentNode, offsetHeight: 100, scrollHeight: 100});
		expect(prevOpenRef.current).toBe(false);
		expect(style).toEqual({});
		expect(animate.mock.calls).toEqual([[150, anyFunction, anyFunction]]);

		animate.mock.calls[0][1](0.25);
		expect(style).toEqual({height: '75px'});

		animate.mock.calls[0][2]();
		expect(scrollIntoView.mock.calls).toEqual([]);
		expect(style).toEqual({height: '0', display: 'none'});
	});

	it('closes from the current height when the element is opening', () => {
		const style = {display: '', height: '30px'};
		const opening = {cancel: jest.fn()};
		mockRefs(true, opening);
		useCollapse(false)({style, offsetHeight: 30, scrollHeight: 100});
		expect(opening.cancel.mock.calls).toEqual([[]]);

		animate.mock.calls[0][1](0.5);
		expect(style.height).toBe('15px');
	});

	it('does not change anything when open does not change', () => {
		const style = {};
		mockRefs(true);
		useCollapse(true)({style});
		expect(style).toEqual({});
	});

	it('cancels the running animation when the element is removed', () => {
		const handle = {cancel: jest.fn()};
		const [, animationRef] = mockRefs(true, handle);
		useCollapse(true)(null);
		expect(handle.cancel.mock.calls).toEqual([[]]);
		expect(animationRef.current).toBeNull();
	});

	it('does not throw when element is null', () => {
		mockRefs(null);
		expect(() => useCollapse(true)(null)).not.toThrow();
	});
});
