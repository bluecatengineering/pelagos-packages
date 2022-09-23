import {shallow} from 'enzyme';

import LabelLine from '../../src/components/LabelLine';

jest.unmock('../../src/components/LabelLine');

describe('LabelLine', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<LabelLine htmlFor="test-id" text="Test" optional notice="Notice" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when notice is not set', () => {
			const wrapper = shallow(<LabelLine htmlFor="test-id" text="Test" notice="Notice" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
