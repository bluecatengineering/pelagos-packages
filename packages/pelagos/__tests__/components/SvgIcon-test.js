import {shallow} from 'enzyme';

import SvgIcon from '../../src/components/SvgIcon';

jest.unmock('../../src/components/SvgIcon');

const icon = {icon: [10, 20, null, null, 'test path']};

describe('SvgIcon', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<SvgIcon icon={icon} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(<SvgIcon icon={icon} className="TestClass" animation="spin" aria-hidden />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
