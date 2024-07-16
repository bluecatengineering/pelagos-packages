import {shallow} from 'enzyme';
import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import identity from 'lodash-es/identity';
import {select} from 'd3-selection';
import {addResizeObserver, useRandomId} from '@bluecateng/pelagos';

import ScatterChart from '../../src/charts/ScatterChart';
import getDomain from '../../src/charts/getDomain';
import createScale from '../../src/charts/createScale';
import getPlotBottom from '../../src/charts/getPlotBottom';
import getTicks from '../../src/charts/getTicks';
import drawLeftAxis from '../../src/charts/drawLeftAxis';
import drawBottomAxis from '../../src/charts/drawBottomAxis';
import drawGrid from '../../src/charts/drawGrid';
import getColorClass from '../../src/charts/getColorClass';
import getColorVariant from '../../src/charts/getColorVariant';
import {getDefaultClass, getKey, getValue} from '../../src/charts/Getters';
import SingleHint from '../../src/charts/SingleHint';
import drawLoadingGrid from '../../src/charts/drawLoadingGrid';
import tickFormatters from '../../src/charts/tickFormatters';

jest.unmock('../../src/charts/ScatterChart');
jest.unmock('../../src/charts/Getters');
jest.unmock('../../src/charts/mappers');

jest.mock('../../src/charts/tickFormatters', () => ({
	labels: null,
	linear: 'linear-tick',
	log: 'log-tick',
	time: jest.fn(),
}));
jest.mock('../../src/charts/hintFormatters', () => ({
	labels: 'labels-hint',
	linear: 'linear-hint',
	log: 'log-hint',
	time: 'time-hint',
}));

const anyFunction = expect.any(Function);

global.innerWidth = 800;

const createZero = () => ({
	selectAll: jest.fn().mockReturnThis(),
	data: jest.fn().mockReturnThis(),
	join: jest.fn().mockReturnThis(),
	attr: jest.fn().mockReturnThis(),
});

const createDots = () => ({
	selectAll: jest.fn().mockReturnThis(),
	data: jest.fn().mockReturnThis(),
	join: jest.fn().mockReturnThis(),
	attr: jest.fn().mockReturnThis(),
	on: jest.fn().mockReturnThis(),
});

useRandomId.mockReturnValue('random-id');
addResizeObserver.mockReturnValue('addResizeObserver');
getColorClass.mockReturnValue('getColorClass');
getColorVariant.mockReturnValue('getColorVariant');

