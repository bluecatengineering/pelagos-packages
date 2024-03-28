import {shallow} from 'enzyme';

import Toggle from '../../src/components/Toggle';

jest.unmock('../../src/components/Toggle');

describe('Toggle', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<Toggle
					id="test"
					className="TestClass"
					aria-label="Test"
					checked
					labelOn="foo"
					labelOff="bar"
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is not set', () => {
			const wrapper = shallow(<Toggle id="test" aria-label="Test" onChange={jest.fn()} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when disabled is true', () => {
			const wrapper = shallow(
				<Toggle id="test" className="TestClass" aria-label="Test" checked disabled onChange={jest.fn()} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onChange when clicked', () => {
			const onChange = jest.fn();
			const wrapper = shallow(<Toggle className="TestClass" aria-label="Test" checked onChange={onChange} />);
			wrapper.find('button').simulate('click');
			expect(onChange).toHaveBeenCalled();
		});
	});
});
