import {CheckBox} from '../src';

const Template = (args) => <CheckBox {...args} />;

export const Normal = Template.bind({});
Normal.args = {label: 'Normal'};

export const Checked = Template.bind({});
Checked.args = {label: 'Checked', checked: true};

export const Disabled = Template.bind({});
Disabled.args = {label: 'Disabled', disabled: true};

export const Error = Template.bind({});
Error.args = {label: 'Error', error: true};

export const Indeterminate = Template.bind({});
Indeterminate.args = {label: 'Indeterminate', indeterminate: true};

export const AllStates = () => (
	<div className="Story__group">
		<CheckBox label="Option 1" />
		<CheckBox label="Option 2" checked />
		<CheckBox label="Option 3" disabled />
		<CheckBox label="Option 4" checked disabled />
		<CheckBox label="Option 5" error />
		<CheckBox label="Option 6" checked error />
		<CheckBox label="Option 7" indeterminate />
	</div>
);
AllStates.storyName = 'All states';

export default {
	title: 'Components/CheckBox',
	component: CheckBox,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
