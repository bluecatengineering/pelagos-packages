import {shallow} from 'enzyme';

import SingleHint from '../../src/charts/SingleHint';
import getColorClass from '../../src/charts/getColorClass';

jest.unmock('../../src/charts/SingleHint');

const groupIndex = new Map([
	['foo', 0],
	['bar', 1],
]);

const bottomFormatter = jest.fn().mockReturnValue('bottomFormatter');
const leftFormatter = jest.fn().mockReturnValue('leftFormatter');
const groupFormatter = jest.fn().mockReturnValue('groupFormatter');
const getBgClass = jest.fn().mockReturnValue('getBgClass');

getColorClass.mockReturnValue('getColorClass');

describe('SingleHint', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<SingleHint
					bottomValue="bottom-value"
					bottomFormatter={bottomFormatter}
					leftValue="left-value"
					leftFormatter={leftFormatter}
					groupLabel="group-label"
					group="foo"
					groupFormatter={groupFormatter}
					groupIndex={groupIndex}
					variant={5}
					option={2}
					getBgClass={getBgClass}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(bottomFormatter.mock.calls).toEqual([['bottom-value']]);
			expect(leftFormatter.mock.calls).toEqual([['left-value']]);
			expect(groupFormatter.mock.calls).toEqual([['foo']]);
			expect(getColorClass.mock.calls).toEqual([['bg', 5, 2, 0]]);
			expect(getBgClass.mock.calls).toEqual([['foo', 'bottom-value', 'left-value', 'getColorClass']]);
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(
				<SingleHint
					bottomTitle="bottom-title"
					bottomValue="bottom-value"
					bottomFormatter={bottomFormatter}
					leftTitle="left-title"
					leftValue="left-value"
					leftFormatter={leftFormatter}
					groupLabel="group-label"
					group="foo"
					groupFormatter={groupFormatter}
					groupIndex={groupIndex}
					variant={5}
					option={2}
					getBgClass={getBgClass}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
