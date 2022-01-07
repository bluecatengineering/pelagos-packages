import identity from 'lodash-es/identity';

import {ToggleField} from '../src';

const Template = (args) => <ToggleField {...args} />;

export const Normal = Template.bind({});
Normal.args = {label: 'Normal'};

export const Checked = Template.bind({});
Checked.args = {label: 'Checked', value: true};

export const Disabled = Template.bind({});
Disabled.args = {label: 'Disabled', disabled: true};

export const AllStates = () => (
	<div className="Story__group">
		<ToggleField label="Normal" onChange={identity} />
		<ToggleField label="Checked" value onChange={identity} />
		<ToggleField label="Disabled" disabled onChange={identity} />
	</div>
);
AllStates.storyName = 'All states';

export default {
	title: 'Components/ToggleField',
	component: ToggleField,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
