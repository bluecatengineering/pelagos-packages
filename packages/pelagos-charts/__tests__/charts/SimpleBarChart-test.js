import {shallow} from 'enzyme';
import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {select} from 'd3-selection';
import identity from 'lodash-es/identity';
import {addResizeObserver, Layer} from '@bluecateng/pelagos';

import SimpleBarChart from '../../src/charts/SimpleBarChart';
import {getDefaultClass} from '../../src/charts/Getters';
import getPlotBottom from '../../src/charts/getPlotBottom';
import createScale from '../../src/charts/createScale';
import getTicks from '../../src/charts/getTicks';
import drawLeftAxis from '../../src/charts/drawLeftAxis';
import drawBottomAxis from '../../src/charts/drawBottomAxis';
import drawGrid from '../../src/charts/drawGrid';
import getColorClass from '../../src/charts/getColorClass';
import getColorVariant from '../../src/charts/getColorVariant';
import extendDomain from '../../src/charts/extendDomain';
import useRandomId from '../../src/charts/useRandomId';
import drawLoadingGrid from '../../src/charts/drawLoadingGrid';

jest.unmock('../../src/charts/SimpleBarChart');
jest.unmock('../../src/charts/Getters');
jest.unmock('../../src/charts/mappers');

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

global.innerWidth = 800;

useRandomId.mockReturnValue('random-id');
addResizeObserver.mockReturnValue('addResizeObserver');
getColorClass.mockReturnValue('getColorClass');
getColorVariant.mockReturnValue('getColorVariant');

