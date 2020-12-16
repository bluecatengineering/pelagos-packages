import identity from 'lodash-es/identity';

import {RadioGroup} from '../src';

const options = ['Alpha', 'Beta', 'Gamma'];
const renderLabel = identity;

const Template = (args) => <RadioGroup {...args} />;

export const Normal = Template.bind({});
Normal.args = {id: 'normal', value: 'Alpha', options, renderLabel};

export default {
	title: 'RadioGroup',
	component: RadioGroup,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
