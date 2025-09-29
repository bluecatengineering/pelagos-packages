import {shallow} from 'enzyme';

import FieldWrapper from '../../src/formFields/FieldWrapper';

jest.unmock('../../src/formFields/FieldWrapper');

describe('FieldWrapper', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(<FieldWrapper label="Test label">Children</FieldWrapper>);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(
				<FieldWrapper
					id="test"
					className="TestClass"
					label="Test label"
					counter="Counter"
					required
					helperId="helper"
					helperText="Test helper"
					error="Test error">
					Children
				</FieldWrapper>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
