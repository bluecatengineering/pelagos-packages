import {shallow} from 'enzyme';

import FilterArea from '../../src/filters/FilterArea';
import useCollapse from '../../src/hooks/useCollapse';

jest.unmock('../../src/filters/FilterArea');

useCollapse.mockReturnValue('useCollapse');

describe('FilterArea', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<FilterArea>
					<li />
				</FilterArea>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(
				<FilterArea className="TestClass">
					<li />
				</FilterArea>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
