import identity from 'lodash-es/identity';

import {CheckBoxFilterEditor} from '../src';

const options = ['foo', 'bar', 'baz'];
const list = ['foo', 'baz'];
const getLabel = identity;

const Template = (args) => <CheckBoxFilterEditor {...args} />;

export const Normal = Template.bind({});
Normal.args = {label: 'Normal', options, list, getLabel};

export default {
	title: 'Components/CheckBoxFilterEditor',
	component: CheckBoxFilterEditor,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
