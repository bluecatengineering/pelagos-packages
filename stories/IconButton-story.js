import {faCat} from '@fortawesome/free-solid-svg-icons';

import {IconButton} from '../src';

const Template = (args) => <IconButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {icon: faCat, type: 'primary', tooltipText: 'Primary', 'aria-label': 'Primary'};

export const Secondary = Template.bind({});
Secondary.args = {icon: faCat, type: 'secondary', tooltipText: 'Secondary', 'aria-label': 'Secondary'};

export const Tertiary = Template.bind({});
Tertiary.args = {icon: faCat, type: 'tertiary', tooltipText: 'Tertiary', 'aria-label': 'Tertiary'};

export const Ghost = Template.bind({});
Ghost.args = {icon: faCat, type: 'ghost', tooltipText: 'Ghost', 'aria-label': 'Ghost'};

export const Disabled = Template.bind({});
Disabled.args = {icon: faCat, tooltipText: 'Disabled', 'aria-label': 'Disabled', disabled: true};

export const AllStates = () => (
	<div className="Story__row">
		<div className="Story__group">
			<IconButton id="test0p" icon={faCat} type="primary" tooltipText="Primary" aria-label="Label" />
			<IconButton id="test1p" icon={faCat} type="primary" tooltipText="Primary" aria-label="Label" size="large" />
			<IconButton id="test2p" icon={faCat} type="primary" tooltipText="Primary" aria-label="Label" disabled />
		</div>
		<div className="Story__group">
			<IconButton id="test0s" icon={faCat} type="secondary" tooltipText="Secondary" aria-label="Label" />
			<IconButton id="test1s" icon={faCat} type="secondary" tooltipText="Secondary" aria-label="Label" size="large" />
			<IconButton id="test2s" icon={faCat} type="secondary" tooltipText="Secondary" aria-label="Label" disabled />
		</div>
		<div className="Story__group">
			<IconButton id="test0t" icon={faCat} type="tertiary" tooltipText="Tertiary" aria-label="Label" />
			<IconButton id="test1t" icon={faCat} type="tertiary" tooltipText="Tertiary" aria-label="Label" size="large" />
			<IconButton id="test2t" icon={faCat} type="tertiary" tooltipText="Tertiary" aria-label="Label" disabled />
		</div>
		<div className="Story__group">
			<IconButton id="test0g" icon={faCat} type="ghost" tooltipText="Ghost" aria-label="Label" />
			<IconButton id="test1g" icon={faCat} type="ghost" tooltipText="Ghost" aria-label="Label" size="large" />
			<IconButton id="test2g" icon={faCat} type="ghost" tooltipText="Ghost" aria-label="Label" disabled />
		</div>
	</div>
);
AllStates.storyName = 'All states';

export default {
	title: 'IconButton',
	component: IconButton,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
