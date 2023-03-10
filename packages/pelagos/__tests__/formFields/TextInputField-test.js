import {shallow} from 'enzyme';

import TextInputField from '../../src/formFields/TextInputField';
import useRandomId from '../../src/hooks/useRandomId';

jest.unmock('../../src/formFields/TextInputField');
jest.mock('lodash-es/debounce', () => jest.fn((f) => f));

useRandomId.mockReturnValue('random-id');

describe('TextInputField', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<TextInputField
					id="test"
					label="Label"
					type="text"
					name="name"
					value="value"
					placeholder="placeholder"
					maxLength={10}
					required
					helperText="Helper text"
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useRandomId.mock.calls).toEqual([['test']]);
		});

		it('renders expected elements when value is empty', () => {
			const wrapper = shallow(
				<TextInputField
					id="test"
					label="Label"
					type="text"
					name="name"
					value=""
					placeholder="placeholder"
					maxLength={10}
					disabled={false}
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(
				<TextInputField
					id="test"
					className="TestClass"
					label="Label"
					type="text"
					name="name"
					value="value"
					placeholder="placeholder"
					maxLength={10}
					disabled={false}
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('adds the error class if the error is set', () => {
			const wrapper = shallow(
				<TextInputField
					id="test"
					label="Label"
					type="text"
					name="name"
					value="value"
					placeholder="placeholder"
					maxLength={10}
					disabled={false}
					helperText="Helper text"
					error="Error"
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
			const wrapper = shallow(<TextInputField label="Label" name="name" value="" onChange={onChange} />);
			wrapper.find('input').simulate('change', event);
			expect(onChange.mock.calls).toEqual([['test']]);
		});
	});
});
