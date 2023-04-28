import {shallow} from 'enzyme';

import FilterChip from '../../src/filters/FilterChip';

jest.unmock('../../src/filters/FilterChip');

describe('FilterChip', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<FilterChip id="test" name="Test">
					test value
				</FilterChip>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
