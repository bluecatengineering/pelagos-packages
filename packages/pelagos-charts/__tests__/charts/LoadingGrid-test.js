import {shallow} from 'enzyme';

import LoadingGrid from '../../src/charts/LoadingGrid';

jest.unmock('../../src/charts/LoadingGrid');

describe('LoadingGrid', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<LoadingGrid gradientId="test" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
