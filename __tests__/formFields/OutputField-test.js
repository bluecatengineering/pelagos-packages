import {shallow} from 'enzyme';

import OutputField from '../../src/formFields/OutputField';

jest.unmock('../../src/formFields/OutputField');

describe('OutputField', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<OutputField id="test" label="Test" value="This is a test" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when id is not set', () => {
			const random = jest.spyOn(Math, 'random').mockReturnValue(0.1);
			const wrapper = shallow(<OutputField label="Test" value="This is a test" />);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(random).toHaveBeenCalledTimes(1);
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(<OutputField id="test" className="TestClass" label="Test" value="This is a test" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when alignRight is true', () => {
			const wrapper = shallow(<OutputField id="test" label="Test" value="This is a test" alignRight={true} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when active is true', () => {
			const wrapper = shallow(<OutputField id="test" label="Test" value="This is a test" active={true} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
