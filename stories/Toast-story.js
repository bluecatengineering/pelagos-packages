import React from 'react';

import {ToastTypes, Toast} from '../src';

const messages = [
	{type: ToastTypes.INFO, text: 'Info'},
	{type: ToastTypes.WARNING, text: 'Warning'},
	{type: ToastTypes.ERROR, text: 'Error'},
];

const Template = (args) => <Toast {...args} />;

export const Normal = Template.bind({});
Normal.args = {messages};

export default {
	title: 'Toast',
	component: Toast,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
