import {shallow} from 'enzyme';
import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import identity from 'lodash-es/identity';
import {scaleQuantize} from 'd3-scale';
import {select} from 'd3-selection';
import {line} from 'd3-shape';
import {addResizeObserver, useRandomId} from '@bluecateng/pelagos';

import LineChart from '../../src/charts/LineChart';
import createScale from '../../src/charts/createScale';
import MultiHint from '../../src/charts/MultiHint';
import getPlotBottom from '../../src/charts/getPlotBottom';
import getTicks from '../../src/charts/getTicks';
import drawLeftAxis from '../../src/charts/drawLeftAxis';
import drawBottomAxis from '../../src/charts/drawBottomAxis';
import drawGrid from '../../src/charts/drawGrid';
import getColorClass from '../../src/charts/getColorClass';
import getColorVariant from '../../src/charts/getColorVariant';
import getDefaultClass from '../../src/charts/getDefaultClass';
import updateHint from '../../src/charts/updateHint';
import getDomain from '../../src/charts/getDomain';
import extractLineDataFromTidy from '../../src/charts/extractLineDataFromTidy';
import drawLoadingGrid from '../../src/charts/drawLoadingGrid';

jest.unmock('../../src/charts/LineChart');

jest.mock('d3-shape', () => ({curveMonotoneX: 'curveMonotoneX', line: jest.fn()}));

jest.mock('../../src/charts/tickFormatters', () => ({
	labels: 'labels-tick',
	linear: 'linear-tick',
	log: 'log-tick',
	time: 'time-tick',
}));
jest.mock('../../src/charts/hintFormatters', () => ({
	labels: 'labels-hint',
	linear: 'linear-hint',
	log: 'log-hint',
	time: 'time-hint',
}));

const anyFunction = expect.any(Function);

const createLineFn = () =>
	Object.assign(jest.fn().mockReturnValue('line'), {
		curve: jest.fn().mockReturnThis(),
		defined: jest.fn().mockReturnThis(),
		x: jest.fn().mockReturnThis(),
		y: jest.fn().mockReturnThis(),
	});

const createLines = () => ({
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
});

global.document = {addEventListener: jest.fn(), removeEventListener: jest.fn()};

useRandomId.mockReturnValue('random-id');
addResizeObserver.mockReturnValue('addResizeObserver');
getDefaultClass.mockReturnValue('getDefaultClass');
getColorClass.mockReturnValue('getColorClass');
getColorVariant.mockReturnValue('getColorVariant');

