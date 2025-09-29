import {shallow} from 'enzyme';

import DateInputField from '../../src/formFields/DateInputField';
import useRandomId from '../../src/hooks/useRandomId';

jest.unmock('../../src/formFields/DateInputField');

useRandomId.mockReturnValue('random-id');

describe('DateInputField', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<DateInputField
					id="test"
					label="Test"
					value="2025-09-29"
					helperText="Helper text"
					format={jest.fn()}
					parse={jest.fn()}
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useRandomId.mock.calls).toEqual([['test']]);
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(
				<DateInputField
					id="test"
					className="TestClass"
					label="Test"
					value="2025-09-29"
					disabled
					required
					helperText="Helper text"
					error="Error"
					format={jest.fn()}
					parse={jest.fn()}
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
