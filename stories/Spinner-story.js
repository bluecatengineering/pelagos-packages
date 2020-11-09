import React from 'react';

import {Spinner} from '../src';

const Template = (args) => <Spinner {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

export default {
	title: 'Spinner',
	component: Spinner,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
