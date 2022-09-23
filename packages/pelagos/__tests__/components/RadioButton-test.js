import {shallow} from 'enzyme';

import RadioButton from '../../src/components/RadioButton';

jest.unmock('../../src/components/RadioButton');

describe('RadioButton', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<RadioButton id="test" label="Test" checked onChange={jest.fn()} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(
				<RadioButton id="test" className="TestClass" label="Test" checked onChange={jest.fn()} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when error is true', () => {
			const wrapper = shallow(
				<RadioButton id="test" className="TestClass" label="Test" checked error onChange={jest.fn()} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onChange when changed', () => {
			const onChange = jest.fn();
			const event = {type: 'change'};
			const wrapper = shallow(<RadioButton className="TestClass" label="Test" checked onChange={onChange} />);
			wrapper.find('input').simulate('change', event);
			expect(onChange.mock.calls).toEqual([[event]]);
		});
	});
});
