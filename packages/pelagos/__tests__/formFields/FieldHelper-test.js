import {shallow} from 'enzyme';

import FieldHelper from '../../src/formFields/FieldHelper';

jest.unmock('../../src/formFields/FieldHelper');

describe('FieldHelper', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<FieldHelper id="test" text="Test" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when text is not set', () => {
			const wrapper = shallow(<FieldHelper id="test" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when error is set', () => {
			const wrapper = shallow(<FieldHelper id="test" text="Test" error="Error" />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
