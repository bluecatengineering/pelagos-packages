import {TagInputField} from '../src';

const Template = (args) => <TagInputField {...args} />;

export const Normal = Template.bind({});
Normal.args = {label: 'Normal', tags: ['Alpha']};

export const Defaults = Template.bind({});
Defaults.args = {label: 'Defaults', defaultTags: ['Alpha'], tags: []};

export default {
	title: 'TagInputField',
	component: TagInputField,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};