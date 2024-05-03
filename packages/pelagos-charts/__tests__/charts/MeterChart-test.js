import {shallow} from 'enzyme';
import {sum} from 'd3-array';

import MeterChart from '../../src/charts/MeterChart';
import useRandomId from '../../src/charts/useRandomId';

jest.unmock('../../src/charts/MeterChart');
jest.unmock('../../src/charts/Getters');

const anyFunction = expect.any(Function);

useRandomId.mockReturnValue('random-id');

describe('MeterChart', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<MeterChart data={[{group: 'a', value: 35}]} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(
				<MeterChart
					className="TestClass"
					data={[
						{group: 'a', value: 35},
						{group: 'b', value: 42},
					]}
					dataOptions={{selectedGroups: ['b']}}
					meter={{showLabels: false}}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
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
});
