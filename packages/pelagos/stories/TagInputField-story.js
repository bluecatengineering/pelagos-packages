import {TagInputField} from '../src';

const validate = () => true;

const Template = (args) => <TagInputField {...args} />;

export const Normal = Template.bind({});
Normal.args = {label: 'Normal', tags: ['Alpha'], helperText: 'Helper text', validate};

export const Defaults = Template.bind({});
Defaults.args = {label: 'Defaults', defaultTags: ['Alpha'], tags: [], validate};

export default {
	title: 'Components/TagInputField',
	component: TagInputField,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
