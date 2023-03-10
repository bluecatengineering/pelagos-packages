import {shallow} from 'enzyme';

import TagInputField from '../../src/formFields/TagInputField';
import useRandomId from '../../src/hooks/useRandomId';

jest.unmock('../../src/formFields/TagInputField');

useRandomId.mockReturnValue('random-id');

describe('TagInputField', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<TagInputField
					id="test"
					label="Label"
					required
					tags={['foo']}
					helperText="Helper text"
					validate={jest.fn()}
					onChange={jest.fn()}
					onError={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useRandomId.mock.calls).toEqual([['test']]);
		});

		it('renders expected elements when className is set', () => {
			const wrapper = shallow(
				<TagInputField
					id="test"
					className="TestClass"
					label="Label"
					tags={['foo']}
					validate={jest.fn()}
					onChange={jest.fn()}
					onError={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements if error is set', () => {
			const wrapper = shallow(
				<TagInputField
					id="test"
					label="Label"
					tags={['foo']}
					helperText="Helper text"
					error="Error"
					validate={jest.fn()}
					onChange={jest.fn()}
					onError={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
