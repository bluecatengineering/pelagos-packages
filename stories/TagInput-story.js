import {TagInput} from '../src';

const Template = (args) => <TagInput {...args} />;

export const Normal = Template.bind({});
Normal.args = {'aria-label': 'Normal', tags: ['Alpha'], helperText: 'Helper text'};

export const Defaults = Template.bind({});
Defaults.args = {'aria-label': 'Defaults', defaultTags: ['Alpha'], tags: []};

export default {
	title: 'Components/TagInput',
	component: TagInput,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