describe('LineChart', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			extractLineDataFromTidy.mockReturnValueOnce({groupIndex: new Map([['a', []]])});
			const wrapper = shallow(<LineChart data={[]} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			useState.mockReturnValueOnce([{visible: true, style: 'test-style', content: 'test-hint'}]);
			extractLineDataFromTidy.mockReturnValueOnce({});
			const wrapper = shallow(<LineChart className="TestClass" data={[]} legend={{order: ['a']}} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when data loading is set', () => {
			const wrapper = shallow(<LineChart dataOptions={{loading: true}} />);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(extractLineDataFromTidy.mock.calls).toEqual([]);
		});
	});

	describe('behaviour', () => {
		it('adds an effect which renders the chart', () => {
			const data = [
				{group: 'a', date: 1577854800000, value: 8},
				{group: 'a', date: 1579064400000, value: 1},
				{group: 'a', date: 1580533200000, value: 3},
				{group: 'b', date: 1577854800000, value: 5},
				{group: 'b', date: 1579064400000, value: null},
				{group: 'b', date: 1580533200000, value: 9},
			];
			const hintFormatter = jest.fn().mockReturnValue('format-hint');
			const onClick = jest.fn();
			const onDrag = jest.fn();
			const replaceChildren = jest.fn();
			const setHintData = jest.fn();
			const current = {
				childNodes: [
					{id: '0'},
					{id: '1', firstChild: {}, lastChild: {}},
					{id: '2'},
					{id: '3'},
					{id: '4'},
					{id: '5', style: {}, setAttribute: jest.fn()},
				],
				parentNode: {getBoundingClientRect: () => ({left: 20, top: 10, width: 400, height: 320})},
				getBoundingClientRect: () => ({left: 20, right: 420, top: 10, bottom: 310, width: 400, height: 300}),
			};
			const leftScale = Object.assign(jest.fn().mockReturnValue(50), {
				ticks: () => [0, 2, 4, 6],
				domain: () => [0, 5],
			});
			const bottomScale = Object.assign(
				jest
					.fn()
					.mockReturnValueOnce(100)
					.mockReturnValueOnce(200)
					.mockReturnValueOnce(300)
					.mockReturnValueOnce(100)
					.mockReturnValueOnce(200)
					.mockReturnValueOnce(100)
					.mockReturnValueOnce(300),
				{range: () => [38, 400]}
			);
			const leftTicks = [1, 5, 8];
			const zero = {
				selectAll: jest.fn().mockReturnThis(),
				data: jest.fn().mockReturnThis(),
				join: jest.fn().mockReturnThis(),
				attr: jest.fn().mockReturnThis(),
			};
			const grid = {on: jest.fn().mockReturnThis()};
			const qScale = Object.assign(
				jest
					.fn()
					.mockReturnValueOnce(1579064400000)
					.mockReturnValueOnce(1579064400000)
					.mockReturnValueOnce(1577854800000)
					.mockReturnValueOnce(1577854800000),
				{
					domain: jest.fn().mockReturnThis(),
					range: jest.fn().mockReturnThis(),
				}
			);
			const lineFn = createLineFn();
			const lines = createLines();
			const dots = createDots();
			const preventDefault = jest.fn();
			const stopPropagation = jest.fn();
			const groups = new Map([
				['a', [8, 1, 3]],
				['b', [5, null, 9]],
			]);
			const groupIndex = new Map([
				['a', 0],
				['b', 1],
			]);
			const hintValues = new Map([
				[
					1577854800000,
					[
						['a', 8],
						['b', 5],
					],
				],
				[1579064400000, [['a', 1]]],
				[
					1580533200000,
					[
						['a', 3],
						['b', 9],
					],
				],
			]);
			const leftList = [8, 1, 3, 5, 9];
			const bottomList = [1577854800000, 1579064400000, 1580533200000];
			const pointList = [
				['a', 1577854800000, 8],
				['a', 1579064400000, 1],
				['a', 1580533200000, 3],
				['b', 1577854800000, 5],
				['b', 1580533200000, 9],
			];
			const leftDomain = [1, 9];
			const bottomDomain = [1577854800000, 1580533200000];
			useRef.mockReturnValueOnce({current}).mockReturnValueOnce({}).mockReturnValueOnce({});
			useState.mockReturnValueOnce([{}, setHintData]);
			extractLineDataFromTidy.mockReturnValueOnce({groups, groupIndex, hintValues, leftList, bottomList, pointList});
			getDomain.mockReturnValueOnce(leftDomain).mockReturnValueOnce(bottomDomain);
			getPlotBottom.mockReturnValueOnce(262);
			createScale.mockReturnValueOnce(leftScale).mockReturnValueOnce(bottomScale);
			getTicks.mockReturnValueOnce(leftTicks).mockReturnValueOnce(bottomList);
			drawLeftAxis.mockReturnValueOnce(38);
			select.mockReturnValueOnce(zero).mockReturnValueOnce(grid).mockReturnValueOnce(lines).mockReturnValueOnce(dots);
			scaleQuantize.mockReturnValueOnce(qScale);
			line.mockReturnValueOnce(lineFn);
			shallow(
				<LineChart
					data={data}
					leftAxis={{title: 'Left title'}}
					bottomAxis={{scaleType: 'time', title: 'Bottom title'}}
					hint={{headerFormatter: hintFormatter}}
					onClick={onClick}
					onDrag={onDrag}
				/>
			);
			expect(extractLineDataFromTidy.mock.calls).toEqual([[data, undefined, 'group', 'date', 'value']]);
			expect(useLayoutEffect.mock.calls[0]).toEqual([
				anyFunction,
				[
					'time',
					'time-tick',
					'Bottom title',
					null,
					1,
					'monotone',
					identity,
					false,
					getDefaultClass,
					getDefaultClass,
					getDefaultClass,
					true,
					anyFunction,
					true,
					'Bottom title',
					'Total',
					'linear-hint',
					'linear',
					'linear-tick',
					'Left title',
					onClick,
					onDrag,
					true,
					false,
					3,
					{bottomList, groups, groupIndex, hintValues, pointList, leftDomain, bottomDomain},
				],
			]);

			expect(useLayoutEffect.mock.calls[0][0]()).toBeUndefined();

			expect(getDomain.mock.calls).toEqual([
				[undefined, 'linear', leftList],
				[undefined, 'time', bottomList],
			]);
			expect(getColorVariant.mock.calls).toEqual([[null, 2]]);
			expect(replaceChildren.mock.calls).toEqual([]);
			expect(select.mock.calls).toEqual([
				[current.childNodes[4]],
				[current.childNodes[0]],
				[current.childNodes[2]],
				[current.childNodes[3]],
			]);

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
				[current.childNodes[1].lastChild, bottomScale, 'Bottom title', 5, bottomList, 'time-tick', 400, 300, 262, 38],
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

			expect(grid.on.mock.calls).toEqual([
				['mousedown', anyFunction],
				['mousemove', anyFunction],
				['mouseleave', anyFunction],
			]);

			grid.on.mock.calls[0][1]({button: 1});
			grid.on.mock.calls[0][1]({button: 0, clientX: 200, preventDefault});
			expect(document.addEventListener.mock.calls).toEqual([
				['mousemove', anyFunction, true],
				['mouseup', anyFunction, true],
			]);
			expect(current.childNodes[5].style.opacity).toBe(0);

			grid.on.mock.calls[1][1]({clientX: 50});
			grid.on.mock.calls[2][1]();

			qScale.range.mockReturnValueOnce(bottomList).mockReturnValueOnce(bottomList).mockReturnValueOnce(bottomList);
			const dragListener = document.addEventListener.mock.calls[0][1];
			const upListener = document.addEventListener.mock.calls[1][1];
			dragListener({clientX: 5, preventDefault, stopPropagation});
			upListener({clientX: 200, clientY: 100, preventDefault, stopPropagation});
			dragListener({clientX: 500, preventDefault, stopPropagation});
			upListener({clientX: 200, clientY: 100, preventDefault, stopPropagation});
			dragListener({clientX: 200, preventDefault, stopPropagation});
			upListener({clientX: 20, clientY: 100, preventDefault, stopPropagation});
			upListener({clientX: 200, clientY: 500, preventDefault, stopPropagation});
			upListener({clientX: 200, clientY: 100, preventDefault, stopPropagation});
			expect(preventDefault.mock.calls).toEqual([[], [], [], [], [], [], [], [], []]);
			expect(stopPropagation.mock.calls).toEqual([[], [], [], [], [], [], [], []]);
			expect(onClick.mock.calls).toEqual([[1579064400000]]);
			expect(onDrag.mock.calls).toEqual([
				[1577854800000, 1579064400000],
				[1579064400000, 1580533200000],
			]);
			expect(hintFormatter.mock.calls).toEqual([
				[1579064400000],
				[1579064400000],
				[1577854800000],
				[1579064400000],
				[1579064400000],
				[1580533200000],
				[1579064400000],
				[1579064400000],
			]);

			grid.on.mock.calls[1][1]({clientX: 50, clientY: 100});
			grid.on.mock.calls[1][1]({clientX: 55, clientY: 90});
			expect(qScale.mock.calls).toEqual([[180], [180], [30], [35]]);
			expect(current.childNodes[5].setAttribute.mock.calls).toEqual([
				['y2', 262],
				['x1', 100],
				['x2', 100],
			]);
			expect(updateHint.mock.calls).toEqual([
				[
					true,
					30,
					90,
					400,
					320,
					100,
					24,
					400,
					38,
					262,
					setHintData,
					// eslint-disable-next-line react/jsx-key -- unit test
					<MultiHint
						title="Bottom title"
						headerValue={1577854800000}
						values={[
							['a', 8],
							['b', 5],
						]}
						groupIndex={groupIndex}
						showTotal={true}
						totalLabel="Total"
						headerFormatter={hintFormatter}
						groupFormatter={identity}
						valueFormatter="linear-hint"
						getBgClass={anyFunction}
						variant="getColorVariant"
						option={1}
					/>,
					current.childNodes[5],
				],
				[
					true,
					35,
					80,
					400,
					320,
					100,
					24,
					400,
					38,
					262,
					setHintData,
					// eslint-disable-next-line react/jsx-key -- unit test
					<MultiHint
						title="Bottom title"
						headerValue={1577854800000}
						values={[
							['a', 8],
							['b', 5],
						]}
						groupIndex={groupIndex}
						showTotal={true}
						totalLabel="Total"
						headerFormatter={hintFormatter}
						groupFormatter={identity}
						valueFormatter="linear-hint"
						getBgClass={anyFunction}
						variant="getColorVariant"
						option={1}
					/>,
					current.childNodes[5],
				],
			]);

			grid.on.mock.calls[2][1]();
			expect(current.childNodes[5].style.opacity).toBe(0);
			expect(setHintData.mock.calls).toEqual([
				[
					{
						visible: true,
						style: {left: 100, top: 0},
						content: (
							<>
								<div className="Chart__selection" style={{height: 262, left: 0, width: 0}} />
								<div className="Chart__range" style={{left: 0}}>
									format-hint - format-hint
								</div>
							</>
						),
					},
				],
				[
					{
						visible: true,
						style: {left: 38, top: 0},
						content: (
							<>
								<div className="Chart__selection" style={{height: 262, left: 0, width: 62}} />
								<div className="Chart__range" style={{left: 31}}>
									format-hint - format-hint
								</div>
							</>
						),
					},
				],
				[anyFunction],
				[
					{
						visible: true,
						style: {left: 100, top: 0},
						content: (
							<>
								<div className="Chart__selection" style={{height: 262, left: 0, width: 300}} />
								<div className="Chart__range" style={{left: 150}}>
									format-hint - format-hint
								</div>
							</>
						),
					},
				],
				[anyFunction],
				[
					{
						visible: true,
						style: {left: 100, top: 0},
						content: (
							<>
								<div className="Chart__selection" style={{height: 262, left: 0, width: 100}} />
								<div className="Chart__range" style={{left: 50}}>
									format-hint - format-hint
								</div>
							</>
						),
					},
				],
				[anyFunction],
				[anyFunction],
				[anyFunction],
				[anyFunction],
			]);
			expect(setHintData.mock.calls[2][0]({foo: 'test'})).toEqual({foo: 'test', visible: false});

			expect(scaleQuantize.mock.calls).toEqual([[]]);
			expect(qScale.domain.mock.calls).toEqual([[[38, 400]]]);
			expect(qScale.range.mock.calls).toEqual([[bottomList], [], [], []]);

			expect(line.mock.calls).toEqual([[]]);
			expect(lineFn.curve.mock.calls).toEqual([['curveMonotoneX']]);
			expect(lineFn.defined.mock.calls).toEqual([[anyFunction]]);
			expect(lineFn.x.mock.calls).toEqual([[anyFunction]]);
			expect(lineFn.y.mock.calls).toEqual([[anyFunction]]);
			expect(lineFn.defined.mock.calls[0][0](5)).toBe(true);
			expect(lineFn.defined.mock.calls[0][0](null)).toBe(false);
			expect(lineFn.x.mock.calls[0][0](null, 0)).toBe(100);
			expect(lineFn.y.mock.calls[0][0]('line-y')).toBe(50);

			expect(lines.selectAll.mock.calls).toEqual([['path']]);
			expect(lines.data.mock.calls).toEqual([[groups.entries()]]);
			expect(lines.join.mock.calls).toEqual([['path']]);
			expect(lines.attr.mock.calls).toEqual([
				['class', anyFunction],
				['d', anyFunction],
				['role', 'graphics-symbol'],
				['aria-roledescription', 'line'],
				['aria-label', anyFunction],
			]);
			expect(lines.attr.mock.calls[0][1](['b'])).toBe('getDefaultClass');
			expect(lines.attr.mock.calls[1][1]([null, 'test-list'])).toBe('line');
			expect(lines.attr.mock.calls[4][1](['a', [8, 1, 3]])).toBe('a, 8, 1, 3');
			expect(lineFn.mock.calls).toEqual([['test-list']]);

			expect(dots.selectAll.mock.calls).toEqual([['circle']]);
			expect(dots.data.mock.calls).toEqual([[pointList]]);
			expect(dots.join.mock.calls).toEqual([['circle']]);
			expect(dots.attr.mock.calls).toEqual([
				['class', anyFunction],
				['r', 3],
				['cx', anyFunction],
				['cy', anyFunction],
			]);
			const dotsDatum = ['b', 1580533200000, 8];
			expect(dots.attr.mock.calls[0][1](dotsDatum)).toBe('hollow getDefaultClass getDefaultClass');
			expect(dots.attr.mock.calls[2][1](dotsDatum)).toBe(300);
			expect(dots.attr.mock.calls[3][1](dotsDatum)).toBe(50);

			expect(leftScale.mock.calls).toEqual([['line-y'], [8]]);

			expect(bottomScale.mock.calls).toEqual([
				[1577854800000, 0, bottomList],
				[1579064400000, 1, bottomList],
				[1580533200000, 2, bottomList],
				[1579064400000],
				[1579064400000],
				[1577854800000],
				[1580533200000],
			]);

			expect(getDefaultClass.mock.calls).toEqual([
				['b', null, null, 'getColorClass'],
				['b', 1580533200000, 8, 'getColorClass'],
				['b', 1580533200000, 8, 'getColorClass'],
			]);

			expect(getColorClass.mock.calls).toEqual([
				['stroke', 'getColorVariant', 1, 1],
				['stroke', 'getColorVariant', 1, 1],
				['fill', 'getColorVariant', 1, 1],
			]);
		});

		it('adds an effect which renders the chart when alternate options are specified', () => {
			const data = [
				{group: 'a', x: 5, y: 8},
				{group: 'b', x: 50, y: -3},
			];
			const replaceChildren = jest.fn();
			const setAttribute = jest.fn();
			const current = {
				childNodes: [
					{id: '0'},
					{id: '1', firstChild: {}, lastChild: {}},
					{id: '2', replaceChildren},
					{id: '3', replaceChildren},
					{id: '4'},
					{id: '5', setAttribute},
				],
				getBoundingClientRect: () => ({width: 400, height: 300}),
			};
			const leftScale = jest.fn().mockReturnValueOnce(230);
			const bottomScale = Object.assign(jest.fn(), {range: jest.fn()});
			const zero = {
				selectAll: jest.fn().mockReturnThis(),
				data: jest.fn().mockReturnThis(),
				join: jest.fn().mockReturnThis(),
				attr: jest.fn().mockReturnThis(),
			};
			const grid = {on: jest.fn().mockReturnThis()};
			const lineFn = createLineFn();
			const lines = createLines();
			const dots = createDots();
			const groups = new Map([['a', [8]]]);
			const groupIndex = new Map([
				['a', 0],
				['b', 1],
			]);
			const leftList = [8];
			const bottomList = [5];
			const leftDomain = [-3, 8];
			const bottomDomain = ['foo'];
			useRef.mockReturnValueOnce({current}).mockReturnValueOnce({}).mockReturnValueOnce({});
			extractLineDataFromTidy.mockReturnValueOnce({groups, groupIndex, leftList, bottomList});
			getDomain.mockReturnValueOnce(leftDomain).mockReturnValueOnce(bottomDomain);
			getPlotBottom.mockReturnValueOnce(280);
			createScale.mockReturnValueOnce(leftScale).mockReturnValueOnce(bottomScale);
			getTicks.mockReturnValueOnce().mockReturnValueOnce();
			drawLeftAxis.mockReturnValueOnce(16);
			select.mockReturnValueOnce(zero).mockReturnValueOnce(grid).mockReturnValueOnce(lines).mockReturnValueOnce(dots);
			scaleQuantize.mockReturnValueOnce({domain: jest.fn().mockReturnThis(), range: jest.fn().mockReturnThis()});
			line.mockReturnValueOnce(lineFn);
			shallow(
				<LineChart
					data={data}
					curve="natural"
					dataOptions={{groupFormatter: 'test-formatter', selectedGroups: ['a']}}
					color={{pairing: {groupCount: 5, option: 2}}}
					bottomAxis={{domain: 'bottom-domain', scaleType: 'log', title: 'Bottom title', mapsTo: 'x'}}
					leftAxis={{domain: 'left-domain', scaleType: 'linear', title: 'Left title', mapsTo: 'y'}}
					points={{filled: true, radius: 5}}
					hint={{
						enabled: false,
						headerFormatter: 'test-header-formatter',
						showTotal: false,
						title: 'Hint title',
						totalLabel: 'Total label',
						valueFormatter: 'test-value-formatter',
					}}
				/>
			);
			expect(extractLineDataFromTidy.mock.calls).toEqual([[data, ['a'], 'group', 'x', 'y']]);
			expect(useLayoutEffect.mock.calls[0]).toEqual([
				anyFunction,
				[
					'log',
					'log-tick',
					'Bottom title',
					5,
					2,
					'natural',
					'test-formatter',
					false,
					getDefaultClass,
					getDefaultClass,
					getDefaultClass,
					false,
					'test-header-formatter',
					false,
					'Hint title',
					'Total label',
					'test-value-formatter',
					'linear',
					'linear-tick',
					'Left title',
					undefined,
					undefined,
					true,
					true,
					5,
					{groups, groupIndex, bottomList, leftDomain, bottomDomain},
				],
			]);

			expect(useLayoutEffect.mock.calls[0][0]()).toBeUndefined();
			expect(getDomain.mock.calls).toEqual([
				['left-domain', 'linear', leftList],
				['bottom-domain', 'log', bottomList],
			]);
			expect(getColorVariant.mock.calls).toEqual([[5, 2]]);

			expect(zero.selectAll.mock.calls).toEqual([['line']]);
			expect(zero.data.mock.calls).toEqual([[[1]]]);
			expect(zero.join.mock.calls).toEqual([['line']]);
			expect(zero.attr.mock.calls).toEqual([
				['x1', 16],
				['x2', 400],
				['y1', 230],
				['y2', 230],
			]);

			expect(dots.attr.mock.calls).toEqual([
				['class', anyFunction],
				['r', 5],
				['cx', anyFunction],
				['cy', anyFunction],
			]);
			expect(dots.attr.mock.calls[0][1](['a', 'foo', 8])).toBe('filled getDefaultClass getDefaultClass');
			expect(getDefaultClass.mock.calls).toEqual([
				['a', 'foo', 8, 'getColorClass'],
				['a', 'foo', 8, 'getColorClass'],
			]);

			expect(leftScale.mock.calls).toEqual([[0]]);
		});

		it('adds an effect which renders the chart when data is empty', () => {
			const replaceChildren = jest.fn();
			const setAttribute = jest.fn();
			const current = {
				childNodes: [
					{id: '0'},
					{id: '1'},
					{id: '2', replaceChildren},
					{id: '3', replaceChildren},
					{id: '4'},
					{id: '5', setAttribute},
				],
				getBoundingClientRect: () => ({width: 400, height: 300}),
			};
			const leftScale = {};
			const bottomScale = {};
			const zero = {
				selectAll: jest.fn().mockReturnThis(),
				data: jest.fn().mockReturnThis(),
				join: jest.fn().mockReturnThis(),
				attr: jest.fn().mockReturnThis(),
			};
			const grid = {on: jest.fn().mockReturnThis()};
			const groups = new Map();
			const groupIndex = new Map();
			const leftList = [];
			const bottomList = [];
			const leftDomain = [0, 0];
			const bottomDomain = [];
			useRef.mockReturnValueOnce({current}).mockReturnValueOnce({}).mockReturnValueOnce({});
			extractLineDataFromTidy.mockReturnValueOnce({groups, groupIndex, leftList, bottomList});
			getDomain.mockReturnValueOnce(leftDomain).mockReturnValueOnce(bottomDomain);
			getPlotBottom.mockReturnValueOnce(280);
			createScale.mockReturnValueOnce(leftScale).mockReturnValueOnce(bottomScale);
			getTicks.mockReturnValueOnce().mockReturnValueOnce();
			drawLeftAxis.mockReturnValueOnce(16);
			select.mockReturnValueOnce(zero).mockReturnValueOnce(grid);
			shallow(<LineChart data={[]} />);
			expect(useLayoutEffect.mock.calls[0]).toEqual([
				anyFunction,
				[
					'labels',
					'labels-tick',
					undefined,
					null,
					1,
					'monotone',
					identity,
					false,
					getDefaultClass,
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
					undefined,
					true,
					false,
					3,
					{groups, groupIndex, bottomList, leftDomain, bottomDomain},
				],
			]);

			expect(useLayoutEffect.mock.calls[0][0]()).toBeUndefined();
			expect(getDomain.mock.calls).toEqual([
				[undefined, 'linear', leftList],
				[undefined, 'labels', bottomList],
			]);
			expect(replaceChildren.mock.calls).toEqual([[], []]);
			expect(select.mock.calls).toEqual([[current.childNodes[4]], [current.childNodes[0]]]);

			expect(createScale.mock.calls).toEqual([
				['linear', leftDomain, [280, 0], 0.25],
				['labels', bottomDomain, [16, 400], 0.25],
			]);
			expect(setAttribute.mock.calls).toEqual([['y2', 280]]);

			expect(grid.on.mock.calls).toEqual([
				['mousedown', null],
				['mousemove', null],
				['mouseleave', null],
			]);
		});

		it('adds an effect which renders the chart when data loading is set', () => {
			const current = {
				getBoundingClientRect: () => ({width: 400, height: 300}),
			};
			const groupIndex = new Map();
			useRef.mockReturnValueOnce({current}).mockReturnValueOnce({}).mockReturnValueOnce({});
			shallow(<LineChart dataOptions={{loading: true}} />);
			expect(useLayoutEffect.mock.calls[0]).toEqual([
				anyFunction,
				[
					'labels',
					'labels-tick',
					undefined,
					null,
					1,
					'monotone',
					identity,
					true,
					getDefaultClass,
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
					undefined,
					true,
					false,
					3,
					{groupIndex},
				],
			]);

			expect(useLayoutEffect.mock.calls[0][0]()).toBeUndefined();

			expect(drawLoadingGrid.mock.calls).toEqual([[current, 400, 300]]);
		});

		it('adds an effect which calls addResizeObserver', () => {
			const current = {foo: 'test'};
			const draw = jest.fn();
			useRef.mockReturnValueOnce({current}).mockReturnValueOnce({current: draw}).mockReturnValueOnce({});
			extractLineDataFromTidy.mockReturnValueOnce({groupIndex: new Map()});
			shallow(<LineChart data={[]} />);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, []]);

			expect(useEffect.mock.calls[0][0]()).toBe('addResizeObserver');
			expect(addResizeObserver.mock.calls).toEqual([[current, anyFunction]]);

			addResizeObserver.mock.calls[0][1]('test-rect');
			expect(draw.mock.calls).toEqual([['test-rect']]);
		});
	});
});
