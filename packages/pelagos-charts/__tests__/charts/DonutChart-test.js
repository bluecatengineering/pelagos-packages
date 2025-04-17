import {shallow} from 'enzyme';
import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {sum} from 'd3-array';
import {format} from 'd3-format';
import {select} from 'd3-selection';
import {arc, pie} from 'd3-shape';
import identity from 'lodash-es/identity';
import {addResizeObserver, Layer, useRandomId} from '@bluecateng/pelagos';

import DonutChart from '../../src/charts/DonutChart';
import getDefaultClass from '../../src/charts/getDefaultClass';
import getColorVariant from '../../src/charts/getColorVariant';
import getColorClass from '../../src/charts/getColorClass';
import setGradientParameters from '../../src/charts/setGradientParameters';

jest.unmock('../../src/charts/DonutChart');

jest.mock('d3-format', () => ({format: jest.fn((fmt) => jest.fn().mockReturnValue(`format-${fmt}`))}));

const {PI} = Math;

const anyFunction = expect.any(Function);

const siFormatter = format.mock.results[0].value;

const createPaths = () => ({
	selectAll: jest.fn().mockReturnThis(),
	data: jest.fn().mockReturnThis(),
	join: jest.fn().mockReturnThis(),
	attr: jest.fn().mockReturnThis(),
	on: jest.fn().mockReturnThis(),
});

useRandomId.mockReturnValue('random-id');
addResizeObserver.mockReturnValue('addResizeObserver');
getDefaultClass.mockReturnValue('getDefaultClass');
getColorClass.mockReturnValue('getColorClass');
getColorVariant.mockReturnValue('getColorVariant');

