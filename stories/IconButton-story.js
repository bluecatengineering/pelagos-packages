import {faCat} from '@fortawesome/free-solid-svg-icons';

import {IconButton} from '../src';

const Template = (args) => <IconButton {...args} />;

export const Normal = Template.bind({});
Normal.args = {icon: faCat, tooltipText: 'Normal', 'aria-label': 'Normal'};

export const Disabled = Template.bind({});
Disabled.args = {icon: faCat, tooltipText: 'Disabled', 'aria-label': 'Disabled', disabled: true};

export const AllStates = () => (
	<div className="Story__group">
		<IconButton id="test0" icon={faCat} tooltipText="Tooltip" aria-label="Label" />
		<IconButton id="test1" icon={faCat} tooltipText="Tooltip" aria-label="Label" size="large" />
		<IconButton id="test2" icon={faCat} tooltipText="Tooltip" aria-label="Label" disabled />
	</div>
);
AllStates.storyName = 'All states';

export default {
	title: 'IconButton',
	component: IconButton,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
