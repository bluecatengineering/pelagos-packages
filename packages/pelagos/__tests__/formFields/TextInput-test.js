import {shallow} from 'enzyme';

import TextInput from '../../src/formFields/TextInput';

jest.unmock('../../src/formFields/TextInput');

describe('TextInput', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<TextInput
					id="test"
					type="text"
					name="name"
					value="value"
					placeholder="placeholder"
					maxLength={10}
					required
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(
				<TextInput
					id="test"
					className="TestClass"
					type="text"
					name="name"
					value="value"
					placeholder="placeholder"
					maxLength={10}
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when error is set', () => {
			const wrapper = shallow(
				<TextInput
					id="test"
					type="text"
					name="name"
					value="value"
					placeholder="placeholder"
					maxLength={10}
					error
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onChange when a change event is fired', () => {
			const onChange = jest.fn();
			const event = {target: {value: 'test'}};
			const wrapper = shallow(<TextInput onChange={onChange} />);
			wrapper.simulate('change', event);
			expect(onChange.mock.calls).toEqual([['test']]);
		});
	});
});
