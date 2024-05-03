import {shallow} from 'enzyme';
import {sum} from 'd3-array';

import MultiHint from '../../src/charts/MultiHint';
import getColorClass from '../../src/charts/getColorClass';

jest.unmock('../../src/charts/MultiHint');

const values = [
	['foo', 5],
	['bar', 7],
];
const groupIndex = new Map([
	['foo', 0],
	['bar', 1],
]);
const headerFormatter = jest.fn().mockReturnValue('header');
const groupFormatter = jest.fn().mockReturnValue('group');
const valueFormatter = jest.fn().mockReturnValue('value');
const getBgClass = jest.fn().mockReturnValue('hintClass');

sum.mockReturnValue('sum');
getColorClass.mockReturnValue('getColorClass');

describe('MultiHint', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<MultiHint
					title="Test title"
					headerValue="test-header"
					values={values}
					groupIndex={groupIndex}
					headerFormatter={headerFormatter}
					groupFormatter={groupFormatter}
					valueFormatter={valueFormatter}
					getBgClass={getBgClass}
					variant={5}
					option={2}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(headerFormatter.mock.calls).toEqual([['test-header']]);
			expect(groupFormatter.mock.calls).toEqual([['foo'], ['bar']]);
			expect(valueFormatter.mock.calls).toEqual([[5], [7]]);
			expect(getBgClass.mock.calls).toEqual([
				['foo', 'test-header', 5, 'getColorClass'],
				['bar', 'test-header', 7, 'getColorClass'],
			]);
			expect(getColorClass.mock.calls).toEqual([
				['bg', 5, 2, 0],
				['bg', 5, 2, 1],
			]);
			expect(sum.mock.calls).toEqual([]);
		});

		it('renders expected elements when showTotal is set', () => {
			const wrapper = shallow(
				<MultiHint
					title="Test title"
					headerValue="test-header"
					values={values}
					groupIndex={groupIndex}
					showTotal
					totalLabel="Total"
					headerFormatter={headerFormatter}
					groupFormatter={groupFormatter}
					valueFormatter={valueFormatter}
					getBgClass={getBgClass}
					variant={5}
					option={2}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(headerFormatter.mock.calls).toEqual([['test-header']]);
			expect(groupFormatter.mock.calls).toEqual([['foo'], ['bar']]);
			expect(valueFormatter.mock.calls).toEqual([[5], [7], ['sum']]);
			expect(getBgClass.mock.calls).toEqual([
				['foo', 'test-header', 5, 'getColorClass'],
				['bar', 'test-header', 7, 'getColorClass'],
			]);
			expect(getColorClass.mock.calls).toEqual([
				['bg', 5, 2, 0],
				['bg', 5, 2, 1],
			]);
			expect(sum.mock.calls).toEqual([[values, expect.any(Function)]]);
			expect(sum.mock.calls[0][1](values[0])).toBe(5);
		});

		it('renders expected elements when showTotal is set and values is not', () => {
			const wrapper = shallow(
				<MultiHint
					title="Test title"
					headerValue="test-header"
					groupIndex={groupIndex}
					showTotal
					totalLabel="Total"
					headerFormatter={headerFormatter}
					groupFormatter={groupFormatter}
					valueFormatter={valueFormatter}
					getBgClass={getBgClass}
					variant={5}
					option={2}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(valueFormatter.mock.calls).toEqual([[0]]);
			expect(sum.mock.calls).toEqual([]);
		});
	});
});