describe('SimpleBarChart', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<SimpleBarChart data={[]} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			useState.mockReturnValueOnce([{visible: true, content: 'test-hint'}]);
			const wrapper = shallow(<SimpleBarChart className="TestClass" data={[]} legend={{enabled: true}} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when data loading is set', () => {
			const wrapper = shallow(<SimpleBarChart dataOptions={{loading: true}} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('adds an effect which renders the chart', () => {
			const headerFormatter = jest.fn().mockReturnValue('header');
			const valueFormatter = jest.fn().mockReturnValue('value');
			const onClick = jest.fn();
			const setHintData = jest.fn();
			const current = {
				childNodes: [{id: '0'}, {id: '1', firstChild: {}, lastChild: {}}, {id: '2'}, {id: '3'}],
				getBoundingClientRect: () => ({left: 20, width: 400, height: 300}),
			};
			const leftScale = jest.fn().mockReturnValueOnce(140).mockReturnValueOnce(90).mockReturnValueOnce(190);
			const bottomScale = jest.fn().mockReturnValueOnce(80).mockReturnValueOnce(160).mockReturnValueOnce(240);
			bottomScale.step = jest.fn().mockReturnValue(100);
			const leftTicks = [1, 5, 8];
			const zero = {
				selectAll: jest.fn().mockReturnThis(),
				data: jest.fn().mockReturnThis(),
				join: jest.fn().mockReturnThis(),
				attr: jest.fn().mockReturnThis(),
			};
			const barSelect = {
				selectAll: jest.fn().mockReturnThis(),
				data: jest.fn().mockReturnThis(),
				join: jest.fn().mockReturnThis(),
				attr: jest.fn().mockReturnThis(),
				on: jest.fn().mockReturnThis(),
			};
			const bottomSet = new Set(['foo', 'bar']);
			const selectedData = [
				['a', 'foo', 8],
				['a', 'bar', 1],
				['b', 'foo', 5],
			];
			const leftDomain = [0, 8.8];
			useRef.mockReturnValueOnce({current}).mockReturnValueOnce({}).mockReturnValueOnce({});
			useState.mockReturnValueOnce([{}, setHintData]);
			extendDomain.mockReturnValueOnce(leftDomain);
			getPlotBottom.mockReturnValueOnce(262);
			createScale.mockReturnValueOnce(leftScale).mockReturnValueOnce(bottomScale);
			getTicks.mockReturnValueOnce(leftTicks).mockReturnValueOnce(bottomSet);
			drawLeftAxis.mockReturnValueOnce(38);
			select.mockReturnValueOnce(zero).mockReturnValueOnce(barSelect);
			shallow(
				<SimpleBarChart
					data={[
						{group: 'a', key: 'foo', value: 8},
						{group: 'a', key: 'bar', value: 1},
						{group: 'b', key: 'foo', value: 5},
					]}
					hint={{headerFormatter, valueFormatter}}
					onClick={onClick}
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
					true,
					headerFormatter,
					valueFormatter,
					'linear',
					'linear-tick',
					undefined,
					onClick,
					{
						groupIndex: new Map([
							['a', 0],
							['b', 1],
						]),
						selectedData,
						leftDomain,
						bottomDomain: bottomSet,
					},
					true,
				],
			]);
			expect(useLayoutEffect.mock.calls[0][0]()).toBeUndefined();
			expect(extendDomain.mock.calls).toEqual([[[0, 8]]]);
			expect(getColorVariant.mock.calls).toEqual([[null, 2]]);
			expect(getPlotBottom.mock.calls).toEqual([[300, undefined]]);
			expect(createScale.mock.calls).toEqual([
				['linear', leftDomain, [262, 0], 0.5],
				['labels', bottomSet, [38, 400], 0.5],
			]);
			expect(getTicks.mock.calls).toEqual([
				[leftScale, 3.75],
				[bottomScale, 5],
			]);
			expect(drawLeftAxis.mock.calls).toEqual([
				[current.childNodes[1].firstChild, leftScale, undefined, 3.75, leftTicks, 'linear-tick', 262],
			]);
			expect(drawBottomAxis.mock.calls).toEqual([
				[current.childNodes[1].lastChild, bottomScale, undefined, 5, bottomSet, null, 400, 300, 262, 38],
			]);
			expect(drawGrid.mock.calls).toEqual([
				[current.childNodes[0], leftTicks, leftScale, bottomSet, bottomScale, 400, 38, 262],
			]);
			expect(select.mock.calls).toEqual([[current.childNodes[3]], [current.childNodes[2]]]);
			expect(bottomScale.step.mock.calls).toEqual([[]]);

			expect(zero.selectAll.mock.calls).toEqual([['line']]);
			expect(zero.data.mock.calls).toEqual([[[]]]);
			expect(zero.join.mock.calls).toEqual([['line']]);
			expect(zero.attr.mock.calls).toEqual([
				['x1', 38],
				['x2', 400],
				['y1', 140],
				['y2', 140],
			]);

			expect(barSelect.selectAll.mock.calls).toEqual([['path']]);
			expect(barSelect.data.mock.calls).toEqual([[selectedData]]);
			expect(barSelect.join.mock.calls).toEqual([['path']]);
			expect(barSelect.attr.mock.calls).toEqual([
				['class', anyFunction],
				['d', anyFunction],
				['role', 'graphics-symbol'],
				['aria-roledescription', 'bar'],
				['aria-label', anyFunction],
			]);
			expect(barSelect.on.mock.calls).toEqual([
				['mousemove', anyFunction],
				['mouseleave', anyFunction],
				['click', anyFunction],
			]);

			expect(barSelect.attr.mock.calls[0][1](['b'])).toBe('getColorClass');
			expect(barSelect.attr.mock.calls[1][1](['', 'foo', 5])).toBe('m56,140h48v-50h-48z');
			expect(barSelect.attr.mock.calls[1][1](['', 'bar', 0])).toBe('m136,140h48v0h-48z');
			expect(barSelect.attr.mock.calls[1][1](['', 'baz', -5])).toBe('m216,140h48v50h-48z');
			expect(barSelect.attr.mock.calls[4][1](['a', 'foo', 5])).toBe('a, foo, 5');
			expect(barSelect.attr.mock.calls[4][1](['', 'foo', 5])).toBe(', foo, 5');

			barSelect.on.mock.calls[0][1]({clientX: 82, clientY: 150}, ['', 'foo', 5]);
			barSelect.on.mock.calls[1][1]();
			expect(headerFormatter.mock.calls).toEqual([['foo']]);
			expect(valueFormatter.mock.calls).toEqual([[5]]);
			expect(setHintData.mock.calls).toEqual([
				[
					{
						visible: true,
						x: 82,
						y: 150,
						content: (
							<Layer className="Chart__simpleHint">
								<span>header</span>
								<span>value</span>
							</Layer>
						),
					},
				],
				[anyFunction],
			]);
			expect(setHintData.mock.calls[1][0]({test: 'foo'})).toEqual({test: 'foo', visible: false});

			barSelect.on.mock.calls[2][1](null, ['', 'bar']);
			expect(onClick.mock.calls).toEqual([['bar']]);

			expect(leftScale.mock.calls).toEqual([[0], [5], [-5]]);
			expect(bottomScale.mock.calls).toEqual([['foo'], ['bar'], ['baz']]);
			expect(getColorClass.mock.calls).toEqual([['fill', 'getColorVariant', 1, 1]]);
		});

		it('adds an effect which renders the chart when alternate options are specified', () => {
			const current = {
				childNodes: [{id: '0'}, {id: '1', firstChild: {}, lastChild: {}}, {id: '2'}, {id: '3'}],
				getBoundingClientRect: () => ({width: 400, height: 300}),
			};
			const leftScale = jest.fn().mockReturnValueOnce(140).mockReturnValueOnce(90).mockReturnValueOnce(190);
			const bottomScale = jest.fn().mockReturnValueOnce(80).mockReturnValueOnce(160).mockReturnValueOnce(240);
			bottomScale.step = jest.fn().mockReturnValue(16);
			const leftTicks = [1, 5, 8];
			const zero = {
				selectAll: jest.fn().mockReturnThis(),
				data: jest.fn().mockReturnThis(),
				join: jest.fn().mockReturnThis(),
				attr: jest.fn().mockReturnThis(),
			};
			const barSelect = {
				selectAll: jest.fn().mockReturnThis(),
				data: jest.fn().mockReturnThis(),
				join: jest.fn().mockReturnThis(),
				attr: jest.fn().mockReturnThis(),
				on: jest.fn().mockReturnThis(),
			};
			const bottomList = ['foo', 'bar'];
			const selectedData = [
				['a', 'foo', 8],
				['a', 'bar', -1],
			];
			const leftDomain = [-1, 8];
			useRef.mockReturnValueOnce({current}).mockReturnValueOnce({}).mockReturnValueOnce({});
			getPlotBottom.mockReturnValueOnce(262);
			createScale.mockReturnValueOnce(leftScale).mockReturnValueOnce(bottomScale);
			getTicks.mockReturnValueOnce(leftTicks).mockReturnValueOnce(bottomList);
			drawLeftAxis.mockReturnValueOnce(38);
			select.mockReturnValueOnce(zero).mockReturnValueOnce(barSelect);
			shallow(
				<SimpleBarChart
					data={[
						{group: 'a', key: 'foo', value: 8},
						{group: 'a', key: 'bar', value: -1},
						{group: 'b', key: 'foo', value: 5},
					]}
					dataOptions={{groupFormatter: 'test-formatter', selectedGroups: ['a']}}
					color={{pairing: {groupCount: 5, option: 2}}}
					bottomAxis={{domain: 'test-bottom-domain', title: 'Bottom title'}}
					leftAxis={{domain: leftDomain, scaleType: 'linear', title: 'Left title'}}
					hint={{enabled: false, headerFormatter: 'test-header-formatter', valueFormatter: 'test-value-formatter'}}
				/>
			);
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
					false,
					'test-header-formatter',
					'test-value-formatter',
					'linear',
					'linear-tick',
					'Left title',
					undefined,
					{
						groupIndex: new Map([
							['a', 0],
							['b', 1],
						]),
						selectedData,
						leftDomain,
						bottomDomain: 'test-bottom-domain',
					},
					true,
				],
			]);
			expect(useLayoutEffect.mock.calls[0][0]()).toBeUndefined();
			expect(extendDomain.mock.calls).toEqual([[[-1, 8]]]);
			expect(getColorVariant.mock.calls).toEqual([[5, 2]]);
			expect(getPlotBottom.mock.calls).toEqual([[300, 'Bottom title']]);
			expect(createScale.mock.calls).toEqual([
				['linear', leftDomain, [262, 0], 0.5],
				['labels', 'test-bottom-domain', [38, 400], 0.5],
			]);

			expect(zero.selectAll.mock.calls).toEqual([['line']]);
			expect(zero.data.mock.calls).toEqual([[[1]]]);
			expect(zero.join.mock.calls).toEqual([['line']]);
			expect(zero.attr.mock.calls).toEqual([
				['x1', 38],
				['x2', 400],
				['y1', 140],
				['y2', 140],
			]);
		});

		it('adds an effect which renders the chart when leftScaleType is labels', () => {
			const current = {
				childNodes: [{id: '0'}, {id: '1', firstChild: {}, lastChild: {}}, {id: '2'}, {id: '3'}],
				getBoundingClientRect: () => ({width: 400, height: 300}),
			};
			const leftScale = jest.fn().mockReturnValueOnce(80).mockReturnValueOnce(160).mockReturnValueOnce(240);
			leftScale.step = jest.fn().mockReturnValue(16);
			const bottomScale = jest.fn().mockReturnValueOnce(280).mockReturnValueOnce(330).mockReturnValueOnce(230);
			const leftTicks = [1, 5, 8];
			const zero = {
				selectAll: jest.fn().mockReturnThis(),
				data: jest.fn().mockReturnThis(),
				join: jest.fn().mockReturnThis(),
				attr: jest.fn().mockReturnThis(),
			};
			const barSelect = {
				selectAll: jest.fn().mockReturnThis(),
				data: jest.fn().mockReturnThis(),
				join: jest.fn().mockReturnThis(),
				attr: jest.fn().mockReturnThis(),
				on: jest.fn().mockReturnThis(),
			};
			const leftSet = new Set(['foo', 'bar']);
			const selectedData = [
				['a', 'foo', 8],
				['a', 'bar', 1],
				['b', 'foo', 5],
			];
			const bottomDomain = [0, 8.8];
			useRef.mockReturnValueOnce({current}).mockReturnValueOnce({}).mockReturnValueOnce({});
			extendDomain.mockReturnValueOnce(bottomDomain);
			getPlotBottom.mockReturnValueOnce(262);
			createScale.mockReturnValueOnce(leftScale).mockReturnValueOnce(bottomScale);
			getTicks.mockReturnValueOnce(leftTicks).mockReturnValueOnce(leftSet);
			drawLeftAxis.mockReturnValueOnce(38);
			select.mockReturnValueOnce(zero).mockReturnValueOnce(barSelect);
			shallow(
				<SimpleBarChart
					data={[
						{group: 'a', key: 'foo', value: 8},
						{group: 'a', key: 'bar', value: 1},
						{group: 'b', key: 'foo', value: 5},
					]}
					bottomAxis={{scaleType: 'linear', mapper: (d) => d.value}}
					leftAxis={{scaleType: 'labels', mapper: (d) => d.key}}
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
					true,
					'labels-hint',
					'linear-hint',
					'labels',
					null,
					undefined,
					undefined,
					{
						groupIndex: new Map([
							['a', 0],
							['b', 1],
						]),
						selectedData,
						leftDomain: leftSet,
						bottomDomain,
					},
					false,
				],
			]);
			expect(useLayoutEffect.mock.calls[0][0]()).toBeUndefined();
			expect(extendDomain.mock.calls).toEqual([[[0, 8]]]);
			expect(getColorVariant.mock.calls).toEqual([[null, 2]]);
			expect(getPlotBottom.mock.calls).toEqual([[300, undefined]]);
			expect(createScale.mock.calls).toEqual([
				['labels', leftSet, [262, 0], 0.5],
				['linear', bottomDomain, [38, 400], 0.5],
			]);

			expect(zero.selectAll.mock.calls).toEqual([['line']]);
			expect(zero.data.mock.calls).toEqual([[[]]]);
			expect(zero.join.mock.calls).toEqual([['line']]);
			expect(zero.attr.mock.calls).toEqual([
				['x1', 280],
				['x2', 280],
				['y1', 0],
				['y2', 262],
			]);

			expect(barSelect.attr.mock.calls).toEqual([
				['class', anyFunction],
				['d', anyFunction],
				['role', 'graphics-symbol'],
				['aria-roledescription', 'bar'],
				['aria-label', anyFunction],
			]);
			expect(barSelect.attr.mock.calls[1][1](['', 'foo', 5])).toBe('m280,76v8h50v-8z');
			expect(barSelect.attr.mock.calls[1][1](['', 'bar', 0])).toBe('m280,156v8h0v-8z');
			expect(barSelect.attr.mock.calls[1][1](['', 'baz', -5])).toBe('m280,236v8h-50v-8z');

			expect(leftScale.mock.calls).toEqual([['foo'], ['bar'], ['baz']]);
			expect(bottomScale.mock.calls).toEqual([[0], [5], [-5]]);
		});

		it('adds an effect which renders the chart when leftScaleType is labels and bottomDomain min is negative', () => {
			const current = {
				childNodes: [{id: '0'}, {id: '1', firstChild: {}, lastChild: {}}, {id: '2'}, {id: '3'}],
				getBoundingClientRect: () => ({width: 400, height: 300}),
			};
			const leftScale = jest.fn().mockReturnValueOnce(80).mockReturnValueOnce(160).mockReturnValueOnce(240);
			leftScale.step = jest.fn().mockReturnValue(16);
			const bottomScale = jest.fn().mockReturnValueOnce(280).mockReturnValueOnce(330).mockReturnValueOnce(230);
			const leftTicks = [1, 5, 8];
			const zero = {
				selectAll: jest.fn().mockReturnThis(),
				data: jest.fn().mockReturnThis(),
				join: jest.fn().mockReturnThis(),
				attr: jest.fn().mockReturnThis(),
			};
			const barSelect = {
				selectAll: jest.fn().mockReturnThis(),
				data: jest.fn().mockReturnThis(),
				join: jest.fn().mockReturnThis(),
				attr: jest.fn().mockReturnThis(),
				on: jest.fn().mockReturnThis(),
			};
			const leftSet = new Set(['foo', 'bar']);
			const selectedData = [
				['a', 'foo', 8],
				['a', 'bar', -1],
				['b', 'foo', 5],
			];
			const bottomDomain = [-1.1, 8.8];
			useRef.mockReturnValueOnce({current}).mockReturnValueOnce({}).mockReturnValueOnce({});
			extendDomain.mockReturnValueOnce(bottomDomain);
			getPlotBottom.mockReturnValueOnce(262);
			createScale.mockReturnValueOnce(leftScale).mockReturnValueOnce(bottomScale);
			getTicks.mockReturnValueOnce(leftTicks).mockReturnValueOnce(leftSet);
			drawLeftAxis.mockReturnValueOnce(38);
			select.mockReturnValueOnce(zero).mockReturnValueOnce(barSelect);
			shallow(
				<SimpleBarChart
					data={[
						{group: 'a', key: 'foo', value: 8},
						{group: 'a', key: 'bar', value: -1},
						{group: 'b', key: 'foo', value: 5},
					]}
					bottomAxis={{scaleType: 'linear', mapper: (d) => d.value}}
					leftAxis={{scaleType: 'labels', mapper: (d) => d.key}}
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
					true,
					'labels-hint',
					'linear-hint',
					'labels',
					null,
					undefined,
					undefined,
					{
						groupIndex: new Map([
							['a', 0],
							['b', 1],
						]),
						selectedData,
						leftDomain: leftSet,
						bottomDomain,
					},
					false,
				],
			]);
			expect(useLayoutEffect.mock.calls[0][0]()).toBeUndefined();
			expect(extendDomain.mock.calls).toEqual([[[-1, 8]]]);
			expect(getColorVariant.mock.calls).toEqual([[null, 2]]);
			expect(getPlotBottom.mock.calls).toEqual([[300, undefined]]);
			expect(createScale.mock.calls).toEqual([
				['labels', leftSet, [262, 0], 0.5],
				['linear', bottomDomain, [38, 400], 0.5],
			]);

			expect(zero.selectAll.mock.calls).toEqual([['line']]);
			expect(zero.data.mock.calls).toEqual([[[1]]]);
			expect(zero.join.mock.calls).toEqual([['line']]);
			expect(zero.attr.mock.calls).toEqual([
				['x1', 280],
				['x2', 280],
				['y1', 0],
				['y2', 262],
			]);

			expect(barSelect.attr.mock.calls).toEqual([
				['class', anyFunction],
				['d', anyFunction],
				['role', 'graphics-symbol'],
				['aria-roledescription', 'bar'],
				['aria-label', anyFunction],
			]);
			expect(barSelect.attr.mock.calls[1][1](['', 'foo', 5])).toBe('m280,76v8h50v-8z');
			expect(barSelect.attr.mock.calls[1][1](['', 'bar', 0])).toBe('m280,156v8h0v-8z');
			expect(barSelect.attr.mock.calls[1][1](['', 'baz', -5])).toBe('m280,236v8h-50v-8z');

			expect(leftScale.mock.calls).toEqual([['foo'], ['bar'], ['baz']]);
			expect(bottomScale.mock.calls).toEqual([[0], [5], [-5]]);
		});

		it('adds an effect which renders the chart when data loading is set', () => {
			const current = {
				getBoundingClientRect: () => ({width: 400, height: 300}),
			};
			useRef.mockReturnValueOnce({current}).mockReturnValueOnce({}).mockReturnValueOnce({});
			shallow(<SimpleBarChart dataOptions={{loading: true}} />);
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
					true,
					'labels-hint',
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
			shallow(<SimpleBarChart data={[]} />);
			expect(useEffect.mock.calls[0]).toEqual([anyFunction, []]);

			expect(useEffect.mock.calls[0][0]()).toBe('addResizeObserver');
			expect(addResizeObserver.mock.calls).toEqual([[current, anyFunction]]);

			addResizeObserver.mock.calls[0][1]('test-rect');
			expect(draw.mock.calls).toEqual([['test-rect']]);
		});
	});
});
