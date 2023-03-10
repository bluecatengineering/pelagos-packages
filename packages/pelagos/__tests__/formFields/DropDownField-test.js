import {shallow} from 'enzyme';

import DropDownField from '../../src/formFields/DropDownField';
import useRandomId from '../../src/hooks/useRandomId';

jest.unmock('../../src/formFields/DropDownField');

const values = {
	o0: 'Option 0',
	o1: 'Option 1',
};
const options = Object.keys(values);
const renderOption = (o) => values[o];

useRandomId.mockReturnValue('random-id');

describe('DropDownField', () => {
	describe('rendering', () => {
		it('renders expected elements', () => {
			const wrapper = shallow(
				<DropDownField
					id="test"
					label="Test"
					value="o0"
					options={options}
					helperText="Helper text"
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
			expect(useRandomId.mock.calls).toEqual([['test']]);
		});

		it('renders expected elements when optional properties are set', () => {
			const wrapper = shallow(
				<DropDownField
					id="test"
					className="TestClass"
					label="Test"
					value="o0"
					options={options}
					disabled
					required
					helperText="Helper text"
					error="Error"
					renderOption={renderOption}
					onChange={jest.fn()}
				/>
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onChange when the value changes', () => {
			const onChange = jest.fn();
			const wrapper = shallow(
				<DropDownField label="Test" options={[]} renderOption={renderOption} onChange={onChange} />
			);
			wrapper.find('Select').simulate('change', 'test');
			expect(onChange.mock.calls).toEqual([['test']]);
		});
	});
});
