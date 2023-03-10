import {LabelLine} from '../src';

const Template = (args) => <LabelLine {...args} />;

export const Normal = Template.bind({});
Normal.args = {text: 'Normal'};

export const Required = Template.bind({});
Required.args = {text: 'Required', required: true};

export const RequiredError = Template.bind({});
RequiredError.args = {text: 'Required with error', required: true, error: true};

export default {
	title: 'Components/LabelLine',
	component: LabelLine,
	parameters: {actions: {argTypesRegex: '^on.*'}},
};
