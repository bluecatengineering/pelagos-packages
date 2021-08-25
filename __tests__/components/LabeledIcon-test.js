import {shallow} from 'enzyme';

import LabeledIcon from '../../src/components/LabeledIcon';

jest.unmock('../../src/components/LabeledIcon');

describe('LabeledIcon', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<LabeledIcon icon={{icon: 'test'}} label="test" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(<LabeledIcon icon={{icon: 'test'}} className="Test" label="test" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when underline is set', () => {
			const wrapper = shallow(<LabeledIcon icon={{icon: 'test'}} label="test" underline />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