describe('DonutChart', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<DonutChart data={[]} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const data = [
				{group: 'a', value: 3},
				{group: 'b', value: 7},
			];
			useState.mockReturnValueOnce([{visible: true, content: 'test-hint'}]);
			const wrapper = shallow(
				<DonutChart
					className="TestClass"
					data={data}
					dataOptions={{selectedGroups: ['b']}}
					center={{label: 'Foo', number: 42}}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(siFormatter.mock.calls).toEqual([[42]]);
		});

		it('renders expected elements when data loading is set', () => {
			const wrapper = shallow(<DonutChart dataOptions={{loading: true}} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('adds an effect which renders the chart', () => {
			const onClick = jest.fn();
			const setHintData = jest.fn();
			const data = [
				{group: 'a', value: 3},
				{group: 'b', value: 7},
			];
			const pieData = [
				['a', 3, data[0]],
				['b', 7, data[1]],
			];
			const setAttribute = jest.fn();
			const wrapper = {setAttribute, firstChild: {id: 'first'}};
			const current = {firstChild: wrapper, getBoundingClientRect: () => ({width: 400, height: 300})};
			const arc0 = {data: pieData[0], index: 0};
			const arc1 = {data: pieData[1], index: 1};
			const arcFn = arc();
			const pieFn = pie();
			const paths = createPaths();
			useRef.mockReturnValueOnce({current}).mockReturnValueOnce({}).mockReturnValueOnce({});
			useState.mockReturnValueOnce([{}, setHintData]);
			sum.mockReturnValueOnce(10);
			arcFn.mockReturnValueOnce('d0');
			pieFn.mockReturnValueOnce([arc0, arc1]);
			select.mockReturnValueOnce(paths);
			shallow(<DonutChart data={data} onClick={onClick} />);
			expect(useLayoutEffect.mock.calls[0]).toEqual([
				anyFunction,
				[
					null,
					1,
					identity,
					false,
					getDefaultClass,
					'random-id-loading',
					true,
					siFormatter,
					onClick,
					{
						arcs: [arc0, arc1],
						groupIndex: new Map([
							['a', 0],
							['b', 1],
						]),
						empty: false,
					},
				],
			]);

			expect(useLayoutEffect.mock.calls[0][0]()).toBeUndefined();

			expect(getColorVariant.mock.calls).toEqual([[null, 2]]);
			expect(sum.mock.calls).toEqual([[pieData, anyFunction]]);
			expect(arc.mock.calls).toEqual([[], []]);
			expect(arcFn.innerRadius.mock.calls).toEqual([[112.5]]);
			expect(arcFn.outerRadius.mock.calls).toEqual([[150]]);
			expect(pie.mock.calls).toEqual([[], []]);
			expect(pieFn.value.mock.calls).toEqual([[anyFunction]]);
			expect(pieFn.padAngle.mock.calls).toEqual([[0.01]]);
			expect(pieFn.mock.calls).toEqual([[pieData]]);
			expect(setAttribute.mock.calls).toEqual([
				['x', 150],
				['y', 150],
			]);
			expect(select.mock.calls).toEqual([[current.firstChild.firstChild]]);
			expect(paths.selectAll.mock.calls).toEqual([['path']]);
			expect(paths.data.mock.calls).toEqual([[[arc0, arc1]]]);
			expect(paths.join.mock.calls).toEqual([['path']]);
			expect(paths.attr.mock.calls).toEqual([
				['class', anyFunction],
				['d', anyFunction],
				['role', 'graphics-symbol'],
				['aria-roledescription', 'slice'],
				['aria-label', anyFunction],
			]);

			expect(sum.mock.calls[0][1](pieData[0])).toBe(3);

			expect(paths.attr.mock.calls[0][1](arc1)).toBe('getDefaultClass');
			expect(getColorClass.mock.calls).toEqual([['fill', 'getColorVariant', 1, 1]]);
			expect(getDefaultClass.mock.calls).toEqual([['b', null, 7, 'getColorClass']]);

			expect(paths.attr.mock.calls[1][1](arc0)).toBe('d0');
			expect(arcFn.mock.calls).toEqual([[arc0]]);

			expect(paths.attr.mock.calls[4][1]({data: ['a', 3]})).toBe('a, 3');

			expect(paths.on.mock.calls).toEqual([
				['click', anyFunction],
				['mousemove', anyFunction],
			]);

			paths.on.mock.calls[0][1](null, {data: pieData[0]});
			expect(onClick.mock.calls).toEqual([[data[0]]]);

			paths.on.mock.calls[1][1]({clientX: 10, clientY: 20}, {data: pieData[0]});
			expect(setHintData.mock.calls).toEqual([
				[
					{
						visible: true,
						x: 10,
						y: 20,
						content: (
							<Layer className="Chart__simpleHint">
								<span>a</span>
								<span>format-.3s</span>
							</Layer>
						),
					},
				],
			]);
			expect(siFormatter.mock.calls).toEqual([[3]]);
		});

		it('adds an effect which renders the chart when the hint is not enabled', () => {
			const data = [
				{group: 'a', value: 3},
				{group: 'b', value: 7},
			];
			const pieData = [
				['a', 3, data[0]],
				['b', 7, data[1]],
			];
			const setAttribute = jest.fn();
			const wrapper = {setAttribute, firstChild: {id: 'first'}};
			const current = {firstChild: wrapper, getBoundingClientRect: () => ({width: 400, height: 300})};
			const arc0 = {data: pieData[0], index: 0};
			const arc1 = {data: pieData[1], index: 1};
			const arcFn = arc();
			const pieFn = pie();
			const paths = createPaths();
			useRef.mockReturnValueOnce({current}).mockReturnValueOnce({}).mockReturnValueOnce({});
			sum.mockReturnValueOnce(10);
			arcFn.mockReturnValueOnce('d0');
			pieFn.mockReturnValueOnce([arc0, arc1]);
			select.mockReturnValueOnce(paths);
			shallow(<DonutChart data={data} hint={{enabled: false}} />);
			expect(useLayoutEffect.mock.calls[0]).toEqual([
				anyFunction,
				[
					null,
					1,
					identity,
					false,
					getDefaultClass,
					'random-id-loading',
					false,
					siFormatter,
					undefined,
					{
						arcs: [arc0, arc1],
						groupIndex: new Map([
							['a', 0],
							['b', 1],
						]),
						empty: false,
					},
				],
			]);

			expect(useLayoutEffect.mock.calls[0][0]()).toBeUndefined();

			expect(select.mock.calls).toEqual([[current.firstChild.firstChild]]);
			expect(paths.on.mock.calls).toEqual([
				['click', null],
				['mousemove', null],
			]);
		});

		it('adds an effect which renders the chart when sum returns 0', () => {
			const data = [{group: 'a', value: 0}];
			const pieData = [['a', 0, data[0]]];
			const setAttribute = jest.fn();
			const replaceChildren = jest.fn();
			const wrapper = {setAttribute, firstChild: {replaceChildren}};
			const current = {firstChild: wrapper, getBoundingClientRect: () => ({width: 400, height: 300})};
			const emptyArc = {startAngle: 0, endAngle: 2 * PI};
			const arcFn = arc();
			const paths = createPaths();
			useRef.mockReturnValueOnce({current}).mockReturnValueOnce({}).mockReturnValueOnce({});
			sum.mockReturnValueOnce(0);
			arcFn.mockReturnValueOnce('d0');
			select.mockReturnValueOnce(paths);
			shallow(<DonutChart data={data} />);
			expect(useLayoutEffect.mock.calls[0]).toEqual([
				anyFunction,
				[
					null,
					1,
					identity,
					false,
					getDefaultClass,
					'random-id-loading',
					true,
					siFormatter,
					undefined,
					{arcs: null, groupIndex: new Map([['a', 0]]), empty: true},
				],
			]);

			expect(useLayoutEffect.mock.calls[0][0]()).toBeUndefined();

			expect(sum.mock.calls).toEqual([[pieData, anyFunction]]);
			expect(arc.mock.calls).toEqual([[], []]);
			expect(arcFn.innerRadius.mock.calls).toEqual([[112.5]]);
			expect(arcFn.outerRadius.mock.calls).toEqual([[150]]);
			expect(pie.mock.calls).toEqual([]);
			expect(select.mock.calls).toEqual([[current.firstChild.firstChild]]);
			expect(paths.selectAll.mock.calls).toEqual([['path']]);
			expect(paths.data.mock.calls).toEqual([[[emptyArc]]]);
			expect(paths.join.mock.calls).toEqual([['path']]);
			expect(paths.attr.mock.calls).toEqual([
				['class', 'Chart--donutEmpty'],
				['fill', null],
				['d', anyFunction],
				['aria-hidden', 'true'],
			]);

			expect(paths.attr.mock.calls[2][1](emptyArc)).toBe('d0');
			expect(arcFn.mock.calls).toEqual([[emptyArc]]);

			expect(paths.on.mock.calls).toEqual([
				['click', null],
				['mousemove', null],
			]);
		});

		it('adds an effect which renders the chart when data loading is set', () => {
			const setAttribute = jest.fn();
			const replaceChildren = jest.fn();
			const wrapper = {setAttribute, firstChild: {replaceChildren}};
			const current = {firstChild: wrapper, getBoundingClientRect: () => ({width: 400, height: 300})};
			const emptyArc = {startAngle: 0, endAngle: 2 * PI};
			const arcFn = arc();
			const paths = createPaths();
			useRef.mockReturnValueOnce({current}).mockReturnValueOnce({}).mockReturnValueOnce({});
			select.mockReturnValueOnce(paths);
			shallow(<DonutChart dataOptions={{loading: true}} />);
			expect(useLayoutEffect.mock.calls[0]).toEqual([
				anyFunction,
				[
					null,
					1,
					identity,
					true,
					getDefaultClass,
					'random-id-loading',
					true,
					siFormatter,
					undefined,
					{groupIndex: new Map(), empty: true},
				],
			]);

			expect(useLayoutEffect.mock.calls[0][0]()).toBeUndefined();

			expect(setGradientParameters.mock.calls).toEqual([[wrapper, 300, 1]]);
			expect(sum.mock.calls).toEqual([]);
			expect(arc.mock.calls).toEqual([[], []]);
			expect(arcFn.innerRadius.mock.calls).toEqual([[112.5]]);
			expect(arcFn.outerRadius.mock.calls).toEqual([[150]]);
			expect(pie.mock.calls).toEqual([]);
			expect(select.mock.calls).toEqual([[current.firstChild.firstChild]]);
			expect(paths.selectAll.mock.calls).toEqual([['path']]);
			expect(paths.data.mock.calls).toEqual([[[emptyArc]]]);
			expect(paths.join.mock.calls).toEqual([['path']]);
			expect(paths.attr.mock.calls).toEqual([
				['class', null],
				['fill', "url('#random-id-loading')"],
				['d', anyFunction],
				['aria-hidden', 'true'],
			]);
		});

		it('adds an effect which calls addResizeObserver', () => {
			const current = {foo: 'test'};
			const draw = jest.fn();
			useRef.mockReturnValueOnce({current}).mockReturnValueOnce({current: draw}).mockReturnValueOnce({});
			shallow(<DonutChart data={[]} />);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, []]);

			expect(useEffect.mock.calls[0][0]()).toBe('addResizeObserver');
			expect(addResizeObserver.mock.calls).toEqual([[current, anyFunction]]);

			addResizeObserver.mock.calls[0][1]('test-rect');
			expect(draw.mock.calls).toEqual([['test-rect']]);
		});

		it('calls setHintData when the mouse leaves the donut', () => {
			const setHintData = jest.fn();
			useState.mockReturnValueOnce([{}, setHintData]);
			const wrapper = shallow(<DonutChart data={[]} />);
			wrapper.find('[onMouseLeave]').prop('onMouseLeave')();
			expect(setHintData.mock.calls).toEqual([[anyFunction]]);
			expect(setHintData.mock.calls[0][0]({test: 'foo'})).toEqual({test: 'foo', visible: false});
		});
	});
});
