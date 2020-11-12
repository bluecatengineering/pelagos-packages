import {Button} from '../src';

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {text: 'Primary', type: 'primary'};

export const Secondary = Template.bind({});
Secondary.args = {text: 'Secondary'};

export const Disabled = Template.bind({});
Disabled.args = {text: 'Disabled', disabled: true};

export const AllStates = () => (
	<div className="Story__row">
		<div className="Story__group">
			<Button text="Primary" size="small" type="primary" />
			<Button text="Secondary" size="small" />
			<Button text="Disabled" size="small" tooltipText="Tooltip" disabled />
		</div>
		<div className="Story__group">
			<Button text="Primary" type="primary" />
			<Button text="Secondary" />
			<Button text="Disabled" tooltipText="Tooltip" disabled />
		</div>
		<div className="Story__group">
			<Button text="Primary" size="large" type="primary" />
			<Button text="Secondary" size="large" />
			<Button text="Disabled" size="large" tooltipText="Tooltip" disabled />
		</div>
	</div>
);
AllStates.storyName = 'All states';

export default {
	title: 'Button',
	component: Button,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
