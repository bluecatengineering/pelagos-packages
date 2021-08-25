import {useRef} from 'react';
import {scrollIntoView} from '@bluecat/helpers';

import useCollapse from '../../src/hooks/useCollapse';

jest.unmock('../../src/hooks/useCollapse');

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
		const animation = {};
		const animate = jest.fn().mockReturnValue(animation);
		useRef.mockReturnValue(prevOpenRef);
		useCollapse(true)({style, parentNode, animate, scrollHeight: 100});
		expect(prevOpenRef.current).toBe(true);
		expect(style).toEqual({display: ''});
		expect(animate.mock.calls).toEqual([
			[
				[{height: '0'}, {height: '100px'}],
				{
					duration: 250,
					fill: 'both',
					easing: 'ease-out',
					direction: 'normal',
				},
			],
		]);

		animation.onfinish();
		expect(scrollIntoView.mock.calls).toEqual([[parentNode, {smooth: true}]]);
		expect(style).toEqual({display: ''});
	});

	it('does not call scrollIntoView when open changes to false', () => {
		const prevOpenRef = {current: true};
		const style = {};
		const parentNode = {};
		const animation = {};
		const animate = jest.fn().mockReturnValue(animation);
		useRef.mockReturnValue(prevOpenRef);
		useCollapse(false)({style, parentNode, animate, scrollHeight: 100});
		expect(prevOpenRef.current).toBe(false);
		expect(style).toEqual({});
		expect(animate.mock.calls).toEqual([
			[
				[{height: '0'}, {height: '100px'}],
				{
					duration: 250,
					fill: 'both',
					easing: 'ease-out',
					direction: 'reverse',
				},
			],
		]);

		animation.onfinish();
		expect(scrollIntoView.mock.calls).toEqual([]);
		expect(style).toEqual({display: 'none'});
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
