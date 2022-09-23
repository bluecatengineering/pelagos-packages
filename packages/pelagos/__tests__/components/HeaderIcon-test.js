import {shallow} from 'enzyme';

import HeaderIcon from '../../src/components/HeaderIcon';

jest.unmock('../../src/components/HeaderIcon');

describe('HeaderIcon', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<HeaderIcon icon={{icon: 'test'}} label="test" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(<HeaderIcon icon={{icon: 'test'}} className="Test" label="test" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when underline is set', () => {
			const wrapper = shallow(<HeaderIcon icon={{icon: 'test'}} label="test" underline />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
