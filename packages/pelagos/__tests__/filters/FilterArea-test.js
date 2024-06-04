import {shallow} from 'enzyme';

import FilterArea from '../../src/filters/FilterArea';
import useCollapse from '../../src/hooks/useCollapse';
import setRefs from '../../src/functions/setRefs';

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

	describe('behaviour', () => {
		it('calls setRefs when ref is set', () => {
			const ref = {foo: 'test'};
			FilterArea({}, ref); // ref is not passed any other way
			expect(setRefs.mock.calls).toEqual([[ref, 'useCollapse']]);
		});
	});
});
