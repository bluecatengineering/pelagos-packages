import React from 'react';

import {RadioButton} from '../src';

const Template = (args) => <RadioButton {...args} />;

export const Normal = Template.bind({});
Normal.args = {label: 'Normal'};

export const Checked = Template.bind({});
Checked.args = {label: 'Checked', checked: true};

export const Error = Template.bind({});
Error.args = {label: 'Error', error: true};

export const AllStates = () => (
	<div className="Story__group">
		<RadioButton label="Option 1" />
		<RadioButton label="Option 2" checked />
		<RadioButton label="Option 3" error />
		<RadioButton label="Option 4" checked error />
	</div>
);
AllStates.storyName = 'All states';

export default {
	title: 'RadioButton',
	component: RadioButton,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
