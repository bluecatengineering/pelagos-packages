import {shallow} from 'enzyme';
import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {scaleQuantize} from 'd3-scale';
import {select} from 'd3-selection';
import {stack} from 'd3-shape';
import identity from 'lodash-es/identity';
import {addResizeObserver, useRandomId} from '@bluecateng/pelagos';

import StackedBarChart from '../../src/charts/StackedBarChart';
import getDefaultClass from '../../src/charts/getDefaultClass';
import getColorVariant from '../../src/charts/getColorVariant';
import getColorClass from '../../src/charts/getColorClass';
import getPlotBottom from '../../src/charts/getPlotBottom';
import createScale from '../../src/charts/createScale';
import getTicks from '../../src/charts/getTicks';
import drawLeftAxis from '../../src/charts/drawLeftAxis';
import drawBottomAxis from '../../src/charts/drawBottomAxis';
import drawGrid from '../../src/charts/drawGrid';
import updateHint from '../../src/charts/updateHint';
import MultiHint from '../../src/charts/MultiHint';
import extendDomain from '../../src/charts/extendDomain';
import extractStackDataFromTidy from '../../src/charts/extractStackDataFromTidy';
import drawLoadingGrid from '../../src/charts/drawLoadingGrid';

jest.unmock('../../src/charts/StackedBarChart');

jest.mock('../../src/charts/hintFormatters', () => ({
	labels: 'labels-hint',
	linear: 'linear-hint',
	log: 'log-hint',
	time: 'time-hint',
}));
jest.mock('../../src/charts/tickFormatters', () => ({
	labels: null,
	linear: 'linear-tick',
	log: 'log-tick',
	time: 'time-tick',
}));

const anyFunction = expect.any(Function);

const stackFn = stack();

useRandomId.mockReturnValue('random-id');
addResizeObserver.mockReturnValue('addResizeObserver');
getDefaultClass.mockReturnValue('getDefaultClass');
getColorClass.mockReturnValue('getColorClass');
getColorVariant.mockReturnValue('getColorVariant');

