import {shallow} from 'enzyme';
import {useState} from 'react';
import {sum} from 'd3-array';
import {Layer, useRandomId} from '@bluecateng/pelagos';

import MeterChart from '../../src/charts/MeterChart';
import getColorClass from '../../src/charts/getColorClass';
import getDefaultClass from '../../src/charts/getDefaultClass';
import hintFormatters from '../../src/charts/hintFormatters';

jest.unmock('../../src/charts/MeterChart');

jest.mock('../../src/charts/hintFormatters', () => ({
	linear: jest.fn().mockReturnValue('linear-hint'),
}));

const anyFunction = expect.any(Function);

useRandomId.mockReturnValue('random-id');
getColorClass.mockReturnValue('getColorClass');
getDefaultClass.mockReturnValue('getDefaultClass');

describe('MeterChart', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<MeterChart data={[{group: 'a', value: 35}]} />);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(getColorClass.mock.calls).toEqual([['bg', undefined, 1, 0]]);
			expect(getDefaultClass.mock.calls).toEqual([['a', null, 35, 'getColorClass']]);
		});

		it('renders expected elements when optional properties are set', () => {
			useState.mockReturnValueOnce([{visible: true, content: 'test-hint'}]);
			const wrapper = shallow(
				<MeterChart
					className="TestClass"
					data={[
						{group: 'a', value: 35},
						{group: 'b', value: 42},
					]}
					dataOptions={{selectedGroups: ['b']}}
					meter={{showLabels: false}}
					hint={{enabled: false}}
					onClick={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(hintFormatters.linear.mock.calls).toEqual([[42]]);
		});

		it('renders expected elements when status is set and value matches success', () => {
			const data0 = {group: 'a', value: 35};
			sum.mockReturnValueOnce(35);
			const wrapper = shallow(
				<MeterChart data={[data0]} meter={{peak: 90, status: {thresholds: {warning: 75, danger: 90}}}} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(sum.mock.calls).toEqual([[[['a', 35, data0]], anyFunction]]);
			expect(sum.mock.calls[0][1](['a', 35])).toBe(35);
		});

		it('renders expected elements when status is set and value matches warning', () => {
			const data0 = {group: 'a', value: 85};
			sum.mockReturnValueOnce(85);
			const wrapper = shallow(
				<MeterChart data={[data0]} meter={{peak: 90, status: {thresholds: {warning: 75, danger: 90}}}} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(sum.mock.calls).toEqual([[[['a', 85, data0]], anyFunction]]);
		});

		it('renders expected elements when status is set and value matches danger', () => {
			const data0 = {group: 'a', value: 95};
			sum.mockReturnValueOnce(95);
			const wrapper = shallow(
				<MeterChart data={[data0]} meter={{peak: 97, status: {thresholds: {warning: 75, danger: 90}}}} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(sum.mock.calls).toEqual([[[['a', 95, data0]], anyFunction]]);
		});

		it('renders expected elements when proportional is set', () => {
			const data = [
				{group: 'Alpha', value: 12},
				{group: 'Beta', value: 15},
				{group: 'Gamma', value: 6},
			];
			const wrapper = shallow(<MeterChart data={data} meter={{proportional: {total: 64, unit: 'GB'}, peak: 58}} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls setHintData when the mouse moves over a bar', () => {
			const groupFormatter = jest.fn().mockReturnValue('group');
			const valueFormatter = jest.fn().mockReturnValue('value');
			const setHintData = jest.fn();
			useState.mockReturnValueOnce([{}, setHintData]);
			const wrapper = shallow(
				<MeterChart
					data={[{group: 'a', value: 35}]}
					dataOptions={{groupFormatter}}
					meter={{proportional: {}}}
					hint={{valueFormatter}}
				/>
			);
			wrapper.find('#random-id-0').simulate('mousemove', {target: {dataset: {index: '0'}}, clientX: 82, clientY: 150});
			expect(groupFormatter.mock.calls).toEqual([['a']]);
			expect(valueFormatter.mock.calls).toEqual([[35]]);
			expect(setHintData.mock.calls).toEqual([
				[
					{
						visible: true,
						x: 82,
						y: 150,
						content: (
							<Layer className="Chart__simpleHint">
								<span>group</span>
								<span>value</span>
							</Layer>
						),
					},
				],
			]);
		});

		it('calls setHintData when the mouse leaves a bar', () => {
			const setHintData = jest.fn();
			useState.mockReturnValueOnce([{}, setHintData]);
			const wrapper = shallow(<MeterChart data={[{group: 'a', value: 35}]} meter={{proportional: {}}} />);
			wrapper.find('#random-id-0').simulate('mouseleave');
			expect(setHintData.mock.calls).toEqual([[anyFunction]]);
			expect(setHintData.mock.calls[0][0]({foo: 'test'})).toEqual({foo: 'test', visible: false});
		});

		it('calls onClick when a bar is clicked', () => {
			const onClick = jest.fn();
			const wrapper = shallow(<MeterChart data={[{group: 'a', value: 35}]} onClick={onClick} />);
			wrapper.find('#random-id-0').simulate('click', {target: {dataset: {index: '0'}}});
			expect(onClick.mock.calls).toEqual([[{group: 'a', value: 35}]]);
		});

		it('calls click when space or Enter are pressed on a bar', () => {
			const click = jest.fn();
			const preventDefault = jest.fn();
			const wrapper = shallow(<MeterChart data={[{group: 'a', value: 35}]} onClick={jest.fn()} />);
			const bar = wrapper.find('#random-id-0');
			bar.simulate('keydown', {target: {click, dataset: {index: '0'}}, key: ' ', preventDefault});
			bar.simulate('keydown', {target: {click, dataset: {index: '0'}}, key: 'Enter', preventDefault});
			bar.simulate('keydown', {target: {click, dataset: {index: '0'}}, key: 'Other', preventDefault});
			expect(click.mock.calls).toEqual([[], []]);
			expect(preventDefault.mock.calls).toEqual([[], []]);
		});
	});
});
