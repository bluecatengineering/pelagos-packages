import {shallow} from 'enzyme';

import TextAreaField from '../../src/formFields/TextAreaField';

jest.unmock('../../src/formFields/TextAreaField');
jest.mock('lodash-es/debounce', () => jest.fn((f) => f));

describe('TextAreaField', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<TextAreaField
					id="test-id"
					label="Label"
					value="value"
					placeholder="placeholder"
					optional
					maxLength={10}
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when value is empty', () => {
			const wrapper = shallow(
				<TextAreaField
					id="test-id"
					label="Label"
					value=""
					placeholder="placeholder"
					optional
					maxLength={10}
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(
				<TextAreaField
					id="test-id"
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
					id="test-id"
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

		it('sets a random id if not provided', () => {
			const random = jest.spyOn(Math, 'random').mockReturnValue(0.1);
			const wrapper = shallow(
				<TextAreaField label="Label" value="value" placeholder="placeholder" maxLength={10} onChange={jest.fn()} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(random).toHaveBeenCalledTimes(1);
		});

		it('adds the error class if the error is set', () => {
			const wrapper = shallow(
				<TextAreaField
					id="test-id"
					label="Label"
					value="value"
					placeholder="placeholder"
					maxLength={10}
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
			wrapper.find('textarea').simulate('change', event);
			expect(onChange.mock.calls).toEqual([['test']]);
		});
	});
});
