import React from 'react';

import {Button} from '../src';

const Template = (args) => <Button {...args} />;

export const Normal = Template.bind({});
Normal.args = {text: 'Normal'};

export const Active = Template.bind({});
Active.args = {text: 'Active', active: true};

export const Disabled = Template.bind({});
Disabled.args = {text: 'Disabled', disabled: true};

export const AllStates = () => (
	<div className="Story__row">
		<div className="Story__group">
			<Button text="Normal" size="small" />
			<Button text="Active" size="small" active />
			<Button text="Disabled" size="small" tooltipText="Tooltip" disabled />
		</div>
		<div className="Story__group">
			<Button text="Normal" />
			<Button text="Active" active />
			<Button text="Disabled" tooltipText="Tooltip" disabled />
		</div>
		<div className="Story__group">
			<Button text="Normal" size="large" />
			<Button text="Active" size="large" active />
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
