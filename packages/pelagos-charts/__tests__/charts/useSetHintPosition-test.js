import {useLayoutEffect} from 'react';

import useSetHintPosition from '../../src/charts/useSetHintPosition';

jest.unmock('../../src/charts/useSetHintPosition');

const anyFunction = expect.any(Function);

describe('useSetHintPosition', () => {
	it('adds a layout effect which sets the hint position', () => {
		const hint = {style: {}, getBoundingClientRect: () => ({width: 80, height: 32})};
		const chart = {parentNode: {getBoundingClientRect: () => ({left: 100, top: 10, width: 400})}};
		const hintData = {visible: true, x: 100, y: 150};
		const hintRef = {current: hint};
		const chartRef = {current: chart};
		useSetHintPosition(hintData, hintRef, chartRef);
		expect(useLayoutEffect.mock.calls[0]).toEqual([anyFunction, [chartRef, hintData, hintRef]]);

		useLayoutEffect.mock.calls[0][0]();
		expect(hint.style).toEqual({left: '10px', top: '124px'});
	});

	it('adds a layout effect which sets the hint position when the mouse is past the center', () => {
		const hint = {style: {}, getBoundingClientRect: () => ({width: 80, height: 32})};
		const chart = {parentNode: {getBoundingClientRect: () => ({left: 100, top: 10, width: 400})}};
		const hintData = {visible: true, x: 350, y: 150};
		const hintRef = {current: hint};
		const chartRef = {current: chart};
		useSetHintPosition(hintData, hintRef, chartRef);
		expect(useLayoutEffect.mock.calls[0]).toEqual([anyFunction, [chartRef, hintData, hintRef]]);

		useLayoutEffect.mock.calls[0][0]();
		expect(hint.style).toEqual({left: '162px', top: '124px'});
	});

	it('adds a layout effect which does not sets the hint position when visible is false', () => {
		const hint = {style: {}};
		const chart = {firstChild: {}};
		const hintData = {visible: false};
		const hintRef = {current: hint};
		const chartRef = {current: chart};
		useSetHintPosition(hintData, hintRef, chartRef);
		expect(useLayoutEffect.mock.calls[0]).toEqual([anyFunction, [chartRef, hintData, hintRef]]);

		useLayoutEffect.mock.calls[0][0]();
		expect(hint.style).toEqual({});
	});
});
