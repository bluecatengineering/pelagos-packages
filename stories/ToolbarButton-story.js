import {faCat} from '@fortawesome/free-solid-svg-icons';

import {ToolbarButton} from '../src';

const Template = (args) => <ToolbarButton {...args} />;

export const Normal = Template.bind({});
Normal.args = {id: 'normal', icon: faCat, tooltipText: 'Normal', 'aria-label': 'Normal'};

export const Disabled = Template.bind({});
Disabled.args = {id: 'disabled', icon: faCat, tooltipText: 'Disabled', 'aria-label': 'Disabled', disabled: true};

export const AllStates = () => (
	<div className="Story__group">
		<ToolbarButton id="test0" icon={faCat} tooltipText="Normal" aria-label="Label" />
		<ToolbarButton id="test2" icon={faCat} tooltipText="Disabled" aria-label="Label" disabled />
	</div>
);
AllStates.storyName = 'All states';

export default {
	title: 'ToolbarButton',
	component: ToolbarButton,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
