import {shallow} from 'enzyme';

import LoadingGradient from '../../src/charts/LoadingGradient';

jest.unmock('../../src/charts/LoadingGradient');

describe('LoadingGradient', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<LoadingGradient id="test" className="TestClass" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
