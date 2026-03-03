import {shallow} from 'enzyme';

import TextArea from '../../src/formFields/TextArea';

jest.unmock('../../src/formFields/TextArea');

describe('TextArea', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<TextArea id="test" value="value" placeholder="placeholder" required maxLength={10} onChange={jest.fn()} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(
				<TextArea
					id="test"
					className="TestClass"
					value="value"
					placeholder="placeholder"
					maxLength={10}
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when resize is set', () => {
			const wrapper = shallow(
				<TextArea id="test" value="value" placeholder="placeholder" maxLength={10} resize={true} onChange={jest.fn()} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when error is set', () => {
			const wrapper = shallow(
				<TextArea id="test" value="value" placeholder="placeholder" maxLength={10} error onChange={jest.fn()} />
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onChange when a change event is fired', () => {
			const onChange = jest.fn();
			const event = {target: {value: 'test'}};
			const wrapper = shallow(<TextArea value="" onChange={onChange} />);
			wrapper.find('[as="textarea"]').simulate('change', event);
			expect(onChange.mock.calls).toEqual([['test']]);
		});
	});
});
