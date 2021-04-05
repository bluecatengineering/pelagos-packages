import {shallow} from 'enzyme';

import TagInputField from '../../src/formFields/TagInputField';
import useRandomId from '../../src/hooks/useRandomId';

jest.unmock('../../src/formFields/TagInputField');

useRandomId.mockReturnValue('test');

describe('TagInputField', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<TagInputField
					id="test"
					label="Label"
					optional
					tags={['foo']}
					validate={jest.fn()}
					onChange={jest.fn()}
					onError={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
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

		it('shows optional text if tags is empty', () => {
			const wrapper = shallow(
				<TagInputField
					id="test"
					label="Label"
					optional
					tags={[]}
					validate={jest.fn()}
					onChange={jest.fn()}
					onError={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
