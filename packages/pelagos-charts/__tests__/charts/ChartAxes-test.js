import {shallow} from 'enzyme';

import ChartAxes from '../../src/charts/ChartAxes';

jest.unmock('../../src/charts/ChartAxes');

describe('ChartAxes', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<ChartAxes />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
