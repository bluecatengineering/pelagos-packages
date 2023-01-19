import {TagInput} from '../src';

const validate = () => true;

const Template = (args) => <TagInput {...args} />;

export const Normal = Template.bind({});
Normal.args = {'aria-label': 'Normal', tags: ['Alpha'], validate};

export const Defaults = Template.bind({});
Defaults.args = {'aria-label': 'Defaults', defaultTags: ['Alpha'], defaultTooltipText: 'Default', tags: [], validate};

export default {
	title: 'Components/TagInput',
	component: TagInput,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
