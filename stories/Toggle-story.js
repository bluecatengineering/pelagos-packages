import {Toggle} from '../src';

const Template = (args) => <Toggle {...args} />;

export const Normal = Template.bind({});
Normal.args = {'aria-label': 'Normal'};

export const Checked = Template.bind({});
Checked.args = {'aria-label': 'Checked', checked: true};

export const Disabled = Template.bind({});
Disabled.args = {'aria-label': 'Disabled', disabled: true};

export const AllStates = () => (
	<div className="Story__group">
		<Toggle aria-label="Test" />
		<Toggle aria-label="Test" checked />
		<Toggle aria-label="Test" disabled />
	</div>
);
AllStates.storyName = 'All states';

export default {
	title: 'Components/Toggle',
	component: Toggle,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
