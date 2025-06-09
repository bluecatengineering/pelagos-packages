import {shallow} from 'enzyme';

import TagComboBoxField from '../../src/tagComboBox/TagComboBoxField';
import useRandomId from '../../src/hooks/useRandomId';

jest.unmock('../../src/tagComboBox/TagComboBoxField');

useRandomId.mockReturnValue('random-id');

describe('TagComboBoxField', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<TagComboBoxField
					label="Label"
					tags={[]}
					helperText="Helper text"
					validate={jest.fn()}
					onChange={jest.fn()}
					onError={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(
				<TagComboBoxField
					className="TestClass"
					label="Label"
					required
					tags={[]}
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