describe('StackedBarChart', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			extractStackDataFromTidy.mockReturnValueOnce({groupIndex: new Map([['a', []]])});
			stackFn.mockReturnValueOnce([]);
			const wrapper = shallow(<StackedBarChart data={[]} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			useState.mockReturnValueOnce([{visible: true, style: 'test-style', content: 'test-hint'}]);
			extractStackDataFromTidy.mockReturnValueOnce({});
			stackFn.mockReturnValueOnce([]);
			const wrapper = shallow(<StackedBarChart className="TestClass" data={[]} legend={{order: ['a']}} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when data loading is set', () => {
			const wrapper = shallow(<StackedBarChart dataOptions={{loading: true}} />);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(extractStackDataFromTidy.mock.calls).toEqual([]);
		});
	});

	describe('behaviour', () => {
		it('adds an effect which renders the chart', () => {
			const data = [
				{group: 'a', key: 'foo', value: 8},
				{group: 'a', key: 'bar', value: 1},
				{group: 'b', key: 'foo', value: 5},
				{group: 'b', key: 'bar', value: null},
			];
			const onClick = jest.fn();
			const setAttribute = jest.fn();
			const setHintData = jest.fn();
			const current = {
				childNodes: [
					{id: '0'},
					{id: '1', firstChild: {}, lastChild: {}},
					{id: '2'},
					{id: '3'},
					{id: '4', style: {}, setAttribute},
				],
				parentNode: {getBoundingClientRect: () => ({left: 20, top: 10, width: 400, height: 320})},
				getBoundingClientRect: () => ({left: 20, top: 10, width: 400, height: 300}),
			};
			const leftScale = jest.fn().mockReturnValueOnce(200).mockReturnValueOnce(150);
			const bottomScale = jest.fn().mockReturnValueOnce(45).mockReturnValueOnce(45);
			bottomScale.step = jest.fn().mockReturnValue(100);
			bottomScale.range = jest.fn().mockReturnValue([38, 400]);
			const leftTicks = [1, 5, 8];
			const series = [
				[
					[0, 8],
					[8, 13],
				],
				[[0, 1]],
			];
			const stackData = new Map();
			const groupSet = new Set(['a', 'b']);
			const groupIndex = new Map([
				['a', 0],
				['b', 1],
			]);
			const hintValues = new Map([
				[
					'foo',
					[
						['a', 8],
						['b', 5],
					],
				],
				['bar', [['a', 1]]],
			]);
			const labelSet = new Set(['foo', 'bar']);
			const leftDomain = [0, 14.3];
			const zero = {
				selectAll: jest.fn().mockReturnThis(),
				data: jest.fn().mockReturnThis(),
				join: jest.fn().mockReturnThis(),
				attr: jest.fn().mockReturnThis(),
			};
			const bars = {
				selectAll: jest.fn().mockReturnThis(),
				data: jest.fn().mockReturnThis(),
				join: jest.fn().mockReturnThis(),
				attr: jest.fn().mockReturnThis(),
			};
			const grid = {on: jest.fn().mockReturnThis()};
			const quantize = Object.assign(
				jest.fn().mockReturnValueOnce('foo').mockReturnValueOnce('foo').mockReturnValueOnce('foo'),
				{
					domain: jest.fn().mockReturnThis(),
					range: jest.fn().mockReturnThis(),
				}
			);
			useRef.mockReturnValueOnce({current}).mockReturnValueOnce({}).mockReturnValueOnce({});
			useState.mockReturnValueOnce([{}, setHintData]);
			extractStackDataFromTidy.mockReturnValueOnce({stackData, groupSet, groupIndex, hintValues, labelSet});
			extendDomain.mockReturnValueOnce(leftDomain);
			stackFn.mockReturnValueOnce(series);
			getPlotBottom.mockReturnValueOnce(262);
			createScale.mockReturnValueOnce(leftScale).mockReturnValueOnce(bottomScale);
			getTicks.mockReturnValueOnce(leftTicks).mockReturnValueOnce(labelSet);
			drawLeftAxis.mockReturnValueOnce(38);
			select.mockReturnValueOnce(zero).mockReturnValueOnce(bars).mockReturnValueOnce(grid);
			scaleQuantize.mockReturnValueOnce(quantize);
			shallow(<StackedBarChart data={data} onClick={onClick} />);
			expect(extractStackDataFromTidy.mock.calls).toEqual([[data, undefined, 'group', 'key', 'value']]);
			expect(stackFn.keys.mock.calls).toEqual([[groupSet]]);
			expect(stackFn.value.mock.calls).toEqual([[anyFunction]]);
			expect(stackFn.order.mock.calls).toEqual([['stackOrderNone']]);
			expect(stackFn.offset.mock.calls).toEqual([['stackOffsetNone']]);
			expect(stackFn.value.mock.calls[0][0]([null, new Map([['a', 8]])], 'a')).toBe(8);
			expect(stackFn.value.mock.calls[0][0]([null, new Map([])], 'a')).toBe(0);

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
					true,
					'labels-hint',
					true,
					'x',
					'Total',
					'linear-hint',
					'linear',
					'linear-tick',
					undefined,
					onClick,
					{series, groupIndex, hintValues, labelSet, leftDomain, bottomDomain: labelSet},
					true,
				],
			]);
			expect(useLayoutEffect.mock.calls[0][0]()).toBeUndefined();
			expect(extendDomain.mock.calls).toEqual([[[0, 13]]]);
			expect(getColorVariant.mock.calls).toEqual([[null, 2]]);
			expect(getPlotBottom.mock.calls).toEqual([[300, undefined]]);
			expect(createScale.mock.calls).toEqual([
				['linear', leftDomain, [262, 0], 0.5],
				['labels', labelSet, [38, 400], 0.5],
			]);
			expect(getTicks.mock.calls).toEqual([
				[leftScale, 3.75],
				[bottomScale, 5],
			]);
			expect(drawLeftAxis.mock.calls).toEqual([
				[current.childNodes[1].firstChild, leftScale, undefined, 3.75, leftTicks, 'linear-tick', 262],
			]);
			expect(drawBottomAxis.mock.calls).toEqual([
				[current.childNodes[1].lastChild, bottomScale, undefined, 5, labelSet, null, 400, 300, 262, 38],
			]);
			expect(drawGrid.mock.calls).toEqual([
				[current.childNodes[0], leftTicks, leftScale, labelSet, bottomScale, 400, 38, 262],
			]);
			expect(select.mock.calls).toEqual([[current.childNodes[3]], [current.childNodes[2]], [current.childNodes[0]]]);

			expect(zero.selectAll.mock.calls).toEqual([['line']]);
			expect(zero.data.mock.calls).toEqual([[[]]]);
			expect(zero.join.mock.calls).toEqual([['line']]);
			expect(zero.attr.mock.calls).toEqual([
				['x1', 38],
				['x2', 400],
				['y1', 0],
				['y2', 0],
			]);

			expect(bottomScale.step.mock.calls).toEqual([[]]);
			expect(bars.selectAll.mock.calls).toEqual([['g'], ['path']]);
			expect(bars.data.mock.calls).toEqual([[series], [anyFunction]]);
			expect(bars.join.mock.calls).toEqual([['g'], ['path']]);
			expect(bars.attr.mock.calls).toEqual([
				['class', anyFunction],
				['d', anyFunction],
				['role', 'graphics-symbol'],
				['aria-roledescription', 'bar'],
				['aria-label', anyFunction],
			]);
			const D = [{data: ['foo', new Map([['b', 5]])]}, {data: ['bar', new Map([])]}];
			D.key = 'b';
			const d = {data: ['foo', new Map([['b', 5]])], group: 'b'};
			expect(bars.data.mock.calls[1][0](D)).toEqual([d]);
			expect(bars.attr.mock.calls[0][1]({key: 'a'})).toBe('getDefaultClass');
			expect(bars.attr.mock.calls[1][1](Object.assign([8, 13], {data: ['foo']}))).toBe('m21,150h48v50h-48z');
			expect(bars.attr.mock.calls[4][1](d)).toBe('b, foo, 5');

			expect(scaleQuantize.mock.calls).toEqual([[]]);
			expect(quantize.domain.mock.calls).toEqual([[[38, 400]]]);
			expect(quantize.range.mock.calls).toEqual([[labelSet]]);

			expect(grid.on.mock.calls).toEqual([
				['click', anyFunction],
				['mousemove', anyFunction],
				['mouseleave', anyFunction],
			]);

			grid.on.mock.calls[0][1]({clientX: 65, clientY: 100});
			expect(onClick.mock.calls).toEqual([['foo']]);

			grid.on.mock.calls[1][1]({clientX: 65, clientY: 100});
			grid.on.mock.calls[1][1]({clientX: 75, clientY: 90});
			expect(updateHint.mock.calls).toEqual([
				[
					true,
					45,
					90,
					400,
					320,
					45,
					24,
					400,
					38,
					262,
					setHintData,
					// eslint-disable-next-line react/jsx-key -- unit test
					<MultiHint
						title="x"
						headerValue="foo"
						values={[
							['a', 8],
							['b', 5],
						]}
						groupIndex={groupIndex}
						showTotal={true}
						totalLabel="Total"
						headerFormatter="labels-hint"
						groupFormatter={identity}
						valueFormatter="linear-hint"
						getBgClass={anyFunction}
						variant="getColorVariant"
						option={1}
					/>,
					current.childNodes[4],
				],
				[
					true,
					55,
					80,
					400,
					320,
					45,
					24,
					400,
					38,
					262,
					setHintData,
					// eslint-disable-next-line react/jsx-key -- unit test
					<MultiHint
						title="x"
						headerValue="foo"
						values={[
							['a', 8],
							['b', 5],
						]}
						groupIndex={groupIndex}
						showTotal={true}
						totalLabel="Total"
						headerFormatter="labels-hint"
						groupFormatter={identity}
						valueFormatter="linear-hint"
						getBgClass={anyFunction}
						variant="getColorVariant"
						option={1}
					/>,
					current.childNodes[4],
				],
			]);
			expect(setAttribute.mock.calls).toEqual([
				['y2', 262],
				['x1', 45],
				['x2', 45],
			]);

			grid.on.mock.calls[2][1]();
			expect(current.childNodes[4].style.opacity).toBe(0);
			expect(setHintData.mock.calls).toEqual([[anyFunction]]);
			expect(setHintData.mock.calls[0][0]({foo: 'test'})).toEqual({foo: 'test', visible: false});

			expect(leftScale.mock.calls).toEqual([[8], [13]]);
			expect(bottomScale.mock.calls).toEqual([['foo'], ['foo']]);
			expect(quantize.mock.calls).toEqual([[45], [45], [55]]);

			expect(getDefaultClass.mock.calls).toEqual([['a', null, null, 'getColorClass']]);
			expect(getColorClass.mock.calls).toEqual([['fill', 'getColorVariant', 1, 0]]);
		});

		it('adds an effect which renders the chart when min is negative', () => {
			const setAttribute = jest.fn();
			const current = {
				childNodes: [
					{id: '0'},
					{id: '1', firstChild: {}, lastChild: {}},
					{id: '2'},
					{id: '3'},
					{id: '4', style: {}, setAttribute},
				],
				getBoundingClientRect: () => ({left: 20, top: 10, width: 400, height: 300}),
			};
			const leftScale = jest.fn().mockReturnValueOnce(250);
			const bottomScale = jest.fn();
			bottomScale.step = jest.fn().mockReturnValue(100);
			bottomScale.range = jest.fn().mockReturnValue([38, 400]);
			const leftTicks = [-1, 5, 8];
			const series = [
				[
					[0, 8],
					[8, 13],
				],
				[[-1, 0]],
			];
			const stackData = new Map();
			const groupSet = new Set();
			const groupIndex = new Map([
				['a', 0],
				['b', 1],
			]);
			const hintValues = new Map([
				[
					'foo',
					[
						['a', 8],
						['b', 5],
					],
				],
				['bar', [['a', -1]]],
			]);
			const labelSet = new Set(['foo', 'bar']);
			const leftDomain = [-1.4, 14.3];
			const zero = {
				selectAll: jest.fn().mockReturnThis(),
				data: jest.fn().mockReturnThis(),
				join: jest.fn().mockReturnThis(),
				attr: jest.fn().mockReturnThis(),
			};
			const bars = {
				selectAll: jest.fn().mockReturnThis(),
				data: jest.fn().mockReturnThis(),
				join: jest.fn().mockReturnThis(),
				attr: jest.fn().mockReturnThis(),
			};
			const grid = {on: jest.fn().mockReturnThis()};
			const quantize = Object.assign(jest.fn(), {
				domain: jest.fn().mockReturnThis(),
				range: jest.fn().mockReturnThis(),
			});
			useRef.mockReturnValueOnce({current}).mockReturnValueOnce({}).mockReturnValueOnce({});
			extractStackDataFromTidy.mockReturnValueOnce({stackData, groupSet, groupIndex, hintValues, labelSet});
			extendDomain.mockReturnValueOnce(leftDomain);
			stackFn.mockReturnValueOnce(series);
			getPlotBottom.mockReturnValueOnce(262);
			createScale.mockReturnValueOnce(leftScale).mockReturnValueOnce(bottomScale);
			getTicks.mockReturnValueOnce(leftTicks).mockReturnValueOnce(labelSet);
			drawLeftAxis.mockReturnValueOnce(38);
			select.mockReturnValueOnce(zero).mockReturnValueOnce(bars).mockReturnValueOnce(grid);
			scaleQuantize.mockReturnValueOnce(quantize);
			shallow(
				<StackedBarChart
					data={[
						{group: 'a', key: 'foo', value: 8},
						{group: 'a', key: 'bar', value: -1},
						{group: 'b', key: 'foo', value: 5},
						{group: 'b', key: 'bar', value: null},
					]}
				/>
			);

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
					true,
					'labels-hint',
					true,
					'x',
					'Total',
					'linear-hint',
					'linear',
					'linear-tick',
					undefined,
					undefined,
					{series, groupIndex, hintValues, labelSet, leftDomain, bottomDomain: labelSet},
					true,
				],
			]);
			expect(useLayoutEffect.mock.calls[0][0]()).toBeUndefined();

			expect(zero.selectAll.mock.calls).toEqual([['line']]);
			expect(zero.data.mock.calls).toEqual([[[1]]]);
			expect(zero.join.mock.calls).toEqual([['line']]);
			expect(zero.attr.mock.calls).toEqual([
				['x1', 38],
				['x2', 400],
				['y1', 250],
				['y2', 250],
			]);

			expect(leftScale.mock.calls).toEqual([[0]]);
			expect(bottomScale.mock.calls).toEqual([]);
			expect(quantize.mock.calls).toEqual([]);
		});

		it('adds an effect which renders the chart when leftScaleType is labels', () => {
			const onClick = jest.fn();
			const setAttribute = jest.fn();
			const setHintData = jest.fn();
			const current = {
				childNodes: [
					{id: '0'},
					{id: '1', firstChild: {}, lastChild: {}},
					{id: '2'},
					{id: '3'},
					{id: '4', style: {}, setAttribute},
				],
				parentNode: {getBoundingClientRect: () => ({left: 20, top: 10, width: 400, height: 320})},
				getBoundingClientRect: () => ({left: 20, top: 10, width: 400, height: 300}),
			};
			const leftScale = jest.fn().mockReturnValueOnce(45).mockReturnValueOnce(45);
			leftScale.step = jest.fn().mockReturnValue(100);
			leftScale.range = jest.fn().mockReturnValue([38, 400]);
			const bottomScale = jest.fn().mockReturnValueOnce(200).mockReturnValueOnce(150);
			const leftTicks = [1, 5, 8];
			const series = [
				[
					[0, 8],
					[8, 13],
				],
				[[0, 1]],
			];
			const stackData = new Map();
			const groupSet = new Set();
			const groupIndex = new Map([
				['a', 0],
				['b', 1],
			]);
			const hintValues = new Map([
				[
					'foo',
					[
						['a', 8],
						['b', 5],
					],
				],
				['bar', [['a', 1]]],
			]);
			const labelSet = new Set(['foo', 'bar']);
			const bottomDomain = [0, 14.3];
			const zero = {
				selectAll: jest.fn().mockReturnThis(),
				data: jest.fn().mockReturnThis(),
				join: jest.fn().mockReturnThis(),
				attr: jest.fn().mockReturnThis(),
			};
			const bars = {
				selectAll: jest.fn().mockReturnThis(),
				data: jest.fn().mockReturnThis(),
				join: jest.fn().mockReturnThis(),
				attr: jest.fn().mockReturnThis(),
			};
			const grid = {on: jest.fn().mockReturnThis()};
			const quantize = Object.assign(jest.fn().mockReturnValueOnce('foo').mockReturnValueOnce('foo'), {
				domain: jest.fn().mockReturnThis(),
				range: jest.fn().mockReturnThis(),
			});
			useRef.mockReturnValueOnce({current}).mockReturnValueOnce({}).mockReturnValueOnce({});
			useState.mockReturnValueOnce([{}, setHintData]);
			extractStackDataFromTidy.mockReturnValueOnce({stackData, groupSet, groupIndex, hintValues, labelSet});
			extendDomain.mockReturnValueOnce(bottomDomain);
			stackFn.mockReturnValueOnce(series);
			getPlotBottom.mockReturnValueOnce(262);
			createScale.mockReturnValueOnce(leftScale).mockReturnValueOnce(bottomScale);
			getTicks.mockReturnValueOnce(leftTicks).mockReturnValueOnce(labelSet);
			drawLeftAxis.mockReturnValueOnce(38);
			select.mockReturnValueOnce(zero).mockReturnValueOnce(bars).mockReturnValueOnce(grid);
			scaleQuantize.mockReturnValueOnce(quantize);
			shallow(
				<StackedBarChart
					data={[
						{group: 'a', key: 'foo', value: 8},
						{group: 'a', key: 'bar', value: 1},
						{group: 'b', key: 'foo', value: 5},
						{group: 'b', key: 'bar', value: null},
					]}
					bottomAxis={{scaleType: 'linear', mapsTo: 'value'}}
					leftAxis={{scaleType: 'labels', mapsTo: 'key'}}
					onClick={onClick}
				/>
			);

			expect(useLayoutEffect.mock.calls[0]).toEqual([
				anyFunction,
				[
					'linear',
					'linear-tick',
					undefined,
					null,
					1,
					identity,
					false,
					getDefaultClass,
					getDefaultClass,
					true,
					'labels-hint',
					true,
					'y',
					'Total',
					'linear-hint',
					'labels',
					null,
					undefined,
					onClick,
					{series, groupIndex, hintValues, labelSet, leftDomain: labelSet, bottomDomain},
					false,
				],
			]);
			expect(useLayoutEffect.mock.calls[0][0]()).toBeUndefined();
			expect(extendDomain.mock.calls).toEqual([[[0, 13]]]);

			expect(zero.selectAll.mock.calls).toEqual([['line']]);
			expect(zero.data.mock.calls).toEqual([[[]]]);
			expect(zero.join.mock.calls).toEqual([['line']]);
			expect(zero.attr.mock.calls).toEqual([
				['x1', 0],
				['x2', 0],
				['y1', 0],
				['y2', 262],
			]);

			expect(leftScale.step.mock.calls).toEqual([[]]);
			expect(bars.selectAll.mock.calls).toEqual([['g'], ['path']]);
			expect(bars.data.mock.calls).toEqual([[series], [anyFunction]]);
			expect(bars.join.mock.calls).toEqual([['g'], ['path']]);
			expect(bars.attr.mock.calls).toEqual([
				['class', anyFunction],
				['d', anyFunction],
				['role', 'graphics-symbol'],
				['aria-roledescription', 'bar'],
				['aria-label', anyFunction],
			]);
			expect(bars.attr.mock.calls[1][1](Object.assign([8, 13], {data: ['foo']}))).toBe('m150,21v48h50v-48z');

			expect(scaleQuantize.mock.calls).toEqual([[]]);
			expect(quantize.domain.mock.calls).toEqual([[[400, 38]]]);
			expect(quantize.range.mock.calls).toEqual([[['bar', 'foo']]]);

			expect(grid.on.mock.calls).toEqual([
				['click', anyFunction],
				['mousemove', anyFunction],
				['mouseleave', anyFunction],
			]);

			grid.on.mock.calls[0][1]({clientX: 65, clientY: 100});
			expect(onClick.mock.calls).toEqual([['foo']]);

			grid.on.mock.calls[1][1]({clientX: 65, clientY: 100});
			expect(updateHint.mock.calls).toEqual([
				[
					false,
					45,
					90,
					400,
					320,
					45,
					24,
					400,
					38,
					262,
					setHintData,
					// eslint-disable-next-line react/jsx-key -- unit test
					<MultiHint
						title="y"
						headerValue="foo"
						values={[
							['a', 8],
							['b', 5],
						]}
						groupIndex={groupIndex}
						showTotal={true}
						totalLabel="Total"
						headerFormatter="labels-hint"
						groupFormatter={identity}
						valueFormatter="linear-hint"
						getBgClass={anyFunction}
						variant="getColorVariant"
						option={1}
					/>,
					current.childNodes[4],
				],
			]);
			expect(setAttribute.mock.calls).toEqual([
				['x1', 38],
				['x2', 400],
				['y1', 45],
				['y2', 45],
			]);

			expect(leftScale.mock.calls).toEqual([['foo'], ['foo']]);
			expect(bottomScale.mock.calls).toEqual([[8], [13]]);
			expect(quantize.mock.calls).toEqual([[90], [90]]);
		});

		it('adds an effect which renders the chart when leftScaleType is labels and min is negative', () => {
			const setAttribute = jest.fn();
			const current = {
				childNodes: [
					{id: '0'},
					{id: '1', firstChild: {}, lastChild: {}},
					{id: '2'},
					{id: '3'},
					{id: '4', style: {}, setAttribute},
				],
				getBoundingClientRect: () => ({left: 20, top: 10, width: 400, height: 300}),
			};
			const leftScale = jest.fn();
			leftScale.step = jest.fn().mockReturnValue(100);
			leftScale.range = jest.fn().mockReturnValue([38, 400]);
			const bottomScale = jest.fn().mockReturnValueOnce(250);
			const leftTicks = [-1, 5, 8];
			const series = [
				[
					[0, 8],
					[8, 13],
				],
				[[-1, 0]],
			];
			const stackData = new Map();
			const groupSet = new Set();
			const groupIndex = new Map([
				['a', 0],
				['b', 1],
			]);
			const hintValues = new Map([
				[
					'foo',
					[
						['a', 8],
						['b', 5],
					],
				],
				['bar', [['a', -1]]],
			]);
			const labelSet = new Set(['foo', 'bar']);
			const bottomDomain = [-1.1, 14.3];
			const zero = {
				selectAll: jest.fn().mockReturnThis(),
				data: jest.fn().mockReturnThis(),
				join: jest.fn().mockReturnThis(),
				attr: jest.fn().mockReturnThis(),
			};
			const bars = {
				selectAll: jest.fn().mockReturnThis(),
				data: jest.fn().mockReturnThis(),
				join: jest.fn().mockReturnThis(),
				attr: jest.fn().mockReturnThis(),
			};
			const grid = {on: jest.fn().mockReturnThis()};
			const quantize = Object.assign(jest.fn(), {
				domain: jest.fn().mockReturnThis(),
				range: jest.fn().mockReturnThis(),
			});
			useRef.mockReturnValueOnce({current}).mockReturnValueOnce({}).mockReturnValueOnce({});
			extractStackDataFromTidy.mockReturnValueOnce({stackData, groupSet, groupIndex, hintValues, labelSet});
			extendDomain.mockReturnValueOnce(bottomDomain);
			stackFn.mockReturnValueOnce(series);
			getPlotBottom.mockReturnValueOnce(262);
			createScale.mockReturnValueOnce(leftScale).mockReturnValueOnce(bottomScale);
			getTicks.mockReturnValueOnce(leftTicks).mockReturnValueOnce(labelSet);
			drawLeftAxis.mockReturnValueOnce(38);
			select.mockReturnValueOnce(zero).mockReturnValueOnce(bars).mockReturnValueOnce(grid);
			scaleQuantize.mockReturnValueOnce(quantize);
			shallow(
				<StackedBarChart
					data={[
						{group: 'a', key: 'foo', value: 8},
						{group: 'a', key: 'bar', value: -1},
						{group: 'b', key: 'foo', value: 5},
						{group: 'b', key: 'bar', value: null},
					]}
					bottomAxis={{scaleType: 'linear', mapsTo: 'value'}}
					leftAxis={{scaleType: 'labels', mapsTo: 'key'}}
				/>
			);

			expect(useLayoutEffect.mock.calls[0]).toEqual([
				anyFunction,
				[
					'linear',
					'linear-tick',
					undefined,
					null,
					1,
					identity,
					false,
					getDefaultClass,
					getDefaultClass,
					true,
					'labels-hint',
					true,
					'y',
					'Total',
					'linear-hint',
					'labels',
					null,
					undefined,
					undefined,
					{series, groupIndex, hintValues, labelSet, leftDomain: labelSet, bottomDomain},
					false,
				],
			]);
			expect(useLayoutEffect.mock.calls[0][0]()).toBeUndefined();
			expect(extendDomain.mock.calls).toEqual([[[-1, 13]]]);

			expect(zero.selectAll.mock.calls).toEqual([['line']]);
			expect(zero.data.mock.calls).toEqual([[[1]]]);
			expect(zero.join.mock.calls).toEqual([['line']]);
			expect(zero.attr.mock.calls).toEqual([
				['x1', 250],
				['x2', 250],
				['y1', 0],
				['y2', 262],
			]);

			expect(leftScale.mock.calls).toEqual([]);
			expect(bottomScale.mock.calls).toEqual([[0]]);
			expect(quantize.mock.calls).toEqual([]);
		});

		it('adds an effect which renders the chart when alternate options are specified', () => {
			const data = [
				{group: 'a', key: 'foo', value: 8},
				{group: 'a', key: 'bar', value: 1},
				{group: 'b', key: 'foo', value: 5},
				{group: 'b', key: 'bar', value: null},
			];
			const setAttribute = jest.fn();
			const current = {
				childNodes: [
					{id: '0'},
					{id: '1', firstChild: {}, lastChild: {}},
					{id: '2'},
					{id: '3'},
					{id: '4', style: {}, setAttribute},
				],
				getBoundingClientRect: () => ({left: 20, top: 10, width: 400, height: 300}),
			};
			const leftScale = jest.fn();
			const bottomScale = jest.fn();
			bottomScale.step = jest.fn().mockReturnValue(100);
			bottomScale.range = jest.fn().mockReturnValue([38, 400]);
			const leftTicks = [1, 5, 8];
			const series = [
				[
					[0, 8],
					[8, 13],
				],
				[[0, 1]],
			];
			const stackData = new Map();
			const groupSet = new Set();
			const groupIndex = new Map([
				['a', 0],
				['b', 1],
			]);
			const hintValues = new Map([
				['foo', [['a', 8]]],
				['bar', [['a', 1]]],
			]);
			const labelSet = new Set(['foo', 'bar']);
			const zero = {
				selectAll: jest.fn().mockReturnThis(),
				data: jest.fn().mockReturnThis(),
				join: jest.fn().mockReturnThis(),
				attr: jest.fn().mockReturnThis(),
			};
			const bars = {
				selectAll: jest.fn().mockReturnThis(),
				data: jest.fn().mockReturnThis(),
				join: jest.fn().mockReturnThis(),
				attr: jest.fn().mockReturnThis(),
			};
			const grid = {on: jest.fn().mockReturnThis()};
			const quantize = Object.assign(jest.fn(), {
				domain: jest.fn().mockReturnThis(),
				range: jest.fn().mockReturnThis(),
			});
			useRef.mockReturnValueOnce({current}).mockReturnValueOnce({}).mockReturnValueOnce({});
			extractStackDataFromTidy.mockReturnValueOnce({stackData, groupSet, groupIndex, hintValues, labelSet});
			stackFn.mockReturnValueOnce(series);
			getPlotBottom.mockReturnValueOnce(262);
			createScale.mockReturnValueOnce(leftScale).mockReturnValueOnce(bottomScale);
			getTicks.mockReturnValueOnce(leftTicks).mockReturnValueOnce(labelSet);
			drawLeftAxis.mockReturnValueOnce(38);
			select.mockReturnValueOnce(zero).mockReturnValueOnce(bars).mockReturnValueOnce(grid);
			scaleQuantize.mockReturnValueOnce(quantize);
			shallow(
				<StackedBarChart
					data={data}
					dataOptions={{groupFormatter: 'test-formatter', selectedGroups: ['a']}}
					color={{pairing: {groupCount: 5, option: 2}}}
					bottomAxis={{domain: 'test-bottom-domain', title: 'Bottom title'}}
					leftAxis={{domain: [1, 15], scaleType: 'linear', title: 'Left title'}}
					hint={{enabled: false, headerFormatter: 'test-header-formatter', valueFormatter: 'test-value-formatter'}}
				/>
			);
			expect(extractStackDataFromTidy.mock.calls).toEqual([[data, ['a'], 'group', 'key', 'value']]);

			expect(useLayoutEffect.mock.calls[0]).toEqual([
				anyFunction,
				[
					'labels',
					null,
					'Bottom title',
					5,
					2,
					'test-formatter',
					false,
					getDefaultClass,
					getDefaultClass,
					false,
					'test-header-formatter',
					true,
					'Bottom title',
					'Total',
					'test-value-formatter',
					'linear',
					'linear-tick',
					'Left title',
					undefined,
					{series, groupIndex, hintValues, labelSet, leftDomain: [1, 15], bottomDomain: 'test-bottom-domain'},
					true,
				],
			]);
			expect(useLayoutEffect.mock.calls[0][0]()).toBeUndefined();
			expect(extendDomain.mock.calls).toEqual([]);

			expect(zero.selectAll.mock.calls).toEqual([['line']]);
			expect(zero.data.mock.calls).toEqual([[[]]]);
			expect(zero.join.mock.calls).toEqual([['line']]);
			expect(zero.attr.mock.calls).toEqual([
				['x1', 38],
				['x2', 400],
				['y1', 0],
				['y2', 0],
			]);

			expect(grid.on.mock.calls).toEqual([
				['click', null],
				['mousemove', null],
				['mouseleave', null],
			]);

			expect(leftScale.mock.calls).toEqual([]);
			expect(bottomScale.mock.calls).toEqual([]);
			expect(quantize.mock.calls).toEqual([]);
		});

		it('adds an effect which renders the chart when data is empty', () => {
			const setAttribute = jest.fn();
			const current = {
				childNodes: [
					{id: '0'},
					{id: '1', firstChild: {}, lastChild: {}},
					{id: '2'},
					{id: '3'},
					{id: '4', style: {}, setAttribute},
				],
				getBoundingClientRect: () => ({left: 20, top: 10, width: 400, height: 300}),
			};
			const leftScale = jest.fn();
			const bottomScale = jest.fn();
			bottomScale.step = jest.fn().mockReturnValue(100);
			bottomScale.range = jest.fn().mockReturnValue([38, 400]);
			const leftTicks = [];
			const series = [];
			const stackData = new Map();
			const groupSet = new Set();
			const groupIndex = new Map([]);
			const hintValues = new Map([]);
			const labelSet = new Set([]);
			const leftDomain = [0, 0];
			const zero = {
				selectAll: jest.fn().mockReturnThis(),
				data: jest.fn().mockReturnThis(),
				join: jest.fn().mockReturnThis(),
				attr: jest.fn().mockReturnThis(),
			};
			const bars = {
				selectAll: jest.fn().mockReturnThis(),
				data: jest.fn().mockReturnThis(),
				join: jest.fn().mockReturnThis(),
				attr: jest.fn().mockReturnThis(),
			};
			const grid = {on: jest.fn().mockReturnThis()};
			const quantize = Object.assign(jest.fn(), {
				domain: jest.fn().mockReturnThis(),
				range: jest.fn().mockReturnThis(),
			});
			useRef.mockReturnValueOnce({current}).mockReturnValueOnce({}).mockReturnValueOnce({});
			extractStackDataFromTidy.mockReturnValueOnce({stackData, groupSet, groupIndex, hintValues, labelSet});
			extendDomain.mockReturnValueOnce(leftDomain);
			stackFn.mockReturnValueOnce(series);
			getPlotBottom.mockReturnValueOnce(262);
			createScale.mockReturnValueOnce(leftScale).mockReturnValueOnce(bottomScale);
			getTicks.mockReturnValueOnce(leftTicks).mockReturnValueOnce(labelSet);
			drawLeftAxis.mockReturnValueOnce(38);
			select.mockReturnValueOnce(zero).mockReturnValueOnce(bars).mockReturnValueOnce(grid);
			scaleQuantize.mockReturnValueOnce(quantize);
			shallow(<StackedBarChart data={[]} />);

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
					true,
					'labels-hint',
					true,
					'x',
					'Total',
					'linear-hint',
					'linear',
					'linear-tick',
					undefined,
					undefined,
					{series, groupIndex, hintValues, labelSet, leftDomain, bottomDomain: labelSet},
					true,
				],
			]);
			expect(useLayoutEffect.mock.calls[0][0]()).toBeUndefined();
			expect(extendDomain.mock.calls).toEqual([[[0, 0]]]);

			expect(zero.selectAll.mock.calls).toEqual([['line']]);
			expect(zero.data.mock.calls).toEqual([[[]]]);
			expect(zero.join.mock.calls).toEqual([['line']]);
			expect(zero.attr.mock.calls).toEqual([
				['x1', 38],
				['x2', 400],
				['y1', 0],
				['y2', 0],
			]);

			expect(bottomScale.step.mock.calls).toEqual([[]]);
			expect(bars.selectAll.mock.calls).toEqual([['g'], ['path']]);
			expect(bars.data.mock.calls).toEqual([[series], [anyFunction]]);
			expect(bars.join.mock.calls).toEqual([['g'], ['path']]);
			expect(bars.attr.mock.calls).toEqual([
				['class', anyFunction],
				['d', anyFunction],
				['role', 'graphics-symbol'],
				['aria-roledescription', 'bar'],
				['aria-label', anyFunction],
			]);

			expect(grid.on.mock.calls).toEqual([
				['click', null],
				['mousemove', null],
				['mouseleave', null],
			]);

			expect(setAttribute.mock.calls).toEqual([['y2', 262]]);

			expect(leftScale.mock.calls).toEqual([]);
			expect(bottomScale.mock.calls).toEqual([]);
			expect(quantize.mock.calls).toEqual([]);
		});

		it('adds an effect which renders the chart when data loading is set', () => {
			const current = {
				getBoundingClientRect: () => ({left: 20, top: 10, width: 400, height: 300}),
			};
			useRef.mockReturnValueOnce({current}).mockReturnValueOnce({}).mockReturnValueOnce({});
			shallow(<StackedBarChart dataOptions={{loading: true}} />);

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
					true,
					'labels-hint',
					true,
					'x',
					'Total',
					'linear-hint',
					'linear',
					'linear-tick',
					undefined,
					undefined,
					{groupIndex: new Map()},
					true,
				],
			]);
			expect(useLayoutEffect.mock.calls[0][0]()).toBeUndefined();

			expect(drawLoadingGrid.mock.calls).toEqual([[current, 400, 300]]);
		});

		it('adds an effect which calls addResizeObserver', () => {
			const current = {foo: 'test'};
			const draw = jest.fn();
			useRef.mockReturnValueOnce({current}).mockReturnValueOnce({current: draw}).mockReturnValueOnce({});
			extractStackDataFromTidy.mockReturnValueOnce({groupIndex: new Map()});
			stackFn.mockReturnValueOnce([]);
			shallow(<StackedBarChart data={[]} />);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, []]);

			expect(useEffect.mock.calls[0][0]()).toBe('addResizeObserver');
			expect(addResizeObserver.mock.calls).toEqual([[current, anyFunction]]);

			addResizeObserver.mock.calls[0][1]('test-rect');
			expect(draw.mock.calls).toEqual([['test-rect']]);
		});
	});
});
