import {shallow} from 'enzyme';

import TextAreaField from '../../src/formFields/TextAreaField';
import useRandomId from '../../src/hooks/useRandomId';

jest.unmock('../../src/formFields/TextAreaField');
jest.mock('lodash-es/debounce', () => jest.fn((f) => f));

useRandomId.mockReturnValue('random-id');

describe('TextAreaField', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<TextAreaField
					id="test"
					label="Label"
					value="value"
					placeholder="placeholder"
					required
					maxLength={10}
					helperText="Helper text"
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useRandomId.mock.calls).toEqual([['test']]);
		});

		it('renders expected elements when value is empty', () => {
			const wrapper = shallow(
				<TextAreaField id="test" label="Label" value="" placeholder="placeholder" maxLength={10} onChange={jest.fn()} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(
				<TextAreaField
					id="test"
					className="TestClass"
					label="Label"
					value="value"
					placeholder="placeholder"
					maxLength={10}
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('does not add the resize class if the resize is true', () => {
			const wrapper = shallow(
				<TextAreaField
					id="test"
					label="Label"
					value="value"
					placeholder="placeholder"
					maxLength={10}
					resize={true}
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when showCounter is true', () => {
			const wrapper = shallow(
				<TextAreaField
					id="test"
					label="Label"
					value="value"
					placeholder="placeholder"
					maxLength={10}
					showCounter
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('adds the error class if the error is set', () => {
			const wrapper = shallow(
				<TextAreaField
					id="test"
					label="Label"
					value="value"
					placeholder="placeholder"
					maxLength={10}
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
			const wrapper = shallow(<TextAreaField label="Label" value="" onChange={onChange} />);
			wrapper.find('[as="textarea"]').simulate('change', event);
			expect(onChange.mock.calls).toEqual([['test']]);
		});
	});
});
