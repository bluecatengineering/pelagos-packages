import identity from 'lodash-es/identity';

import {DropDownField} from '../src';

const options = ['Alpha', 'Beta', 'Gamma'];
const getOptionKey = identity;
const renderOption = identity;

const Template = (args) => <DropDownField {...args} />;

export const Normal = Template.bind({});
Normal.args = {label: 'Normal', value: 'Alpha', helperText: 'Helper text', options, getOptionKey, renderOption};

export const Empty = Template.bind({});
Empty.args = {label: 'Empty', placeholder: 'Empty', options, getOptionKey, renderOption};

export const Disabled = Template.bind({});
Disabled.args = {label: 'Disabled', disabled: true, value: 'Alpha', options, getOptionKey, renderOption};

export const Error = Template.bind({});
Error.args = {label: 'Error', error: 'Error message', value: 'Alpha', options, getOptionKey, renderOption};

export const AllStates = () => (
	<div className="Story__group">
		<DropDownField
			label="Normal"
			value="Alpha"
			options={options}
			renderOption={identity}
			helperText="Helper text"
			onChange={identity}
		/>
		<DropDownField
			label="Empty"
			placeholder="Placeholder"
			aria-label="Empty"
			options={options}
			renderOption={identity}
			onChange={identity}
		/>
		<DropDownField
			label="Disabled"
			value="Alpha"
			options={options}
			disabled
			renderOption={identity}
			onChange={identity}
		/>
		<DropDownField
			label="Error"
			value="Alpha"
			options={options}
			error="Error message"
			renderOption={identity}
			onChange={identity}
		/>
	</div>
);
AllStates.storyName = 'All states';

export default {
	title: 'DropDownField',
	component: DropDownField,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
