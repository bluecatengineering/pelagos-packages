import {shallow} from 'enzyme';

import SvgIcon from '../../src/components/SvgIcon';

jest.unmock('../../src/components/SvgIcon');

const faIcon = {icon: [10, 20, null, null, 'test path']};

describe('SvgIcon', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<SvgIcon icon={faIcon} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(<SvgIcon icon={faIcon} className="TestClass" aria-hidden />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements for Carbon icon', () => {
			const wrapper = shallow(<SvgIcon icon="svg" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
