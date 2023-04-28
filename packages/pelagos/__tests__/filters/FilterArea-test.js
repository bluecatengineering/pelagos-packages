import {shallow} from 'enzyme';

import FilterArea from '../../src/filters/FilterArea';

jest.unmock('../../src/filters/FilterArea');

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
