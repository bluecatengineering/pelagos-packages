import identity from 'lodash-es/identity';

import {TextInputField} from '../src';

const Template = (args) => <TextInputField {...args} />;

export const Normal = Template.bind({});
Normal.args = {label: 'Normal', value: 'Alpha'};

export const Empty = Template.bind({});
Empty.args = {label: 'Empty', placeholder: 'Placeholder'};

export const Optional = Template.bind({});
Optional.args = {label: 'Optional', optional: true};

export const Disabled = Template.bind({});
Disabled.args = {label: 'Disabled', value: 'Alpha', disabled: true};

export const ReadOnly = Template.bind({});
ReadOnly.args = {label: 'Read-Only', value: 'Alpha', readOnly: true};

export const Error = Template.bind({});
Error.args = {label: 'Error', value: 'Alpha', error: 'Error message'};

export const AllStates = () => (
	<div className="Story__group">
		<TextInputField label="Normal" value="Alpha" onChange={identity} />
		<TextInputField label="Empty" placeholder="Placeholder" onChange={identity} />
		<TextInputField label="Optional" optional onChange={identity} />
		<TextInputField label="Disabled" value="Alpha" disabled onChange={identity} />
		<TextInputField label="Read-Only" value="Alpha" readOnly onChange={identity} />
		<TextInputField label="Error" value="Alpha" error="Error message" onChange={identity} />
	</div>
);
AllStates.storyName = 'All states';

export default {
	title: 'TextInputField',
	component: TextInputField,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