describe('ScatterChart', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<ScatterChart data={[]} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			useState.mockReturnValueOnce([{visible: true, content: 'test-hint'}]);
			const wrapper = shallow(<ScatterChart className="TestClass" data={[]} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when data loading is set', () => {
			const wrapper = shallow(<ScatterChart dataOptions={{loading: true}} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('adds an effect which renders the chart', () => {
			const setHintData = jest.fn();
			const setAttribute = jest.fn();
			const data = [
				{group: 'a', date: 1577854800000, value: 8},
				{group: 'a', date: 1579064400000, value: 1},
				{group: 'a', date: 1580533200000, value: 3},
				{group: 'b', date: 1577854800000, value: 5},
				{group: 'b', date: 1579064400000, value: null},
				{group: 'b', date: 1580533200000, value: 9},
			];
			const onClick = jest.fn();
			const current = {
				childNodes: [{id: '0'}, {id: '1', firstChild: {}, lastChild: {}}, {id: '2'}, {id: '3'}],
				getBoundingClientRect: () => ({left: 20, width: 400, height: 300}),
			};
			const leftScale = jest.fn().mockReturnValueOnce(50);
			const bottomScale = jest.fn().mockReturnValueOnce(100);
			const leftTicks = [1, 5, 8];
			const zero = createZero();
			const dots = createDots();
			const bottomList = [1577854800000, 1579064400000, 1580533200000];
			const leftList = [8, 1, 3, 5, 9];
			const groupIndex = new Map([
				['a', 0],
				['b', 1],
			]);
			const pointList = [
				['a', 1577854800000, 8, data[0]],
				['a', 1579064400000, 1, data[1]],
				['a', 1580533200000, 3, data[2]],
				['b', 1577854800000, 5, data[3]],
				['b', 1580533200000, 9, data[5]],
			];
			const leftDomain = [1.1, 9.9];
			const bottomDomain = [1577854800000, 1580533200000];
			useRef.mockReturnValueOnce({current}).mockReturnValueOnce({}).mockReturnValueOnce({});
			useState.mockReturnValueOnce([{}, setHintData]);
			getDomain.mockReturnValueOnce(leftDomain).mockReturnValueOnce(bottomDomain);
			getPlotBottom.mockReturnValueOnce(262);
			createScale.mockReturnValueOnce(leftScale).mockReturnValueOnce(bottomScale);
			getTicks.mockReturnValueOnce(leftTicks).mockReturnValueOnce(bottomList);
			drawLeftAxis.mockReturnValueOnce(38);
			select.mockReturnValueOnce(zero).mockReturnValueOnce(dots);
			shallow(
				<ScatterChart
					data={data}
					leftAxis={{title: 'Left title'}}
					bottomAxis={{scaleType: 'time', title: 'Bottom title'}}
					onClick={onClick}
				/>
			);
			expect(useLayoutEffect.mock.calls[0]).toEqual([
				anyFunction,
				[
					'time',
					anyFunction,
					'Bottom title',
					null,
					1,
					identity,
					false,
					getDefaultClass,
					getDefaultClass,
					getDefaultClass,
					anyFunction,
					true,
					'Group',
					'time-hint',
					'linear-hint',
					'linear',
					'linear-tick',
					'Left title',
					onClick,
					true,
					0.3,
					true,
					4,
					{groupIndex, pointList, leftDomain, bottomDomain},
				],
			]);

			expect(useLayoutEffect.mock.calls[0][0]()).toBeUndefined();

			expect(getDomain.mock.calls).toEqual([
				[undefined, 'linear', leftList],
				[undefined, 'time', bottomList],
			]);
			expect(getColorVariant.mock.calls).toEqual([[null, 2]]);
			expect(select.mock.calls).toEqual([[current.childNodes[3]], [current.childNodes[2]]]);

			expect(getPlotBottom.mock.calls).toEqual([[300, 'Bottom title']]);
			expect(createScale.mock.calls).toEqual([
				['linear', leftDomain, [262, 0], 0.25],
				['time', bottomDomain, [38, 400], 0.25],
			]);
			expect(getTicks.mock.calls).toEqual([
				[leftScale, 3.75],
				[bottomScale, 5],
			]);
			expect(drawLeftAxis.mock.calls).toEqual([
				[current.childNodes[1].firstChild, leftScale, 'Left title', 3.75, leftTicks, 'linear-tick', 262],
			]);
			expect(drawBottomAxis.mock.calls).toEqual([
				[current.childNodes[1].lastChild, bottomScale, 'Bottom title', 5, bottomList, anyFunction, 400, 300, 262, 38],
			]);
			expect(drawGrid.mock.calls).toEqual([
				[current.childNodes[0], leftTicks, leftScale, bottomList, bottomScale, 400, 38, 262],
			]);

			expect(zero.selectAll.mock.calls).toEqual([['line']]);
			expect(zero.data.mock.calls).toEqual([[[]]]);
			expect(zero.join.mock.calls).toEqual([['line']]);
			expect(zero.attr.mock.calls).toEqual([
				['x1', 38],
				['x2', 400],
				['y1', 0],
				['y2', 0],
			]);

			expect(dots.selectAll.mock.calls).toEqual([['circle']]);
			expect(dots.data.mock.calls).toEqual([[pointList]]);
			expect(dots.join.mock.calls).toEqual([['circle']]);
			expect(dots.attr.mock.calls).toEqual([
				['class', anyFunction],
				['fill-opacity', 0.3],
				['r', 4],
				['cx', anyFunction],
				['cy', anyFunction],
				['role', 'graphics-symbol'],
				['aria-roledescription', 'point'],
				['aria-label', anyFunction],
			]);
			const dotsDatum = ['b', 1580533200000, 8];
			tickFormatters.time.mockReturnValueOnce('time-tick-1').mockReturnValueOnce('time-tick-2');
			expect(dots.attr.mock.calls[0][1](dotsDatum)).toBe('filled getColorClass getColorClass');
			expect(dots.attr.mock.calls[3][1](dotsDatum)).toBe(100);
			expect(dots.attr.mock.calls[4][1](dotsDatum)).toBe(50);
			expect(dots.attr.mock.calls[7][1](dotsDatum)).toBe('b, time-tick-1, 8');
			expect(dots.attr.mock.calls[7][1]([null, 1579064400000, 9])).toBe(', time-tick-2, 9');
			expect(tickFormatters.time.mock.calls).toEqual([[1580533200000], [1579064400000]]);

			expect(dots.on.mock.calls).toEqual([
				['click', anyFunction],
				['mousemove', anyFunction],
				['mouseleave', anyFunction],
			]);

			dots.on.mock.calls[0][1](null, [null, null, null, 'data']);
			expect(onClick.mock.calls).toEqual([['data']]);

			dots.on.mock.calls[1][1]({clientX: 82, clientY: 150, target: {setAttribute}}, ['a', 'foo', 5]);
			dots.on.mock.calls[2][1]({target: {setAttribute}});
			expect(setAttribute.mock.calls).toEqual([
				['fill-opacity', 1],
				['fill-opacity', 0.3],
			]);
			expect(setHintData.mock.calls).toEqual([
				[
					{
						visible: true,
						x: 82,
						y: 150,
						content: (
							<SingleHint
								bottomTitle="Bottom title"
								bottomValue="foo"
								bottomFormatter="time-hint"
								leftTitle="Left title"
								leftValue={5}
								leftFormatter="linear-hint"
								groupLabel="Group"
								group="a"
								groupFormatter={identity}
								groupIndex={groupIndex}
								variant="getColorVariant"
								option={1}
								getBgClass={getDefaultClass}
							/>
						),
					},
				],
				[anyFunction],
			]);
			expect(setHintData.mock.calls[1][0]({test: 'foo'})).toEqual({test: 'foo', visible: false});

			expect(leftScale.mock.calls).toEqual([[8]]);

			expect(bottomScale.mock.calls).toEqual([[1580533200000]]);

			expect(getColorClass.mock.calls).toEqual([
				['stroke', 'getColorVariant', 1, 1],
				['fill', 'getColorVariant', 1, 1],
			]);
		});

		it('adds an effect which renders the chart when alternate options are specified', () => {
			const data = [
				{group: 'a', key: 'foo', value: 8},
				{group: 'b', key: 'foo', value: 3},
			];
			const current = {
				childNodes: [{id: '0'}, {id: '1', firstChild: {}, lastChild: {}}, {id: '2'}, {id: '3'}],
				getBoundingClientRect: () => ({width: 400, height: 300}),
			};
			const leftScale = jest.fn();
			const bottomScale = jest.fn();
			const zero = createZero();
			const dots = createDots();
			const leftDomain = ['foo'];
			const bottomDomain = [8, 8];
			useRef.mockReturnValueOnce({current}).mockReturnValueOnce({}).mockReturnValueOnce({});
			getDomain.mockReturnValueOnce(leftDomain).mockReturnValueOnce(bottomDomain);
			getPlotBottom.mockReturnValueOnce(280);
			createScale.mockReturnValueOnce(leftScale).mockReturnValueOnce(bottomScale);
			getTicks.mockReturnValueOnce().mockReturnValueOnce();
			drawLeftAxis.mockReturnValueOnce(16);
			select.mockReturnValueOnce(zero).mockReturnValueOnce(dots);
			shallow(
				<ScatterChart
					data={data}
					dataOptions={{groupFormatter: 'test-formatter', selectedGroups: ['a']}}
					color={{pairing: {groupCount: 5, option: 2}}}
					bottomAxis={{domain: 'bottom-domain', scaleType: 'log', title: 'Bottom title', mapper: getValue}}
					leftAxis={{domain: 'left-domain', scaleType: 'labels', title: 'Left title', mapper: getKey}}
					points={{fillOpacity: 0.8, filled: false, radius: 5}}
					hint={{
						enabled: false,
						groupLabel: 'test-label',
						headerFormatter: 'test-header-formatter',
						valueFormatter: 'test-value-formatter',
					}}
				/>
			);
			expect(useLayoutEffect.mock.calls[0]).toEqual([
				anyFunction,
				[
					'log',
					'log-tick',
					'Bottom title',
					5,
					2,
					'test-formatter',
					false,
					getDefaultClass,
					getDefaultClass,
					getDefaultClass,
					anyFunction,
					false,
					'test-label',
					'test-header-formatter',
					'test-value-formatter',
					'labels',
					null,
					'Left title',
					undefined,
					true,
					0.8,
					false,
					5,
					{
						groupIndex: new Map([
							['a', 0],
							['b', 1],
						]),
						pointList: [['a', 8, 'foo', data[0]]],
						leftDomain,
						bottomDomain,
					},
				],
			]);

			expect(useLayoutEffect.mock.calls[0][0]()).toBeUndefined();
			expect(getDomain.mock.calls).toEqual([
				['left-domain', 'labels', ['foo']],
				['bottom-domain', 'log', [8]],
			]);
			expect(getColorVariant.mock.calls).toEqual([[5, 2]]);

			expect(zero.selectAll.mock.calls).toEqual([['line']]);
			expect(zero.data.mock.calls).toEqual([[[]]]);
			expect(zero.join.mock.calls).toEqual([['line']]);
			expect(zero.attr.mock.calls).toEqual([
				['x1', 16],
				['x2', 400],
				['y1', 0],
				['y2', 0],
			]);

			expect(dots.attr.mock.calls).toEqual([
				['class', anyFunction],
				['fill-opacity', 0.8],
				['r', 5],
				['cx', anyFunction],
				['cy', anyFunction],
				['role', 'graphics-symbol'],
				['aria-roledescription', 'point'],
				['aria-label', anyFunction],
			]);
			expect(dots.attr.mock.calls[0][1](['a', 'foo', 8])).toBe('hollow getColorClass getColorClass');

			expect(leftScale.mock.calls).toEqual([]);
			expect(bottomScale.mock.calls).toEqual([]);
		});

		it('adds an effect which renders the chart when points enabled is false', () => {
			const data = [
				{group: 'a', key: 'foo', value: 8},
				{group: 'b', key: 'foo', value: 3},
			];
			const replaceChildren = jest.fn();
			const current = {
				childNodes: [{id: '0'}, {id: '1', firstChild: {}, lastChild: {}}, {id: '2', replaceChildren}, {id: '3'}],
				getBoundingClientRect: () => ({width: 400, height: 300}),
			};
			const leftScale = jest.fn();
			const bottomScale = jest.fn();
			const zero = createZero();
			const leftDomain = ['foo'];
			const bottomDomain = [3, 8];
			useRef.mockReturnValueOnce({current}).mockReturnValueOnce({}).mockReturnValueOnce({});
			getDomain.mockReturnValueOnce(leftDomain).mockReturnValueOnce(bottomDomain);
			getPlotBottom.mockReturnValueOnce(280);
			createScale.mockReturnValueOnce(leftScale).mockReturnValueOnce(bottomScale);
			getTicks.mockReturnValueOnce().mockReturnValueOnce();
			drawLeftAxis.mockReturnValueOnce(16);
			select.mockReturnValueOnce(zero);
			shallow(<ScatterChart data={data} points={{enabled: false}} />);
			expect(useLayoutEffect.mock.calls[0]).toEqual([
				anyFunction,
				[
					'labels',
					null,
					undefined,
					null,
					1,
					identity,
					false,
					getDefaultClass,
					getDefaultClass,
					getDefaultClass,
					anyFunction,
					true,
					'Group',
					'labels-hint',
					'linear-hint',
					'linear',
					'linear-tick',
					undefined,
					undefined,
					false,
					0.3,
					true,
					4,
					{
						groupIndex: new Map([
							['a', 0],
							['b', 1],
						]),
						pointList: [
							['a', 'foo', 8, data[0]],
							['b', 'foo', 3, data[1]],
						],
						leftDomain,
						bottomDomain,
					},
				],
			]);

			expect(useLayoutEffect.mock.calls[0][0]()).toBeUndefined();
			expect(getDomain.mock.calls).toEqual([
				[undefined, 'linear', [8, 3]],
				[undefined, 'labels', ['foo']],
			]);
			expect(getColorVariant.mock.calls).toEqual([[null, 2]]);

			expect(zero.selectAll.mock.calls).toEqual([['line']]);
			expect(zero.data.mock.calls).toEqual([[[]]]);
			expect(zero.join.mock.calls).toEqual([['line']]);
			expect(zero.attr.mock.calls).toEqual([
				['x1', 16],
				['x2', 400],
				['y1', 0],
				['y2', 0],
			]);

			expect(replaceChildren.mock.calls).toEqual([[]]);

			expect(leftScale.mock.calls).toEqual([]);
			expect(bottomScale.mock.calls).toEqual([]);
		});

		it('adds an effect which renders the chart when min is negative', () => {
			const data = [
				{group: 'a', key: 'foo', value: 8},
				{group: 'b', key: 'foo', value: -3},
			];
			const current = {
				childNodes: [{id: '0'}, {id: '1', firstChild: {}, lastChild: {}}, {id: '2'}, {id: '3'}],
				getBoundingClientRect: () => ({width: 400, height: 300}),
			};
			const leftScale = jest.fn().mockReturnValueOnce(250);
			const bottomScale = jest.fn();
			const zero = createZero();
			const dots = createDots();
			const leftDomain = [-3, 8];
			const bottomDomain = ['foo'];
			useRef.mockReturnValueOnce({current}).mockReturnValueOnce({}).mockReturnValueOnce({});
			getDomain.mockReturnValueOnce(leftDomain).mockReturnValueOnce(bottomDomain);
			getPlotBottom.mockReturnValueOnce(280);
			createScale.mockReturnValueOnce(leftScale).mockReturnValueOnce(bottomScale);
			getTicks.mockReturnValueOnce().mockReturnValueOnce();
			drawLeftAxis.mockReturnValueOnce(16);
			select.mockReturnValueOnce(zero).mockReturnValueOnce(dots);
			shallow(<ScatterChart data={data} />);
			expect(useLayoutEffect.mock.calls[0]).toEqual([
				anyFunction,
				[
					'labels',
					null,
					undefined,
					null,
					1,
					identity,
					false,
					getDefaultClass,
					getDefaultClass,
					getDefaultClass,
					anyFunction,
					true,
					'Group',
					'labels-hint',
					'linear-hint',
					'linear',
					'linear-tick',
					undefined,
					undefined,
					true,
					0.3,
					true,
					4,
					{
						groupIndex: new Map([
							['a', 0],
							['b', 1],
						]),
						pointList: [
							['a', 'foo', 8, data[0]],
							['b', 'foo', -3, data[1]],
						],
						leftDomain,
						bottomDomain,
					},
				],
			]);

			expect(useLayoutEffect.mock.calls[0][0]()).toBeUndefined();
			expect(getDomain.mock.calls).toEqual([
				[undefined, 'linear', [8, -3]],
				[undefined, 'labels', ['foo']],
			]);
			expect(getColorVariant.mock.calls).toEqual([[null, 2]]);

			expect(zero.selectAll.mock.calls).toEqual([['line']]);
			expect(zero.data.mock.calls).toEqual([[[1]]]);
			expect(zero.join.mock.calls).toEqual([['line']]);
			expect(zero.attr.mock.calls).toEqual([
				['x1', 16],
				['x2', 400],
				['y1', 250],
				['y2', 250],
			]);

			expect(leftScale.mock.calls).toEqual([[0]]);
			expect(bottomScale.mock.calls).toEqual([]);
		});

		it('adds an effect which renders the chart when data loading is set', () => {
			const current = {
				getBoundingClientRect: () => ({width: 400, height: 300}),
			};
			useRef.mockReturnValueOnce({current}).mockReturnValueOnce({}).mockReturnValueOnce({});
			shallow(<ScatterChart dataOptions={{loading: true}} />);
			expect(useLayoutEffect.mock.calls[0]).toEqual([
				anyFunction,
				[
					'labels',
					null,
					undefined,
					null,
					1,
					identity,
					true,
					getDefaultClass,
					getDefaultClass,
					getDefaultClass,
					anyFunction,
					true,
					'Group',
					'labels-hint',
					'linear-hint',
					'linear',
					'linear-tick',
					undefined,
					undefined,
					true,
					0.3,
					true,
					4,
					{
						groupIndex: new Map(),
					},
				],
			]);

			expect(useLayoutEffect.mock.calls[0][0]()).toBeUndefined();

			expect(drawLoadingGrid.mock.calls).toEqual([[current, 400, 300]]);
		});

		it('adds an effect which calls addResizeObserver', () => {
			const current = {foo: 'test'};
			const draw = jest.fn();
			useRef.mockReturnValueOnce({current}).mockReturnValueOnce({current: draw}).mockReturnValueOnce({});
			shallow(<ScatterChart data={[]} />);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, []]);

			expect(useEffect.mock.calls[0][0]()).toBe('addResizeObserver');
			expect(addResizeObserver.mock.calls).toEqual([[current, anyFunction]]);

			addResizeObserver.mock.calls[0][1]('test-rect');
			expect(draw.mock.calls).toEqual([['test-rect']]);
		});
	});
});
